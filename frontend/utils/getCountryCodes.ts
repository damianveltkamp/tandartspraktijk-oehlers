import type { SelectOption } from "@/components/Select/Select.types";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

export const getCountryOptions = () => {
  const countryCodes: CountryCode[] = [
    "NL",
    ...getCountries().filter((code) => code !== "NL"),
  ];

  return countryCodes.map((country) => {
    const countryAndCode = `${country} (+${getCountryCallingCode(country)})`;

    const options: SelectOption = {
      value: countryAndCode,
      label: countryAndCode,
    };

    return options;
  });
};
