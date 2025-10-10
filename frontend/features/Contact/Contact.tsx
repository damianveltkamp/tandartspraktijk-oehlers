import { Link } from "@/components/Link/Link";
import { Globe, LucideMail, MapPin, Phone } from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { ContactProps } from "./Contact.types";

export const Contact = ({
  id,
  title,
  description,
  contactDetails,
  className,
}: ContactProps) => {
  return (
    <div id={id} className={twMerge("flex flex-col gap-15", className)}>
      <h2 className="typography-headline-2">{title}</h2>
      <p className="typography-body">{description}</p>
      <ul className="flex flex-col gap-15">
        {contactDetails.map((contactDetail) => {
          if (contactDetail.type === "phone") {
            return (
              <li key={contactDetail.title}>
                <Link
                  isExternal
                  href={`tel:${contactDetail.url}`}
                  className="flex gap-15"
                >
                  <Phone />
                  <span className="flex-1">{contactDetail.title}</span>
                </Link>
              </li>
            );
          }

          if (contactDetail.type === "email") {
            return (
              <li key={contactDetail.title}>
                <Link
                  isExternal
                  href={`mailto:${contactDetail.url}`}
                  className="flex gap-15"
                >
                  <LucideMail />
                  <span className="flex-1">{contactDetail.title}</span>
                </Link>
              </li>
            );
          }

          if (contactDetail.type === "location") {
            return (
              <li key={contactDetail.title}>
                <Link
                  isExternal
                  target="_blank"
                  href={contactDetail.url}
                  className="flex gap-15"
                >
                  <MapPin />
                  <span className="flex-1">{contactDetail.title}</span>
                </Link>
              </li>
            );
          }

          return (
            <li key={contactDetail.title}>
              <Link
                isExternal
                target="_blank"
                href={contactDetail.url}
                className="flex gap-15"
              >
                <Globe />
                <span className="flex-1">{contactDetail.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
