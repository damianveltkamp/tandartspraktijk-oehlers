import { LucideMail, Phone } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ContactProps {
  className?: string;
  description: string;
  email: string;
  phoneNumber: string;
  title: string;
}

export const Contact = ({
  title,
  description,
  phoneNumber,
  email,
  className,
}: ContactProps) => {
  return (
    <div className={twMerge("flex flex-col gap-15", className)}>
      <h2 className="typography-headline-2">{title}</h2>
      <p className="typography-body">{description}</p>
      <ul className="flex flex-col gap-15">
        {phoneNumber && (
          <li>
            <a href={`tel:${phoneNumber}`} className="flex gap-15">
              <Phone />
              <span className="flex-1">{phoneNumber}</span>
            </a>
          </li>
        )}
        {email && (
          <li>
            <a href={`mailto:${email}`} className="flex gap-15">
              <LucideMail />
              <span className="flex-1">{email}</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
