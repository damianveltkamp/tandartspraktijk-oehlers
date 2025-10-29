import { LinkButton } from "@/components/Button/Button";
import { KNMTLogo } from "@/components/KNMTLogo/KNMTLogo";
import { KRTLogo } from "@/components/KRTLogo/KRTLogo";
import { twMerge } from "tailwind-merge";
import type { ServicesProps } from "./Services.types";

export const Services = ({
  title,
  description,
  link,
  className,
}: ServicesProps) => {
  return (
    <div
      id="feature-services"
      className={twMerge(
        "flex flex-col gap-30 text-center lg:text-left",
        className,
      )}
    >
      <div className="flex flex-col gap-15">
        <h2 className="typography-headline-2">{title}</h2>
        <p className="typography-body">{description}</p>
      </div>
      <div className="flex items-center justify-center gap-15 lg:justify-start">
        <a
          href="https://tandartsregister.nl/tandartsen"
          aria-label="Ga naar de website van het kwaliteitsregister KRT."
        >
          <KRTLogo scale={1.3} />
        </a>
        <a
          href="https://knmt.nl/"
          aria-label="Ga naar de website van beroepsorganisatie KNMT."
        >
          <KNMTLogo scale={0.5} />
        </a>
      </div>
      <div className="w-full lg:w-fit">
        <LinkButton {...link} isExternal={false} variant="secondary" />
      </div>
    </div>
  );
};
