import type {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { INPUTKEYS } from "../../constants";
import { RadioGroup } from "@/components/RadioGroup/RadioGroup";
import { Input } from "@/components/Input/Input";
import { FORM_AUTOCOMPLETE } from "@/constants/form-autocomplete";
import { Select } from "@/components/Select/Select";
import { Legend } from "@/components/Legend/Legend";
import { TextArea } from "@/components/Textarea/Textarea";
import type { SelectOption } from "@/components/Select/Select.types";
import clsx from "clsx";
import { Button } from "@/components/Button/Button";
import type { EnrollFormValues } from "../../validation";

interface PersonalInformationProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  countryOptions: SelectOption[];
  errors: FieldErrors<TFormValues>;
  getMainRegistrarData?: UseFormGetValues<EnrollFormValues>;
  register: UseFormRegister<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  trigger: UseFormTrigger<TFormValues>;
  usedForAddingFamilyMember?: boolean;
}

export const PersonalInformation = <TFormValues extends FieldValues>({
  getMainRegistrarData,
  control,
  countryOptions,
  errors,
  register,
  setValue,
  trigger,
  usedForAddingFamilyMember,
}: PersonalInformationProps<TFormValues>) => {
  const phoneNumberRowContainer = clsx(
    "flex flex-col gap-20 lg:flex-row",
    usedForAddingFamilyMember && "lg:col-span-2",
  );

  return (
    <>
      <section
        className="grid grid-cols-1 gap-20 lg:grid-cols-2"
        aria-labelledby="personalia-heading"
      >
        <h2
          className="typography-headline-2 lg:col-span-2"
          id="personalia-heading"
        >
          Persoonsgegevens
        </h2>
        <fieldset className="flex flex-col gap-20 lg:col-span-2">
          <legend className="typography-body mb-20">Geslacht</legend>
          <div className="col-span-2">
            <Controller
              name={INPUTKEYS.personaliaGender as Path<TFormValues>}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  items={[
                    { value: "man", label: "Man" },
                    { value: "vrouw", label: "Vrouw" },
                  ]}
                  inputKey={INPUTKEYS.personaliaGender}
                  field={field}
                  errorMessage={
                    errors[INPUTKEYS.personaliaGender]?.message as
                      string | undefined
                  }
                />
              )}
            />
          </div>
        </fieldset>
        <div>
          <Input
            required
            label="Voornaam"
            inputKey={INPUTKEYS.personaliaFirstName}
            register={register(
              INPUTKEYS.personaliaFirstName as Path<TFormValues>,
            )}
            errorMessage={
              errors[INPUTKEYS.personaliaFirstName]?.message as
                string | undefined
            }
            autoComplete={FORM_AUTOCOMPLETE.personaliaFirstname}
          />
        </div>
        <div>
          <Input
            label="Tussenvoegsel"
            inputKey={INPUTKEYS.personaliaInfix}
            register={register(INPUTKEYS.personaliaInfix as Path<TFormValues>)}
            errorMessage={
              errors[INPUTKEYS.personaliaInfix]?.message as string | undefined
            }
          />
        </div>
        <div className="lg:col-span-2">
          <Input
            required
            label="Achternaam"
            inputKey={INPUTKEYS.personaliaLastname}
            register={register(
              INPUTKEYS.personaliaLastname as Path<TFormValues>,
            )}
            errorMessage={
              errors[INPUTKEYS.personaliaLastname]?.message as
                string | undefined
            }
            autoComplete={FORM_AUTOCOMPLETE.personaliaLastname}
          />
        </div>
        <div>
          <Input
            type="date"
            required
            label="Geboortedatum"
            hintText="Format: DD/MM/YYYY"
            inputKey={INPUTKEYS.personaliaDateOfBirth}
            register={register(
              INPUTKEYS.personaliaDateOfBirth as Path<TFormValues>,
            )}
            errorMessage={
              errors[INPUTKEYS.personaliaDateOfBirth]?.message as
                string | undefined
            }
            autoComplete={FORM_AUTOCOMPLETE.personaliaDateOfBirth}
          />
        </div>
        <div>
          <Input
            required={usedForAddingFamilyMember ? false : true}
            type="email"
            label="E-mailadres"
            inputKey={INPUTKEYS.personaliaEmail}
            register={register(INPUTKEYS.personaliaEmail as Path<TFormValues>)}
            errorMessage={
              errors[INPUTKEYS.personaliaEmail]?.message as string | undefined
            }
            autoComplete={FORM_AUTOCOMPLETE.personaliaEmail}
          />
        </div>
        <div className={phoneNumberRowContainer}>
          <Select
            className="lg:w-1/2"
            label="Land (mobiele telefoon)"
            hintText="Selecteer het land waarin uw telefoonnummer staat geregistreerd"
            inputKey={INPUTKEYS.personaliaPhoneCountry}
            options={countryOptions}
            register={register(
              INPUTKEYS.personaliaPhoneCountry as Path<TFormValues>,
            )}
            onChange={async (event) => {
              const value = event.target.value;

              setValue(
                INPUTKEYS.personaliaPhoneCountry as Path<TFormValues>,
                value as PathValue<TFormValues, Path<TFormValues>>,
                {
                  shouldValidate: true,
                },
              );

              await trigger(INPUTKEYS.personaliaPhone as Path<TFormValues>);
            }}
          />
          <Input
            required={usedForAddingFamilyMember ? false : true}
            className="lg:w-1/2"
            type="tel"
            label="Mobiele telefoon"
            hintText="Bijvoorbeeld: 06 12345678"
            inputKey={INPUTKEYS.personaliaPhone}
            register={register(INPUTKEYS.personaliaPhone as Path<TFormValues>)}
            errorMessage={
              errors[INPUTKEYS.personaliaPhone]?.message as string | undefined
            }
            autoComplete={FORM_AUTOCOMPLETE.personaliaNationalPhoneNumber}
          />
        </div>
      </section>
      <fieldset className="flex flex-col gap-20">
        <Legend className="mb-20">Adresgegevens</Legend>
        {usedForAddingFamilyMember && (
          <Button
            type="button"
            className="w-fit"
            onClick={() => {
              if (getMainRegistrarData) {
                const mainRegistrarData = getMainRegistrarData();

                setValue(
                  INPUTKEYS.addressPlaceName as Path<TFormValues>,
                  mainRegistrarData.addressPlaceName as PathValue<
                    TFormValues,
                    Path<TFormValues>
                  >,
                  {
                    shouldValidate: true,
                  },
                );
                setValue(
                  INPUTKEYS.addressStreet as Path<TFormValues>,
                  mainRegistrarData.addressStreet as PathValue<
                    TFormValues,
                    Path<TFormValues>
                  >,
                  {
                    shouldValidate: true,
                  },
                );
                setValue(
                  INPUTKEYS.addressPostalCode as Path<TFormValues>,
                  mainRegistrarData.addressPostalCode as PathValue<
                    TFormValues,
                    Path<TFormValues>
                  >,
                  {
                    shouldValidate: true,
                  },
                );
                setValue(
                  INPUTKEYS.addressHouseNumber as Path<TFormValues>,
                  mainRegistrarData.addressHouseNumber as PathValue<
                    TFormValues,
                    Path<TFormValues>
                  >,
                  {
                    shouldValidate: true,
                  },
                );
              }
            }}
          >
            Zelfde adres als hoofd aanmelder
          </Button>
        )}
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <div>
            <Input
              required
              label="Straat"
              inputKey={INPUTKEYS.addressStreet}
              register={register(INPUTKEYS.addressStreet as Path<TFormValues>)}
              errorMessage={
                errors[INPUTKEYS.addressStreet]?.message as string | undefined
              }
              autoComplete={FORM_AUTOCOMPLETE.addressStreetName}
            />
          </div>
          <div>
            <Input
              required
              label="Huisnummer + toevoeging"
              inputKey={INPUTKEYS.addressHouseNumber}
              register={register(
                INPUTKEYS.addressHouseNumber as Path<TFormValues>,
              )}
              errorMessage={
                errors[INPUTKEYS.addressHouseNumber]?.message as
                  string | undefined
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <div>
            <Input
              required
              label="Postcode"
              inputKey={INPUTKEYS.addressPostalCode}
              register={register(
                INPUTKEYS.addressPostalCode as Path<TFormValues>,
              )}
              errorMessage={
                errors[INPUTKEYS.addressPostalCode]?.message as
                  string | undefined
              }
              autoComplete={FORM_AUTOCOMPLETE.addressPostalCode}
            />
          </div>
          <div>
            <Input
              required
              label="Plaatsnaam"
              inputKey={INPUTKEYS.addressPlaceName}
              register={register(
                INPUTKEYS.addressPlaceName as Path<TFormValues>,
              )}
              errorMessage={
                errors[INPUTKEYS.addressPlaceName]?.message as
                  string | undefined
              }
              autoComplete={FORM_AUTOCOMPLETE.addressPlaceName}
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <Legend className="mb-20">Vragen of opmerkingen</Legend>
        <TextArea
          label="Bijzonderheden"
          inputKey={INPUTKEYS.specialMessage}
          register={register(INPUTKEYS.specialMessage as Path<TFormValues>)}
          errorMessage={
            errors[INPUTKEYS.specialMessage]?.message as string | undefined
          }
        />
      </fieldset>
    </>
  );
};
