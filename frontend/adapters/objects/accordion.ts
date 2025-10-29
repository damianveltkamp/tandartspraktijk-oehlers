import type { AccordionBlockProps } from "@/features/AccordionBlock/AccordionBlock.types";
import type { Accordion } from "@/sanity.types";

export const accordionBlockAdapter = (data: Accordion | null | undefined) => {
  if (!data) return null;

  const accordionBlockData: AccordionBlockProps = {
    title: data.heading,
    items:
      data.accordionItems?.map((item) => {
        return {
          title: item.heading,
          description: item.description,
        };
      }) ?? [],
  };

  return accordionBlockData;
};
