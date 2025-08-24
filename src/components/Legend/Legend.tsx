import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Legend = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLLegendElement>) => {
  return (
    <legend className={twMerge("typography-headline-2", className)} {...props}>
      {children}
    </legend>
  );
};
