import type {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
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

interface PersonalInformationProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  countryOptions: SelectOption[];
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  trigger: UseFormTrigger<TFormValues>;
}

export const PersonalInformation = <TFormValues extends FieldValues>({
  control,
  countryOptions,
  errors,
  register,
  setValue,
  trigger,
}: PersonalInformationProps<TFormValues>) => {
  return (
    <>
      <section
        className="grid grid-cols-1 gap-20 lg:grid-cols-2"
        aria-labelledby="personalia-heading"
      >
        <h2
          className="typography-headline-2 mb-20 lg:col-span-2"
          id="personalia-heading"
        >
          Persoonsgegevens
        </h2>
        {/* TODO: add the input label texts inside a dictionary within our cms. Or we just create a local json file. */}
        <fieldset className="lg:col-span-2">
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
                      | string
                      | undefined
                  }
                />
              )}
            />
          </div>
        </fieldset>
        <div>
          <Input
            required
            label="Firstname"
            inputKey={INPUTKEYS.personaliaFirstName}
            register={register(
              INPUTKEYS.personaliaFirstName as Path<TFormValues>,
            )}
            errorMessage={
              errors[INPUTKEYS.personaliaFirstName]?.message as
                | string
                | undefined
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
            label="Lastname"
            inputKey={INPUTKEYS.personaliaLastname}
            register={register(
              INPUTKEYS.personaliaLastname as Path<TFormValues>,
            )}
            errorMessage={
              errors[INPUTKEYS.personaliaLastname]?.message as
                | string
                | undefined
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
                | string
                | undefined
            }
            autoComplete={FORM_AUTOCOMPLETE.personaliaDateOfBirth}
          />
        </div>
        <div>
          <Input
            required
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
        <div className="flex flex-col gap-20 lg:flex-row">
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
                  | string
                  | undefined
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
                  | string
                  | undefined
              }
              autoComplete={FORM_AUTOCOMPLETE.addressPostalCode}
            />
          </div>
          <div>
            <Input
              required
              label="Plaatsnaam"
              inputKey={INPUTKEYS.adressPlaceName}
              register={register(
                INPUTKEYS.adressPlaceName as Path<TFormValues>,
              )}
              errorMessage={
                errors[INPUTKEYS.adressPlaceName]?.message as string | undefined
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
