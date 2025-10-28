"use server";

import { format, parseISO } from "date-fns";
import { enrollValidationSchema } from "@/features/EnrollForm/validation";
import type { EnrollFormValues } from "@/features/EnrollForm/validation";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEnrollmentEmail(data: EnrollFormValues) {
  const parsedData = enrollValidationSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error(
      "Data received from the client did not pass zod validation.",
    );
  }

  const recipientEmail = process.env.RESEND_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!recipientEmail) {
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
                  <p><strong>Email:</strong> ${familyMember.personaliaEmail}</p>
                  <p><strong>Phone:</strong> ${familyMember.personaliaPhoneCountry} ${familyMember.personaliaPhone}</p>
                  <p><strong>Bijzonderheden:</strong> ${familyMember.specialMessage}</p>
                  <p><strong>Adres:</strong> ${familyMember.addressStreet} ${familyMember.addressHouseNumber} ${familyMember.addressPostalCode} ${familyMember.addressPlaceName}</p>
                  ${isLast ? "" : "<br />"}
                `;
            })
            .join("")
        : "<p>Geen gezinsleden toegevoegd</p>"
    }`;

    // TODO: add family members.
    // TODO: refactor the html to a react template.
    const result = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: `New Patient Enrollment from ${personaliaFirstName} ${personaliaLastname}`,
      replyTo: personaliaEmail,
      html: `
        <h1>New Patient Enrollment</h1>

        <h2>Persoonsgegevens</h2>
        <p><strong>Naam:</strong> ${getFullName(personaliaInfix, personaliaFirstName, personaliaLastname)}</p>
        <p><strong>Geslacht:</strong> ${personaliaGender}</p>
        <p><strong>Geboortedatum:</strong> ${formatDateOfBirth(personaliaDateOfBirth)}</p>
        <p><strong>Email:</strong> ${personaliaEmail}</p>
        <p><strong>Phone:</strong> ${personaliaPhoneCountry} ${personaliaPhone}</p>
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
    return { success: false, message: "An unexpected error occurred." };
  }
}
