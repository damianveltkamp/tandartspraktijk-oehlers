import { LinkButton } from "@/components/Button/Button";
import { KNMTLogo } from "@/components/KNMTLogo/KNMTLogo";
import { KRTLogo } from "@/components/KRTLogo/KRTLogo";
import { twMerge } from "tailwind-merge";

interface ServicesProps {
  buttonText: string;
  className?: string;
  description: string;
  title: string;
}
export const Services = ({
  title,
  description,
  buttonText,
  className,
}: ServicesProps) => {
  return (
    <div
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
        <a href="#">
          <KRTLogo scale={1.3} />
        </a>
        <a href="#">
          <KNMTLogo scale={0.5} />
        </a>
      </div>
      <div className="w-full lg:w-fit">
        <LinkButton
          href="/Indicatie-bijkomende-materiaal-en-techniekkosten-tandheelkundige-behandelingen.pdf"
          isExternal={false}
          variant="secondary"
          fullWidth
        >
          {buttonText}
        </LinkButton>
      </div>
    </div>
  );
};
