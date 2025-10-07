import type { HeroProps } from "@/features/Hero/Hero.types";
import type { Hero } from "@/sanity.types";

export const heroAdapter = (data: Hero | null | undefined) => {
  if (!data) return null;

  const foo: HeroProps = {
    title: data.heading,
    description: data.description,
    uspItems: data.usps ?? [""],
    linkButtons: [
      {
        isExternal: false,
        href: data.contactLink.href,
        children: data.contactLink.linkText,
        variant: "blackGhost",
      },
      {
        isExternal: false,
        href: data.enrollmentLink.href,
        children: data.enrollmentLink.linkText,
        variant: "secondary",
      },
    ],
  };

  return foo;
};
