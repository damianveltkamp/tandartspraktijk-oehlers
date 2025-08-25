import type { SelectHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
  hintText?: string;
  inputKey: string;
  label: string;
  options: SelectOption[];
  register: UseFormRegisterReturn;
}
