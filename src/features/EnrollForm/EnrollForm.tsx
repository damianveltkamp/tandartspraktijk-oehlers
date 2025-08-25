"use client";
import { Input } from "@/components/Input/Input";
import { Legend } from "@/components/Legend/Legend";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { FormValues } from "./validation";
import { enrollValidationSchema } from "./validation";
import type { Inputs } from "./EnrollForm.types";
import type { SelfMappedRecord } from "@/utils/types/selfMappedRecord";
import { twMerge } from "tailwind-merge";
import { FormErrors } from "@/components/FormErrors/FormErrors";
import type { CountryCode } from "libphonenumber-js";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { Select } from "@/components/Select/Select";
import type { SelectOption } from "@/components/Select/Select.types";
import { FORM_AUTOCOMPLETE } from "@/constants/form-autocomplete";
import { Radio } from "@/components/Radio/Radio";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      addressHouseNumber: "",
      addressPostalCode: "",
      addressStreet: "",
      adressPlaceName: "",
      personaliaDateOfBirth: "",
      personaliaEmail: "",
      personaliaFirstName: "",
      personaliaInfix: "",
      personaliaLastname: "",
      personaliaPhone: "",
      specialMessage: "",
    },
    resolver: zodResolver(enrollValidationSchema),
  });

  const INPUTKEYS: SelfMappedRecord<Inputs> = {
    addressHouseNumber: "addressHouseNumber",
    addressPostalCode: "addressPostalCode",
    addressStreet: "addressStreet",
    adressPlaceName: "adressPlaceName",
    personaliaDateOfBirth: "personaliaDateOfBirth",
    personaliaEmail: "personaliaEmail",
    personaliaFirstName: "personaliaFirstName",
    personaliaGender: "personaliaGender",
    personaliaInfix: "personaliaInfix",
    personaliaLastname: "personaliaLastname",
    personaliaPhone: "personaliaPhone",
    personaliaPhoneCountry: "personaliaPhoneCountry",
    specialMessage: "specialMessage",
  } as const;

  // TODO: handle submitting data. Send grid or some other integration.
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const formHasErrors = Object.keys(errors).length > 0;

  const countryCodes: CountryCode[] = [
    "NL",
    ...getCountries().filter((code) => code !== "NL"),
  ];

  const countryOptions = countryCodes.map((country) => {
    const options: SelectOption = {
      value: country,
      label: `${country} (+${getCountryCallingCode(country)})`,
    };

    return options;
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={twMerge("flex flex-col gap-40 lg:gap-60", className)}
    >
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
          <div className="col-span-2 flex gap-15">
            <Radio
              className="flex-row"
              label="Man"
              value="man"
              type="radio"
              inputKey={INPUTKEYS.personaliaGender}
              register={register(INPUTKEYS.personaliaGender)}
            />
            <Radio
              className="flex-row"
              label="Vrouw"
              value="vrouw"
              type="radio"
              inputKey={INPUTKEYS.personaliaGender}
              register={register(INPUTKEYS.personaliaGender)}
            />
          </div>
        </fieldset>
        <div>
          {/* TODO: add autocomplete functionality based on googles saved data. Check what you impelemented on the Maandag project.*/}
          <Input
            required
            label="Firstname"
            inputKey={INPUTKEYS.personaliaFirstName}
            register={register(INPUTKEYS.personaliaFirstName)}
            errorMessage={errors.personaliaFirstName?.message}
            autoComplete={FORM_AUTOCOMPLETE.personaliaFirstname}
          />
        </div>
        <div>
          <Input
            label="Tussenvoegsel"
            inputKey={INPUTKEYS.personaliaInfix}
            register={register(INPUTKEYS.personaliaInfix)}
            errorMessage={errors.personaliaInfix?.message}
          />
        </div>
        <div className="lg:col-span-2">
          <Input
            required
            label="Lastname"
            inputKey={INPUTKEYS.personaliaLastname}
            register={register(INPUTKEYS.personaliaLastname)}
            errorMessage={errors.personaliaLastname?.message}
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
            register={register(INPUTKEYS.personaliaDateOfBirth)}
            errorMessage={errors.personaliaDateOfBirth?.message}
            autoComplete={FORM_AUTOCOMPLETE.personaliaDateOfBirth}
          />
        </div>
        <div>
          <Input
            required
            type="email"
            label="E-mailadres"
            inputKey={INPUTKEYS.personaliaEmail}
            register={register(INPUTKEYS.personaliaEmail)}
            errorMessage={errors.personaliaEmail?.message}
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
            register={register(INPUTKEYS.personaliaPhoneCountry)}
            onChange={async (event) => {
              const value = event.target.value;

              setValue("personaliaPhoneCountry", value, {
                shouldValidate: true,
              });

              await trigger("personaliaPhone");
            }}
          />
          <Input
            className="lg:w-1/2"
            type="tel"
            label="Mobiele telefoon"
            hintText="Bijvoorbeeld: 06 12345678"
            inputKey={INPUTKEYS.personaliaPhone}
            register={register(INPUTKEYS.personaliaPhone)}
            errorMessage={errors.personaliaPhone?.message}
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
              placeholder="Vul uw straatnaam in"
              inputKey={INPUTKEYS.addressStreet}
              register={register(INPUTKEYS.addressStreet)}
              errorMessage={errors.addressStreet?.message}
              autoComplete={FORM_AUTOCOMPLETE.addressStreetName}
            />
          </div>
          <div>
            <Input
              required
              label="Huisnummer + toevoeging"
              placeholder="Vul uw huisnummer + toevoeging in"
              inputKey={INPUTKEYS.addressHouseNumber}
              register={register(INPUTKEYS.addressHouseNumber)}
              errorMessage={errors.addressHouseNumber?.message}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <div>
            <Input
              required
              label="Postcode"
              placeholder="Vul uw postcode in"
              inputKey={INPUTKEYS.addressPostalCode}
              register={register(INPUTKEYS.addressPostalCode)}
              errorMessage={errors.addressPostalCode?.message}
              autoComplete={FORM_AUTOCOMPLETE.addressPostalCode}
            />
          </div>
          <div>
            <Input
              required
              label="Plaatsnaam"
              placeholder="Vul uw plaatsnaam in"
              inputKey={INPUTKEYS.adressPlaceName}
              register={register(INPUTKEYS.adressPlaceName)}
              errorMessage={errors.adressPlaceName?.message}
              autoComplete={FORM_AUTOCOMPLETE.addressPlaceName}
            />
          </div>
        </div>
      </fieldset>
      <div>
        {formHasErrors && (
          <FormErrors errors={errors}>
            Er zitten fouten in het formulier:
          </FormErrors>
        )}
        <p>
          Elk veld gemarkeerd met een * is een{" "}
          <span id="form-required-input">verplicht veld</span> om in te vullen.
        </p>
      </div>
      <button>Submit</button>
    </form>
  );
};
