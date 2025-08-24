import type { ButtonHTMLAttributes } from "react";
import type { LinkProps } from "../Link/Link.types";

export type ButtonVariants = "blackGhost" | "primary" | "secondary";

interface Props {
  fullWidth?: boolean;
  variant?: ButtonVariants;
}

export interface LinkButtonProps extends LinkProps, Props {}
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Props {}
