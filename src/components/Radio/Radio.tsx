import { extendedReactHookFormRegister } from "@/utils/extendedReactHookFormRegister";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  inputKey: string;
  label: string;
  register: UseFormRegisterReturn;
}

export const Radio = ({
  inputKey,
  label,
  value,
  register,
  ...props
}: RadioProps) => {
  const inputId = `${inputKey}-${value}`;

  return (
    <div className="flex items-center gap-10">
      <label htmlFor={inputId}>{label}</label>
      <input
        {...extendedReactHookFormRegister(inputId, register)}
        {...props}
        value={value}
        type="radio"
      ></input>
    </div>
  );
};
