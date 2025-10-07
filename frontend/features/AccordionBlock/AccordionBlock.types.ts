import type { AccordionItem } from "@/components/Accordion/Accordion.types";

export interface AccordionBlockProps {
  className?: string;
  items: AccordionItem[];
  title: string;
}
