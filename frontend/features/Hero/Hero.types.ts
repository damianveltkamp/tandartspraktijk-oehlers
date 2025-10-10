import type { LinkButtonProps } from "@/components/Button/Button.types";
import type { ImageProps as NextImageProps } from "next/image";

export interface HeroProps {
  description: string;
  image: NextImageProps;
  linkButtons?: LinkButtonProps[];
  title: string;
  uspItems: string[];
}
