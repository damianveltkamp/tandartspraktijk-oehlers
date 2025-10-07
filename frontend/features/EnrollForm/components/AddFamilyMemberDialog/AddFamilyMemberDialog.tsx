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
import { ADDFAMILYMEMBERFORMDEFAULTVALUES } from "../../constants";
import { RequiredInputDescription } from "../RequiredInputDescription/RequiredInputDescription";

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
    reset(ADDFAMILYMEMBERFORMDEFAULTVALUES, { keepDefaultValues: true });
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
            <Dialog.Header closeModal={resetDialog} title="Add family member" />
            <Dialog.Content className="h-[70dvh] overflow-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-40"
              >
                <PersonalInformation
                  control={control}
                  countryOptions={getCountryOptions()}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  trigger={trigger}
                />
                <div className="flex flex-col gap-20">
                  <RequiredInputDescription />
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
                </div>
              </form>
            </Dialog.Content>
          </Dialog.ContentContainer>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
