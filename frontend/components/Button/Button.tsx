import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Link } from "@/components/Link/Link";
import type {
  ButtonProps,
  ButtonShapes,
  ButtonVariants,
  LinkButtonProps,
} from "./Button.types";

const variants = cva("inline-block typography-body hover:cursor-pointer", {
  variants: {
    shape: {
      pill: "rounded-full px-30 py-[17px] font-bold",
      rounded: "rounded-8 px-40 py-15",
    },
    variant: {
      primary: "bg-primary",
      blackGhost:
        "bg-transparent border-[2px] border-black hocus:outline-2 hocus:outline-black hocus:outline-offset-2",
      secondary:
        "bg-secondary hocus:outline-2 hocus:outline-secondary hocus:outline-offset-2",
      contrasting:
        "bg-gray-400 hocus:outline-2 hocus:outline-secondary hocus:outline-offset-2",
      whiteGhost:
        "border border-white/40 bg-white/10 text-white hocus:border-white/60 hocus:bg-white/20",
    },
  },
});

const styles = (
  variant: ButtonVariants,
  shape: ButtonShapes,
  className: string | undefined,
) => twMerge(variants({ shape, variant, className }));

export const Button = ({
  children,
  className,
  shape = "rounded",
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button className={styles(variant, shape, className)} {...props}>
      {children}
    </button>
  );
};

export const LinkButton = ({
  children,
  className,
  shape = "rounded",
  variant = "primary",
  ...props
}: LinkButtonProps) => {
  return (
    <Link className={styles(variant, shape, className)} {...props}>
      {children}
    </Link>
  );
};
