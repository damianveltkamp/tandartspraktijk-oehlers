export interface HeaderNavigationItem {
  href: string;
  text: string;
}

export interface HeaderProps {
  /** Display text and `tel:` href for the practice's phone number. */
  phone: { href: string; text: string } | null;
}
