"use client";
import { Button } from "@/components/Button/Button";
import * as Dialog from "@/components/Dialog/Dialog";
import type { FormValues, PersonalInformationValues } from "../../validation";
import type {
  SubmitHandler,
  UseFieldArrayAppend,
  UseFieldArrayUpdate,
  UseFormReturn,
} from "react-hook-form";
import { PersonalInformation } from "../PersonalInformation/PersonalInformation";
import { getCountryOptions } from "@/utils/getCountryCodes";
import type { Dispatch, SetStateAction } from "react";

interface AddFamilyMemberDialogProps {
  appendFamilyMember: UseFieldArrayAppend<FormValues, "familyMembers">;
  closeModal: VoidFunction;
  hookForm: UseFormReturn<PersonalInformationValues>;
  isOpen: boolean;
  setShouldUpdateIndex: Dispatch<SetStateAction<null | number>>;
  shouldUpdateIndex: null | number;
  updateFamilyMember: UseFieldArrayUpdate<FormValues, "familyMembers">;
}

export const AddFamilyMemberDialog = ({
  appendFamilyMember,
  closeModal,
  hookForm,
  isOpen,
  setShouldUpdateIndex,
  shouldUpdateIndex,
  updateFamilyMember,
}: AddFamilyMemberDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    control,
    reset,
  } = hookForm;
  const shouldUpdate = shouldUpdateIndex !== null;

  const resetDialog = () => {
    // FIXME: after updating family member for some reason the form does not reset.
    reset();
    setShouldUpdateIndex(null);
    closeModal();
  };

  const onSubmit: SubmitHandler<PersonalInformationValues> = (data) => {
    if (shouldUpdate) {
      updateFamilyMember(shouldUpdateIndex, data);
      resetDialog();
      return;
    }

    appendFamilyMember(data);
    resetDialog();
  };

  return (
    <>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.ContentContainer>
            <Dialog.Header closeModal={closeModal} title="Add family member" />
            <Dialog.Content className="h-[70dvh] overflow-auto">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <PersonalInformation
                  control={control}
                  countryOptions={getCountryOptions()}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  trigger={trigger}
                />
                <div>
                  <p>
                    Elk veld gemarkeerd met een * is een{" "}
                    <span id="form-required-input">verplicht veld</span> om in
                    te vullen.
                  </p>
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full lg:w-fit"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {shouldUpdate ? "Aanpassen" : "Lid toevoegen"}
                </Button>
              </form>
            </Dialog.Content>
          </Dialog.ContentContainer>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
