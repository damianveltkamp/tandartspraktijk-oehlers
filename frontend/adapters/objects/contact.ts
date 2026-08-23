import type { ContactProps } from "@/features/Contact/Contact.types";
import type { Contact } from "@/sanity.types";
import type { StegaBranded } from "@sanity/client/stega";
import { stegaClean } from "@sanity/client/stega";

export const contactAdapter = (
  data: Contact | null | StegaBranded<Contact> | undefined,
) => {
  if (!data) return null;

  const contactData: ContactProps = {
    title: data.heading,
    description: data.description,
    contactDetails:
      data.contactDetails?.map((detail) => {
        return {
          title: detail.linkText,
          url: detail.href,
          // `type` is compared against string literals downstream, so the
          // stega encoding has to be stripped first.
          type: stegaClean(detail.type),
        };
      }) ?? [],
  };

  return contactData;
};
