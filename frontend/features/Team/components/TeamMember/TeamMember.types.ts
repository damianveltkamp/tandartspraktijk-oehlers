import type { ImageProps as NextImageProps } from "next/image";

export interface TeamMemberType {
  image: NextImageProps;
  jobDescription?: string;
  jobTitle: string;
  name: string;
}

export interface TeamMemberProps extends TeamMemberType {
  shouldBePlacedInTheMiddle: boolean;
}
