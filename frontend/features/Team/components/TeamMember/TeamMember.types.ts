import type { ImageProps as NextImageProps } from "next/image";

export interface TeamMemberType {
  image: NextImageProps;
  jobtitle: string;
  name: string;
}

export interface TeamMemberProps extends TeamMemberType {
  shouldBePlacedInTheMiddle: boolean;
}
