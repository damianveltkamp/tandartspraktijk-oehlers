import type { Metadata } from "next";

import { LinkButton } from "@/components/Button/Button";
import { ErrorPage } from "@/features/ErrorPage/ErrorPage";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  description:
    "Deze pagina bestaat niet of is verplaatst. Ga terug naar de homepage of neem contact op met Tandartspraktijk Oehlers.",
  // A 404 has nothing worth indexing, and letting it into the index costs the
  // rest of the site crawl budget.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <ErrorPage
      title="Deze pagina bestaat niet"
      description="De pagina die u zoekt is verplaatst of bestaat niet meer. Controleer het adres of ga terug naar de homepage."
    >
      <LinkButton isExternal={false} href="/">
        Terug naar de homepage
      </LinkButton>
      <LinkButton isExternal={false} href="/inschrijven" variant="secondary">
        Inschrijven als patiënt
      </LinkButton>
    </ErrorPage>
  );
}
