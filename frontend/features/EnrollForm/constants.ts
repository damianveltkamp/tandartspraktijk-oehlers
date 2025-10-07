import type { SelfMappedRecord } from "@/utils/types/selfMappedRecord";
import type { FormValues } from "./validation";

export const INPUTKEYS: SelfMappedRecord<keyof FormValues> = {
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
  termsAndConditions: "termsAndConditions",
  familyMembers: "familyMembers",
} as const;

export const ADDFAMILYMEMBERFORMDEFAULTVALUES = {
  addressHouseNumber: "",
  addressPostalCode: "",
  addressStreet: "",
  adressPlaceName: "",
  personaliaDateOfBirth: "",
  personaliaEmail: "",
  personaliaFirstName: "",
  personaliaGender: "",
  personaliaInfix: "",
  personaliaLastname: "",
  personaliaPhone: "",
  specialMessage: "",
};
