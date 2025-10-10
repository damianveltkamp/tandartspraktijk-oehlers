import z from "zod";
import validator from "validator";
import type { CountryCode } from "libphonenumber-js";
import { isValidPhoneNumber } from "libphonenumber-js";

export type EnrollFormValues = z.infer<typeof enrollValidationSchema>;
export type PersonalInformationValues = z.infer<
  typeof familyMemberValidationSchema
>;

export const validateRequiredString = (errMessage: string) => {
  return z.string({ error: errMessage }).min(1, { error: errMessage });
};

const personalInformation = {
  personaliaGender: validateRequiredString("Selecteer uw geslacht"),
  personaliaFirstName: validateRequiredString("Voornaam moet ingevuld worden."),
  personaliaInfix: z.string(),
  personaliaLastname: validateRequiredString("Achternaam moet ingevuld worden"),
  // NOTE: double check if this validation needs to be updated.
  personaliaDateOfBirth: validateRequiredString(
    "Geboortedatum moet ingevuld worden.",
  ),
  personaliaEmail: z.email({ error: "Voer een geldig e-mailadres in." }),
  personaliaPhoneCountry: z.string().optional(),
  personaliaPhone: z.string().optional(),
  addressStreet: validateRequiredString("Straatnaam moet ingevuld worden."),
  addressHouseNumber: validateRequiredString(
    "Huisnummer moet ingevuld worden.",
  ),
  addressPostalCode: validateRequiredString(
    "Postcode moet ingevuld worden.",
  ).refine((value) => validator.isPostalCode(value, "NL"), {
    message: "Voer een geldig postcode in.",
  }),
  addressPlaceName: validateRequiredString("Plaatsnaam moet ingevuld worden."),
  specialMessage: z.string(),
};

const refinePersonalInformation = (
  personaliaPhoneCountry: unknown,
  personaliaPhone: unknown,
) => {
  // NOTE: we can make this assertion here since we can be 100% sure it's a country code,
  // since we are feeding the select input the country codes provided by the package.
  const phoneCountry = personaliaPhoneCountry as CountryCode;
  const phone = `${personaliaPhone}`;
  const isValid = isValidPhoneNumber(phone, phoneCountry);
  return isValid;
};

export const familyMemberValidationSchema = z
  .object({
    ...personalInformation,
  })
  .refine(
    (data) => {
      return refinePersonalInformation(
        data.personaliaPhoneCountry,
        data.personaliaPhone,
      );
    },
    {
      error: "Voer een geldig telefoonnummer in voor het geselecteerde land.",
      path: ["personaliaPhone"],
    },
  );

export const enrollValidationSchema = z
  .object({
    ...personalInformation,
    termsAndConditions: validateRequiredString(
      "Om uw aanmelding te voltooien, dient u akkoord te gaan met de Algemene Voorwaarden.",
    ),
    familyMembers: z.array(familyMemberValidationSchema).optional(),
  })
  .refine(
    (data) => {
      return refinePersonalInformation(
        data.personaliaPhoneCountry,
        data.personaliaPhone,
      );
    },
    {
      error: "Voer een geldig telefoonnummer in voor het geselecteerde land.",
      path: ["personaliaPhone"],
    },
  );
