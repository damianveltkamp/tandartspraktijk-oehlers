import type { SelfMappedRecord } from "@/utils/types/selfMappedRecord";
import type { EnrollFormValues, PersonalInformationValues } from "./validation";

export const INPUTKEYS: SelfMappedRecord<keyof EnrollFormValues> = {
  addressHouseNumber: "addressHouseNumber",
  addressPostalCode: "addressPostalCode",
  addressStreet: "addressStreet",
  addressPlaceName: "addressPlaceName",
  personaliaDateOfBirth: "personaliaDateOfBirth",
  personaliaEmail: "personaliaEmail",
  personaliaFirstName: "personaliaFirstName",
  personaliaGender: "personaliaGender",
  personaliaInfix: "personaliaInfix",
  personaliaLastname: "personaliaLastname",
  personaliaPhone: "personaliaPhone",
  personaliaPhoneCountry: "personaliaPhoneCountry",
  specialMessage: "specialMessage",
  termsAndConditions: "termsAndConditions",
  familyMembers: "familyMembers",
} as const;

export const ENROLLFORMDEFAULTVALUES: EnrollFormValues = {
  termsAndConditions: "",
  addressHouseNumber: "",
  addressPostalCode: "",
  addressStreet: "",
  addressPlaceName: "",
  personaliaGender: "",
  personaliaDateOfBirth: "",
  personaliaEmail: "",
  personaliaFirstName: "",
  personaliaInfix: "",
  personaliaLastname: "",
  personaliaPhone: "",
  personaliaPhoneCountry: "NL",
  specialMessage: "",
  familyMembers: [],
};

export const ADDFAMILYMEMBERFORMDEFAULTVALUES: PersonalInformationValues = {
  addressHouseNumber: "",
  addressPostalCode: "",
  addressStreet: "",
  addressPlaceName: "",
  personaliaDateOfBirth: "",
  personaliaEmail: "",
  personaliaFirstName: "",
  personaliaGender: "",
  personaliaInfix: "",
  personaliaLastname: "",
  personaliaPhone: "",
  specialMessage: "",
};
