import type { ServicesProps } from "@/features/Services/Services.types";
import type { Services } from "@/sanity.types";

export const servicesAdapter = (data: null | Services | undefined) => {
  if (!data) return null;

  const foo: ServicesProps = {
    title: data.heading,
    description: data.description,
    link: {
      isExternal: false,
      href: data.costIndicationLink.href,
      children: data.costIndicationLink.linkText,
      target: "_blank",
    },
  };

  return foo;
};
