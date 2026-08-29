"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import type { EnrollFormValues, PersonalInformationValues } from "./validation";
import {
  enrollValidationSchema,
  familyMemberValidationSchema,
} from "./validation";
import { twMerge } from "tailwind-merge";
import { FormErrors } from "@/components/FormErrors/FormErrors";
import { RadioGroup } from "@/components/RadioGroup/RadioGroup";
import {
  ADDFAMILYMEMBERFORMDEFAULTVALUES,
  ENROLLFORMDEFAULTVALUES,
  INPUTKEYS,
} from "./constants";
import { Button, LinkButton } from "@/components/Button/Button";
import { Link } from "@/components/Link/Link";
import { LEGAL_PAGES } from "@/constants/legal";
import { AddFamilyMemberDialog } from "./components/AddFamilyMemberDialog/AddFamilyMemberDialog";
import { PersonalInformation } from "./components/PersonalInformation/PersonalInformation";
import { getCountryOptions } from "@/utils/getCountryCodes";
import { useEffect, useState } from "react";
import { RequiredInputDescription } from "./components/RequiredInputDescription/RequiredInputDescription";
import {
  HONEYPOT_FIELD_NAME,
  HoneypotField,
} from "./components/HoneypotField/HoneypotField";
import { sendEnrollmentEmail } from "@/actions/sendEnrollmentEmail";
import { issueFormToken } from "@/actions/issueFormToken";

interface EnrollFormProps {
  className?: string;
}

/**
 * @component EnrollForm
 * @client
 *
 * EnrollForm contains all functionality to allow a user to send his/her personal information
 * to send a request to enroll within our dental practice.
 */
export const EnrollForm = ({ className }: EnrollFormProps) => {
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);
  const [errorWhileSubmitting, setErrorWhileSubmitting] = useState(false);
  /**
   * A refused submission, as opposed to a failed one. Rendered inline so the
   * visitor keeps everything they typed -- see the comment on the
   * `errorWhileSubmitting` branch below.
   */
  const [rejectionMessage, setRejectionMessage] = useState<null | string>(null);
  const [isAddFamilyMemberDialogOpen, setIsAddFamilyMemberDialogOpen] =
    useState(false);
  const [shouldUpdateFamilyMemberIndex, setShouldUpdateFamilyMemberIndex] =
    useState<null | number>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Signed server-side and minted on mount rather than during render, because
   * `/inschrijven` is statically prerendered -- see `issueFormToken`. Held in
   * state rather than a ref because `onSubmit` closes over it, and a ref read
   * from a handler built during render is exactly what `react-hooks/refs`
   * forbids.
   */
  const [formToken, setFormToken] = useState("");
  /**
   * Bumped to mint a replacement token.
   *
   * A token is only good for an hour, and this form is long enough that a
   * visitor can be interrupted for longer than that. Without a re-mint the
   * expiry would be a deadline on the *page* rather than on the attempt: every
   * retry would resend the same stale token and be refused identically, and the
   * message would tell them to try again shortly -- advice that could never
   * work. The same trap catches a token that never arrived, and a signature
   * refused because the secret was rotated while the page was open.
   */
  const [tokenAttempt, setTokenAttempt] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let retriesLeft = 3;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const mint = () => {
      issueFormToken().then(
        (token) => {
          if (isMounted) {
            setFormToken(token);
          }
        },
        () => {
          // Swallowed rather than surfaced: the visitor is still filling in the
          // form and there is nothing for them to do about it yet. Retried with
          // a widening gap so a blip does not leave the form permanently
          // unsubmittable, and reported honestly at submit time if it never
          // succeeds.
          retriesLeft -= 1;

          if (isMounted && retriesLeft > 0) {
            retryTimer = setTimeout(mint, (4 - retriesLeft) * 2_000);
          }
        },
      );
    };

    mint();

    return () => {
      isMounted = false;
      clearTimeout(retryTimer);
    };
  }, [tokenAttempt]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    control,
    getValues,
  } = useForm<EnrollFormValues>({
    mode: "onSubmit",
    defaultValues: ENROLLFORMDEFAULTVALUES,
    resolver: zodResolver(enrollValidationSchema),
  });

  const {
    fields,
    append: appendFamilyMember,
    update: updateFamilyMember,
    remove,
  } = useFieldArray({
    control,
    name: "familyMembers",
  });

  const addFamilyMemberForm = useForm<PersonalInformationValues>({
    mode: "onSubmit",
    defaultValues: ADDFAMILYMEMBERFORMDEFAULTVALUES,
    resolver: zodResolver(familyMemberValidationSchema),
  });

  const onSubmit: SubmitHandler<EnrollFormValues> = async (data, event) => {
    // The honeypot is uncontrolled -- read straight off the submitted form
    // rather than through a ref, for the same reason the token is state.
    const form = event?.target;
    const honeypot =
      form instanceof HTMLFormElement
        ? `${new FormData(form).get(HONEYPOT_FIELD_NAME) ?? ""}`
        : "";

    setIsSubmitting(true);
    setRejectionMessage(null);
    try {
      const result = await sendEnrollmentEmail(data, {
        honeypot,
        token: formToken,
      });

      if (result.success) {
        setSuccessfullySubmitted(true);
      } else if (result.reason === "rejected") {
        setRejectionMessage(result.message);

        // Give the next attempt a fresh token and an empty decoy, so "probeer
        // het over een paar minuten opnieuw" is advice that can actually work.
        // A refusal the visitor cannot recover from is worse than a bot getting
        // a second try -- and a bot posting to the action directly never sees
        // either reset, since both live in this component.
        setTokenAttempt((attempt) => attempt + 1);

        if (form instanceof HTMLFormElement) {
          const decoy = form.elements.namedItem(HONEYPOT_FIELD_NAME);

          if (decoy instanceof HTMLInputElement) {
            decoy.value = "";
          }
        }
      } else {
        setErrorWhileSubmitting(true);
      }
    } catch {
      setErrorWhileSubmitting(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formHasErrors = Object.keys(errors).length > 0;

  const openAddFamilyMemberDialog = () => {
    setIsAddFamilyMemberDialogOpen(true);
  };

  const closeAddFamilyMemberDialog = () => {
    setIsAddFamilyMemberDialogOpen(false);
  };

  if (successfullySubmitted) {
    return (
      <div className="content-section flex flex-col gap-20">
        <h2 className="typography-headline-2">Bedankt voor het inschrijven</h2>
        <p className="typography-body">
          Wij nemen zo spoedig mogelijk contact met u op.
        </p>
        <LinkButton
          isExternal={false}
          variant="primary"
          className="w-fit"
          href="/"
        >
          Ga terug naar de homepagina
        </LinkButton>
      </div>
    );
  }

  // Reserved for a send that actually broke. A *refused* submission must not
  // land here: this branch replaces the form, and the visitor would lose every
  // field plus every family member they entered.
  if (errorWhileSubmitting) {
    return (
      <div className="content-section flex flex-col gap-20">
        <h2 className="typography-headline-2">Er is een fout opgetreden.</h2>
        <p className="typography-body">
          Tijdens het versturen van uw aanvraag is er een fout opgetreden.
          Probeer op een later moment nogmaals het formulier te versturen of
          neem contact met ons op.
        </p>
        <LinkButton
          isExternal={false}
          variant="primary"
          className="w-fit"
          href="/"
        >
          Ga terug naar de homepagina
        </LinkButton>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={twMerge("flex flex-col gap-40 lg:gap-60", className)}
      >
        <HoneypotField />
        <PersonalInformation
          control={control}
          countryOptions={getCountryOptions()}
          errors={errors}
          register={register}
          setValue={setValue}
          trigger={trigger}
        />
        <section
          className="flex flex-col gap-20"
          aria-labelledby="personalia-heading"
        >
          <h2
            className="typography-headline-2 lg:col-span-2"
            id="personalia-heading"
          >
            Gezinsleden toevoegen
          </h2>
          <Button
            type="button"
            className="w-fit"
            onClick={openAddFamilyMemberDialog}
          >
            Lid toevoegen
          </Button>
          <div>
            <div>
              <h3 className="typography-body rounded-t-8 bg-gray-200 p-20">
                Gezinsleden
              </h3>
            </div>
            <div className="rounded-b-8 border border-gray-200 py-20">
              {fields.length ? (
                fields.map((field, index) => {
                  const { personaliaFirstName, personaliaLastname } = field;
                  return (
                    <div
                      key={`${personaliaFirstName}-${personaliaLastname}`}
                      className="flex flex-col gap-10 px-20 not-first:pt-20 not-last:border-b not-last:border-b-gray-200 not-last:pb-20"
                    >
                      <span>
                        {personaliaFirstName} {personaliaLastname}
                      </span>
                      <div className="flex gap-20">
                        <button
                          type="button"
                          className="hover:cursor-pointer"
                          onClick={() => {
                            setShouldUpdateFamilyMemberIndex(index);
                            addFamilyMemberForm.reset(field);
                            openAddFamilyMemberDialog();
                          }}
                        >
                          Aanpassen
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:cursor-pointer"
                          onClick={() => remove(index)}
                        >
                          Verwijderen
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="px-20">
                  Er zijn nog geen gezinsleden toegevoegd
                </div>
              )}
            </div>
          </div>
        </section>
        <Controller
          name={INPUTKEYS.termsAndConditions}
          control={control}
          render={({ field }) => (
            <RadioGroup
              items={[
                {
                  value: "comply",
                  label: (
                    <>
                      Ik ga akkoord met de{" "}
                      {/* Opens in a new tab on purpose: the form keeps all of
                          its state client-side, so navigating away and back
                          would discard everything already filled in. */}
                      <Link
                        isExternal={false}
                        href={LEGAL_PAGES.terms.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hocus:no-underline font-bold underline"
                      >
                        algemene voorwaarden
                        {/* Inside the link on purpose: as a sibling this text
                            is not part of the link's accessible name, so a
                            screen reader announces the link without the
                            new-tab warning. */}
                        <span className="sr-only">
                          {" "}
                          (opent in een nieuw tabblad)
                        </span>
                      </Link>
                    </>
                  ),
                },
              ]}
              inputKey={INPUTKEYS.termsAndConditions}
              field={field}
              errorMessage={errors[INPUTKEYS.termsAndConditions]?.message}
            />
          )}
        />
        <div className="flex flex-col gap-10">
          {formHasErrors && (
            <FormErrors errors={errors}>
              Er zitten fouten in het formulier:
            </FormErrors>
          )}
          {rejectionMessage !== null && (
            <p role="alert" className="typography-body text-red-700">
              {rejectionMessage}
            </p>
          )}
          <RequiredInputDescription />
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="w-full disabled:cursor-not-allowed disabled:opacity-50 lg:w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Aanvraag word verstuurd..." : "Aanvraag versturen"}
        </Button>
      </form>
      <AddFamilyMemberDialog
        getMainRegistrarData={getValues}
        appendFamilyMember={appendFamilyMember}
        closeModal={closeAddFamilyMemberDialog}
        hookForm={addFamilyMemberForm}
        isOpen={isAddFamilyMemberDialogOpen}
        setShouldUpdateIndex={setShouldUpdateFamilyMemberIndex}
        shouldUpdateIndex={shouldUpdateFamilyMemberIndex}
        updateFamilyMember={updateFamilyMember}
      />
    </>
  );
};
