import { inputGetAriaDescribedBy } from "@/utils/getAriaDescribedBy";
import type { SelectProps } from "./Select.types";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { extendedReactHookFormRegister } from "@/utils/extendedReactHookFormRegister";

export const Select = ({
  options,
  label,
  inputKey,
  errorMessage,
  hintText,
  className,
  register,
  ...props
}: SelectProps) => {
  const hintTextId = `${inputKey}-help-text`;
  const errorTextId = `${inputKey}-error`;

  return (
    <div className={twMerge("flex flex-col gap-5", className)}>
      <label className="typography-body" htmlFor="">
        {label}
      </label>
      <div className="relative w-full">
        <select
          className="rounded-8 w-full appearance-none bg-gray-100 p-10 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          {...extendedReactHookFormRegister(inputKey, register)}
          {...props}
          aria-describedby={inputGetAriaDescribedBy(
            Boolean(errorMessage),
            Boolean(hintText),
            hintTextId,
            errorTextId,
          )}
          aria-invalid={errorMessage ? "true" : undefined}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2" />
      </div>
      {errorMessage && (
        <span className="text-red-600" id={errorTextId}>
          {errorMessage}
        </span>
      )}
      {hintText && (
        <span className="typography-body-small" id={hintTextId}>
          {hintText}
        </span>
      )}
    </div>
  );
};
