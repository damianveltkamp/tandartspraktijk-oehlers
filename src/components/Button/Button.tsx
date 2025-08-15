import { cva } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import type { LinkProps } from "@/components/Link/Link";
import { Link } from "@/components/Link/Link";

type ButtonVariants = "blackGhost" | "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Props {}
interface LinkButtonProps extends LinkProps, Props {}

interface Props {
  fullWidth?: boolean;
  variant?: ButtonVariants;
}

const variants = cva(
  "inline-block py-15 px-40 rounded-8 typography-body hover:cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        blackGhost:
          "bg-transparent border-[2px] border-black hocus:outline-2 hocus:outline-black hocus:outline-offset-2",
        secondary:
          "bg-secondary hocus:outline-2 hocus:outline-secondary hocus:outline-offset-2",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
  },
);

const styles = (
  variant: ButtonVariants,
  fullWidth: boolean,
  className: string | undefined,
) => twMerge(variants({ variant, fullWidth, className }));

export const Button = ({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <button className={styles(variant, fullWidth, className)} {...props}>
      {children}
    </button>
  );
};

export const LinkButton = ({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: LinkButtonProps) => {
  return (
    <Link className={styles(variant, fullWidth, className)} {...props}>
      {children}
    </Link>
  );
};
