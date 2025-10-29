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
import { AddFamilyMemberDialog } from "./components/AddFamilyMemberDialog/AddFamilyMemberDialog";
import { PersonalInformation } from "./components/PersonalInformation/PersonalInformation";
import { getCountryOptions } from "@/utils/getCountryCodes";
import { useState } from "react";
import { RequiredInputDescription } from "./components/RequiredInputDescription/RequiredInputDescription";
import { sendEnrollmentEmail } from "@/actions/sendEnrollmentEmail";
import { Link } from "@/components/Link/Link";

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
  const [errorWhileSubmitting, setErrorWhileSubmitting] = useState(true);
  const [isAddFamilyMemberDialogOpen, setIsAddFamilyMemberDialogOpen] =
    useState(false);
  const [shouldUpdateFamilyMemberIndex, setShouldUpdateFamilyMemberIndex] =
    useState<null | number>(null);

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

  const onSubmit: SubmitHandler<EnrollFormValues> = async (data) => {
    try {
      const result = await sendEnrollmentEmail(data);

      if (result.success) {
        setSuccessfullySubmitted(true);
      } else {
        setErrorWhileSubmitting(true);
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      setErrorWhileSubmitting(true);
      alert(error);
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
                  label: "Ik ga akkoord met de algemene voorwaarden",
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
          <RequiredInputDescription />
        </div>
        <Button type="submit" variant="secondary" className="w-full lg:w-fit">
          Submit
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
