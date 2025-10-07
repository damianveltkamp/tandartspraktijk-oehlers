import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { AccordionItem } from "./Accordion.types";

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion = ({ items }: AccordionProps) => {
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      className="flex flex-col gap-15"
    >
      {items.map(({ title, description }) => (
        <RadixAccordion.Item
          value={title}
          key={title}
          className="group rounded-8 flex flex-col content-center border focus-within:outline focus-within:outline-offset-4 focus-within:outline-black"
        >
          <div className="overflow-hidden">
            <RadixAccordion.Header>
              <RadixAccordion.Trigger className="typography-body-emphasized flex w-full items-center justify-between p-20 text-left hover:cursor-pointer focus:outline-none">
                <span>{title}</span>
                <ChevronDown className="duration-300 ease-[var(--animation-timing-smooth)] group-data-[state=open]:-rotate-180" />
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className="data-[state=open]:animate-radixAccordionSlideDown data-[state=closed]:animate-radixAccordionSlideUp px-20">
              <div className="pb-20">{description}</div>
            </RadixAccordion.Content>
          </div>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};
