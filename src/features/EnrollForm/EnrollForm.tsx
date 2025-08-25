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
      addressHouseNumberAddition: "",
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
    // TODO: check why typescript complains in line below.
    resolver: zodResolver(enrollValidationSchema),
  });

  const INPUTKEYS: SelfMappedRecord<Inputs> = {
    addressHouseNumber: "addressHouseNumber",
    addressHouseNumberAddition: "addressHouseNumberAddition",
    addressPostalCode: "addressPostalCode",
    addressStreet: "addressStreet",
    adressPlaceName: "adressPlaceName",
    personaliaDateOfBirth: "personaliaDateOfBirth",
    personaliaEmail: "personaliaEmail",
    personaliaFirstName: "personaliaFirstName",
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
      <fieldset className="grid grid-cols-1 gap-20 lg:grid-cols-2">
        <Legend className="mb-20">Persoonsgegevens</Legend>
        {/* TODO: add the input label texts inside a dictionary within our cms. Or we just create a local json file. */}
        <div>
          {/* TODO: create wrapper component for this so we dont have to write so much personaliaFirstName. */}
          {/* TODO: add autocomplete functionality based on googles saved data. Check what you impelemented on the Maandag project.*/}
          <Input
            required
            label="Firstname"
            inputKey={INPUTKEYS.personaliaFirstName}
            register={register(INPUTKEYS.personaliaFirstName)}
            errorMessage={errors.personaliaFirstName?.message}
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
          />
        </div>
      </fieldset>
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
            />
          </div>
          <div>
            <Input
              required
              label="Huisnummer"
              placeholder="Vul uw huisnummer in"
              inputKey={INPUTKEYS.addressHouseNumber}
              register={register(INPUTKEYS.addressHouseNumber)}
              errorMessage={errors.addressHouseNumber?.message}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-3">
          <div>
            <Input
              label="Toevoeging"
              placeholder="Vul uw huisnummer toevoeging in"
              inputKey={INPUTKEYS.addressHouseNumberAddition}
              register={register(INPUTKEYS.addressHouseNumberAddition)}
              errorMessage={errors.addressHouseNumberAddition?.message}
            />
          </div>
          <div>
            <Input
              required
              label="Postcode"
              placeholder="Vul uw postcode in"
              inputKey={INPUTKEYS.addressPostalCode}
              register={register(INPUTKEYS.addressPostalCode)}
              errorMessage={errors.addressPostalCode?.message}
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
