import type { ContactProps } from "@/features/Contact/Contact.types";
import type { Contact } from "@/sanity.types";

export const contactAdapter = (data: Contact | null | undefined) => {
  if (!data) return null;

  const contactData: ContactProps = {
    title: data.heading,
    description: data.description,
    contactDetails:
      data.contactDetails?.map((detail) => {
        return {
          title: detail.linkText,
          url: detail.href,
          type: detail.type,
        };
      }) ?? [],
  };

  return contactData;
};
