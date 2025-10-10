import type { CustomImage } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import type { ImageProps as NextImageProps } from "next/image";

export const imageAdapter = (data: CustomImage | null | undefined) => {
  if (!data) return null;
  const imageSrc = urlForImage(data.image).url();

  const heroData: NextImageProps = {
    src: imageSrc,
    alt: data.alt,
  };

  return heroData;
};
