import z from "zod";
import type { Inputs } from "./EnrollForm.types";
import type { CountryCode } from "libphonenumber-js";
import { isValidPhoneNumber } from "libphonenumber-js";

export type FormValues = z.infer<typeof enrollValidationSchema>;

export const validateRequiredString = (errMessage: string) => {
  return z.string({ error: errMessage }).min(1, { error: errMessage });
};

export const enrollValidationSchema = z
  .object<Record<Inputs, z.ZodType>>({
    addressHouseNumber: validateRequiredString(
      "Huisnummer moet ingevuld worden.",
    ),
    // TODO: Add postalcode validation
    addressPostalCode: validateRequiredString("Postcode moet ingevuld worden."),
    addressStreet: validateRequiredString("Straatnaam moet ingevuld worden."),
    adressPlaceName: validateRequiredString("Plaatsnaam moet ingevuld worden."),
    // NOTE: double check if this validation needs to be updated.
    personaliaDateOfBirth: validateRequiredString(
      "Geboortedatum moet ingevuld worden.",
    ),
    // TODO: make required.
    personaliaEmail: z.email({ error: "Voer een geldig e-mailadres in." }),
    personaliaFirstName: validateRequiredString(
      "Voornaam moet ingevuld worden.",
    ),
    personaliaInfix: z.string(),
    personaliaLastname: validateRequiredString(
      "Achternaam moet ingevuld worden",
    ),
    personaliaPhone: z.string().optional(),
    personaliaPhoneCountry: z.string().optional(),
    specialMessage: z.string(),
  })
  .refine(
    (data) => {
      // NOTE: we can make this assertion here since we can be 100% sure it's a country code,
      // since we are feeding the select input the country codes provided by the package.
      const phoneCountry = data.personaliaPhoneCountry as CountryCode;
      const phone = `${data.personaliaPhone}`;
      const isValid = isValidPhoneNumber(phone, phoneCountry);
      return isValid;
    },
    {
      error: "Voer een geldig telefoonnummer in voor het geselecteerde land.",
      path: ["personaliaPhone"],
    },
  );
