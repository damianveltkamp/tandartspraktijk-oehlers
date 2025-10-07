interface ContactDetail {
  title: string;
  url: string;
}

export interface ContactProps {
  className?: string;
  contactDetails: {
    email?: ContactDetail;
    location?: ContactDetail;
    phoneNumber?: ContactDetail;
    website?: ContactDetail;
  };
  description: string;
  id?: string;
  title: string;
}
