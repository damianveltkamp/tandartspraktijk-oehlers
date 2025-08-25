export const FORM_AUTOCOMPLETE = {
  personaliaFirstname: "given-name",
  personaliaLastname: "family-name",
  personaliaEmail: "email",
  personaliaNationalPhoneNumber: "tel-national",
  // NOTE: bday is not officially supported by chrome browser.
  // However it can be benificiall since date of birth can be autocompleted via password managers.
  personaliaDateOfBirth: "bday",
  addressStreetName: "address-line1",
  addressPlaceName: "address-level2",
  addressPostalCode: "postal-code",
} as const;
