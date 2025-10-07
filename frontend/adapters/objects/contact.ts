import type { ContactProps } from "@/features/Contact/Contact.types";
import type { Contact } from "@/sanity.types";

export const contactAdapter = (data: Contact | null | undefined) => {
  if (!data) return null;

  const foo: ContactProps = {
    title: data.heading,
    description: data.description,
    contactDetails: {
      email: {
        title: "",
        url: "",
      },
      location: {
        title: "",
        url: "",
      },
      phoneNumber: {
        title: "",
        url: "",
      },
      website: {
        title: "",
        url: "",
      },
    },
  };

  return foo;
};
