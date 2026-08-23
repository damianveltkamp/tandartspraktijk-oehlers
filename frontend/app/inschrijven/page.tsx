import type { Metadata } from "next";

import { heroAdapter } from "@/adapters/objects/hero";
import { EnrollForm } from "@/features/EnrollForm/EnrollForm";
import { Hero } from "@/features/Hero/Hero";
import { sanityFetch } from "@/sanity/lib/live";
import { getEnrollmentPageQuery } from "@/sanity/lib/queries";

const title = "Inschrijven";
const description =
  "Schrijf u en uw gezin in als nieuwe patiënt bij Tandartspraktijk Oehlers in Landsmeer.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default async function Home() {
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getEnrollmentPageQuery }),
  ]);

  const hero = heroAdapter(page?.hero);

  return (
    <div className="main-grid">
      {hero && <Hero {...hero} />}
      {page?.showEnrollmentPage && <EnrollForm className="content-section" />}
      {!page?.showEnrollmentPage && (
        <div className="content-section">
          <p className="typography-body">{page?.enrollmentUnavailableText}</p>
        </div>
      )}
    </div>
  );
}
