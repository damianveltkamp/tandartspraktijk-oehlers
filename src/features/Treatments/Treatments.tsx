import { Accordion } from "@/components/Accordion/Accordion";
import { twMerge } from "tailwind-merge";

interface Treatment {
  description: string;
  title: string;
}

interface TreatmentsProps {
  className?: string;
  title: string;
  treatments: Treatment[];
}

export const Treatments = ({
  title,
  treatments,
  className,
}: TreatmentsProps) => {
  return (
    <div className={twMerge("flex flex-col gap-30", className)}>
      <h2 className="typography-headline-2">{title}</h2>
      <Accordion items={treatments} />
    </div>
  );
};
