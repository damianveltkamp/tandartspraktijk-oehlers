import type { LinkButtonProps } from "@/components/Button/Button.types";

export interface HeroProps {
  description: string;
  linkButtons?: LinkButtonProps[];
  title: string;
  uspItems: string[];
}
