import type { TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { InputLabel } from "../InputLabel/InputLabel";
import {
  InputError,
  InputHint,
} from "../InputAccessibility/InputAccessibility";
import { inputGetAriaDescribedBy } from "@/utils/getAriaDescribedBy";
import { extendedReactHookFormRegister } from "@/utils/extendedReactHookFormRegister";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  hintText?: string;
  inputKey: string;
  label: string;
  register: UseFormRegisterReturn;
}
export const TextArea = ({
  label,
  inputKey,
  register,
  required,
  errorMessage,
  hintText,
  className,
  ...props
}: TextAreaProps) => {
  const hintTextId = `${inputKey}-help-text`;
  const errorTextId = `${inputKey}-error`;

  return (
    <div className={twMerge("flex flex-col gap-5", className)}>
      <InputLabel
        required={Boolean(required)}
        label={label}
        inputKey={inputKey}
      />
      <textarea
        className="rounded-8 min-h-[127px] w-full bg-gray-100 p-10"
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
