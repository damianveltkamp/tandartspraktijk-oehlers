import { extendedReactHookFormRegister } from "@/utils/extendedReactHookFormRegister";
import { inputGetAriaDescribedBy } from "@/utils/getAriaDescribedBy";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { InputLabel } from "../InputLabel/InputLabel";
import {
  InputError,
  InputHint,
} from "../InputAccessibility/InputAccessibility";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  hintText?: string;
  inputKey: string;
  label: string;
  register: UseFormRegisterReturn;
}

export const Input = ({
  label,
  inputKey,
  register,
  required,
  errorMessage,
  hintText,
  className,
  ...props
}: InputProps) => {
  const hintTextId = `${inputKey}-help-text`;
  const errorTextId = `${inputKey}-error`;

  return (
    <div className={twMerge("flex flex-col gap-5", className)}>
      <InputLabel
        required={Boolean(required)}
        label={label}
        inputKey={inputKey}
      />
      <input
        className="rounded-8 bg-gray-100 p-10 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        {...extendedReactHookFormRegister(inputKey, register)}
        required={required}
        {...props}
        aria-describedby={inputGetAriaDescribedBy(
          Boolean(errorMessage),
          Boolean(hintText),
          hintTextId,
          errorTextId,
        )}
        aria-invalid={errorMessage ? "true" : undefined}
      />
      <InputError errorMessage={errorMessage} errorTextId={errorTextId} />
      <InputHint hintText={hintText} hintTextId={hintTextId} />
    </div>
  );
};
