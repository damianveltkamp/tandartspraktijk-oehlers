import type { UseFormRegisterReturn } from "react-hook-form";

export const extendedReactHookFormRegister = (
  inputKey: string,
  register: UseFormRegisterReturn,
) => {
  return { ...register, id: inputKey };
};
