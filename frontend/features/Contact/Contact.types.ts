interface ContactDetail {
  title: string;
  type: "email" | "location" | "phone" | "website";
  url: string;
}

export interface ContactProps {
  className?: string;
  contactDetails: ContactDetail[];
  description: string;
  id?: string;
  title: string;
}
