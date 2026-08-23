import type { ButtonHTMLAttributes } from "react";
import type { LinkProps } from "../Link/Link.types";

export type ButtonShapes = "pill" | "rounded";
export type ButtonVariants =
  "blackGhost" | "contrasting" | "primary" | "secondary" | "whiteGhost";

interface Props {
  /** `pill` is the fully-rounded shape used by the video hero's CTAs. */
  shape?: ButtonShapes;
  variant?: ButtonVariants;
}

export interface LinkButtonProps extends LinkProps, Props {}
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, Props {}
