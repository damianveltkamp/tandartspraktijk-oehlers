import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Link } from "@/components/Link/Link";
import type {
  ButtonProps,
  ButtonVariants,
  LinkButtonProps,
} from "./Button.types";

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
        contrasting:
          "bg-gray-400 hocus:outline-2 hocus:outline-secondary hocus:outline-offset-2",
      },
    },
  },
);

const styles = (variant: ButtonVariants, className: string | undefined) =>
  twMerge(variants({ variant, className }));

export const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button className={styles(variant, className)} {...props}>
      {children}
    </button>
  );
};

export const LinkButton = ({
  children,
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) => {
  return (
    <Link className={styles(variant, className)} {...props}>
      {children}
    </Link>
  );
};
