import type { AccordionItem } from "@/components/Accordion/Accordion.types";
import type { HTMLAttributes } from "react";

export interface AccordionBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  items: AccordionItem[];
  title: string;
}
