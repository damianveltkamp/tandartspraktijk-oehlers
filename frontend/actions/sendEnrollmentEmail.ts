"use server";

import { format, parseISO } from "date-fns";
import {
  ENROLL_REJECTED_MESSAGE,
  enrollGuardSchema,
} from "@/features/EnrollForm/guard";
import type { EnrollGuardValues } from "@/features/EnrollForm/guard";
import { enrollValidationSchema } from "@/features/EnrollForm/validation";
import type { EnrollFormValues } from "@/features/EnrollForm/validation";
import type { FormTokenRejection } from "@/utils/formToken";
import { verifyFormToken } from "@/utils/formToken";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Records why a submission was refused.
 *
 * The caller gets one undifferentiated message, so the log is the only place
 * the distinction survives -- and the distinction is the point. A burst of
 * `honeypot` is a bot; a single `tooFast` is a real visitor who tabbed through
 * a form their browser autofilled, and is worth loosening the limit for rather
 * than celebrating as a catch.
 */
const logRejection = (reason: "honeypot" | FormTokenRejection) => {
  console.warn("[enroll-abuse] submission rejected", {
    reason,
    at: new Date().toISOString(),
  });
};

/**
 * How a submission ended.
 *
 * `rejected` means a guard refused it and the visitor keeps their form;
 * `failed` means the send itself broke and the form is gone. The client tells
 * the two apart from this field rather than by matching on message text.
 */
export type EnrollResult =
  | { message: string; reason: "failed" | "rejected"; success: false }
  | { message: string; success: true };

/**
 * `guard` carries the anti-abuse fields. It is a separate argument rather than
 * part of `data` so the enrollment payload keeps describing a patient and
 * nothing else.
 */
export async function sendEnrollmentEmail(
  data: EnrollFormValues,
  guard: EnrollGuardValues,
): Promise<EnrollResult> {
  // Checked before anything else: a rejected submission must cost the practice
  // no mail, and must not reach Resend at all.
  const parsedGuard = enrollGuardSchema.safeParse(guard);

  if (!parsedGuard.success) {
    logRejection("malformed");

    return {
      success: false,
      reason: "rejected",
      message: ENROLL_REJECTED_MESSAGE,
    };
  }

  // Trimmed: a stray space is not a bot, and refusing one would be a rejection
  // the visitor can neither see nor explain.
  if (parsedGuard.data.honeypot.trim() !== "") {
    logRejection("honeypot");

    return {
      success: false,
      reason: "rejected",
      message: ENROLL_REJECTED_MESSAGE,
    };
  }

  const tokenRejection = verifyFormToken(parsedGuard.data.token);

  if (tokenRejection) {
    logRejection(tokenRejection);

    return {
      success: false,
      reason: "rejected",
      message: ENROLL_REJECTED_MESSAGE,
    };
  }

  const parsedData = enrollValidationSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error(
      "Data received from the client did not pass zod validation.",
    );
  }

  const recipientEmails = process.env.RESEND_TO_EMAIL?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!recipientEmails?.length) {
    throw new Error("Email recipient not configured in environment.");
  }

  if (!fromEmail) {
    throw new Error("Email sender not configured in environment.");
  }

  try {
    const {
      personaliaFirstName,
      personaliaLastname,
      personaliaInfix,
      personaliaEmail,
      personaliaPhoneCountry,
      personaliaPhone,
      personaliaDateOfBirth,
      personaliaGender,
      specialMessage,
      addressStreet,
      addressHouseNumber,
      addressPostalCode,
      addressPlaceName,
      familyMembers,
    } = data;
    const getFullName = (
      infix: string,
      firstName: string,
      lastName: string,
    ) => {
      const name = infix
        ? `${firstName} ${infix} ${lastName}`
        : `${firstName} ${lastName}`;

      return name;
    };

    const formatDateOfBirth = (dateOfBirth: string) => {
      return format(parseISO(dateOfBirth), "dd-MM-yyyy");
    };

    const renderFamilyMembers = `${
      familyMembers?.length
        ? familyMembers
            .map((familyMember, index) => {
              const isLast = index === familyMembers.length - 1;
              return `
                  <h3>${getFullName(familyMember.personaliaInfix, familyMember.personaliaFirstName, familyMember.personaliaLastname)}</h3>
                  <p><strong>Geslacht:</strong> ${familyMember.personaliaGender}</p>
                  <p><strong>Geboortedatum:</strong> ${formatDateOfBirth(familyMember.personaliaDateOfBirth)}</p>
                  ${familyMember.personaliaEmail && `<p><strong>Email:</strong> ${familyMember.personaliaEmail}</p>`}
                  ${familyMember.personaliaPhone && `<p><strong>Telefoonnummer:</strong> ${familyMember.personaliaPhoneCountry} ${familyMember.personaliaPhone}</p>`}
                  <p><strong>Bijzonderheden:</strong> ${familyMember.specialMessage}</p>
                  <p><strong>Adres:</strong> ${familyMember.addressStreet} ${familyMember.addressHouseNumber} ${familyMember.addressPostalCode} ${familyMember.addressPlaceName}</p>
                  ${isLast ? "" : "<br />"}
                `;
            })
            .join("")
        : "<p>Geen gezinsleden toegevoegd</p>"
    }`;

    const result = await resend.emails.send({
      from: fromEmail,
      to: recipientEmails,
      subject: `Nieuwe patiënt aanmelding van ${personaliaFirstName} ${personaliaLastname}`,
      replyTo: personaliaEmail,
      html: `
        <h1>Patiënt aanmelding</h1>

        <h2>Persoonsgegevens</h2>
        <p><strong>Naam:</strong> ${getFullName(personaliaInfix, personaliaFirstName, personaliaLastname)}</p>
        <p><strong>Geslacht:</strong> ${personaliaGender}</p>
        <p><strong>Geboortedatum:</strong> ${formatDateOfBirth(personaliaDateOfBirth)}</p>
        <p><strong>Email:</strong> ${personaliaEmail}</p>
        <p><strong>Telefoonnummer:</strong> ${personaliaPhoneCountry} ${personaliaPhone}</p>
        <p><strong>Bijzonderheden:</strong> ${specialMessage ? specialMessage : "Geen bijzonderheden"}</p>
        <p><strong>Adres:</strong> ${addressStreet} ${addressHouseNumber} ${addressPostalCode} ${addressPlaceName}</p>
        <br>
        <h2>Gezinsleden</h2>
        ${renderFamilyMembers}
      `,
    });

    if (result.error) {
      console.error("Resend Error:", result.error);

      return {
        success: false,
        reason: "failed",
        message: "Failed to send enrollment form. Please try again.",
      };
    }

    // Optional: Send a confirmation email back to the patient
    // await resend.emails.send({
    //   from: `Dentist Office <${fromEmail}>`,
    //   to: [email],
    //   subject: `Enrollment Confirmation`,
    //   html: `
    //         <p>Dear ${name},</p>
    //         <p>Thank you for submitting your enrollment form to our dental office. We will be in touch shortly to schedule your appointment!</p>
    //         <p>Sincerely,</p>
    //         <p>The Dental Team</p>
    //     `,
    // });

    return { success: true, message: "Enrollment submitted successfully!" };
  } catch (error) {
    console.error("Server Action Error:", error);
    return {
      success: false,
      reason: "failed",
      message: "An unexpected error occurred.",
    };
  }
}
