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
  const { phoneNumber, email, location, website } = contactDetails;

  return (
    <div id={id} className={twMerge("flex flex-col gap-15", className)}>
      <h2 className="typography-headline-2">{title}</h2>
      <p className="typography-body">{description}</p>
      <ul className="flex flex-col gap-15">
        {phoneNumber?.title && phoneNumber.url && (
          <li>
            <Link
              isExternal
              href={`tel:${phoneNumber.url}`}
              className="flex gap-15"
            >
              <Phone />
              <span className="flex-1">{phoneNumber.title}</span>
            </Link>
          </li>
        )}
        {email?.title && email.url && (
          <li>
            <Link
              isExternal
              href={`mailto:${email.url}`}
              className="flex gap-15"
            >
              <LucideMail />
              <span className="flex-1">{email.title}</span>
            </Link>
          </li>
        )}
        {location?.title && location.url && (
          <li>
            <Link
              isExternal
              target="_blank"
              href={location.url}
              className="flex gap-15"
            >
              <MapPin />
              <span className="flex-1">{location.title}</span>
            </Link>
          </li>
        )}
        {website?.title && website.url && (
          <li>
            <Link
              isExternal
              target="_blank"
              href={website.url}
              className="flex gap-15"
            >
              <Globe />
              <span className="flex-1">{website.title}</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
