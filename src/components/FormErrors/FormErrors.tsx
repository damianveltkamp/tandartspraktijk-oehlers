import type { HTMLAttributes } from "react";
import type { FieldErrors } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface FormErrorsProps extends HTMLAttributes<HTMLParagraphElement> {
  errors: FieldErrors;
}

export const FormErrors = ({
  children,
  className,
  errors,
}: FormErrorsProps) => {
  return (
    <p
      role="alert"
      className={twMerge(
        "typography-body rounded-8 flex flex-col gap-20 bg-red-600 p-20 text-white",
        className,
      )}
    >
      <span>{children}</span>
      <span className="flex flex-col gap-10">
        {Object.entries(errors).map(
          ([fieldName, error]) =>
            error && (
              <a key={fieldName} href={`#${fieldName}`}>
                {`${error.message}`}
              </a>
            ),
        )}
      </span>
      {/* <a href="#">Please fill in your email.</a> */}
    </p>
  );
};
