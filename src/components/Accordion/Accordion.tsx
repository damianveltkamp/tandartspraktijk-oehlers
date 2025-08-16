import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  description: string;
  title: string;
}

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
          className="group rounded-8 flex flex-col content-center overflow-hidden border"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="typography-body-emphasized flex w-full items-center justify-between p-20 text-left hover:cursor-pointer">
              <span>{title}</span>
              <ChevronDown className="duration-300 ease-[var(--animation-timing-smooth)] group-data-[state=open]:-rotate-180" />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="data-[state=open]:animate-radixAccordionSlideDown data-[state=closed]:animate-radixAccordionSlideUp px-20">
            <div className="pb-20">{description}</div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};
