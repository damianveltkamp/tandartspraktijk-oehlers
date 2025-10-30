import { Accordion } from "@/components/Accordion/Accordion";
import { twMerge } from "tailwind-merge";
import type { AccordionBlockProps } from "./AccordionBlock.types";

export const AccordionBlock = ({
  title,
  items,
  className,
  ...props
}: AccordionBlockProps) => {
  return (
    <div className={twMerge("flex flex-col gap-30", className)} {...props}>
      <h2 className="typography-headline-2">{title}</h2>
      <Accordion items={items} />
    </div>
  );
};
