import type { HeroProps } from "@/features/Hero/Hero.types";
import type { Hero } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

export const heroAdapter = (data: Hero | null | undefined) => {
  if (!data) return null;
  const imageSrc = urlForImage(data.image.image).url();

  const heroData: HeroProps = {
    title: data.heading,
    description: data.description,
    uspItems: data.usps ?? [],
    linkButtons: data.links?.map((link) => {
      return {
        isExternal: Boolean(link.isExternalLink),
        href: link.href,
        children: link.linkText,
      };
    }),
    image: {
      src: imageSrc,
      alt: data.image.alt,
    },
  };

  return heroData;
};
