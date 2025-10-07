import { Accordion } from "@/components/Accordion/Accordion";
import { twMerge } from "tailwind-merge";
import type { AccordionBlockProps } from "./AccordionBlock.types";

export const AccordionBlock = ({
  title,
  items,
  className,
}: AccordionBlockProps) => {
  return (
    <div
      id="feature-faq"
      className={twMerge("flex flex-col gap-30", className)}
    >
      <h2 className="typography-headline-2">{title}</h2>
      <Accordion items={items} />
    </div>
  );
};
