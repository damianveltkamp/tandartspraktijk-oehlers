import { Accordion } from "@/components/Accordion/Accordion";
import { twMerge } from "tailwind-merge";

interface FAQ {
  description: string;
  title: string;
}

interface FAQProps {
  className?: string;
  faqItems: FAQ[];
  title: string;
}

export const FAQ = ({ title, faqItems, className }: FAQProps) => {
  return (
    <div className={twMerge("flex flex-col gap-30", className)}>
      <h2 className="typography-headline-2">{title}</h2>
      <Accordion items={faqItems} />
    </div>
  );
};
