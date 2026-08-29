import type { Metadata } from "next";

import { heroAdapter } from "@/adapters/objects/hero";
import { EnrollForm } from "@/features/EnrollForm/EnrollForm";
import { Hero } from "@/features/Hero/Hero";
import { sanityFetch } from "@/sanity/lib/live";
import { getEnrollmentPageQuery, settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

const title = "Inschrijven";
const description =
  "Schrijf u en uw gezin in als nieuwe patiënt bij Tandartspraktijk Oehlers in Landsmeer.";

/**
 * Next replaces `openGraph` wholesale instead of merging it into the parent's,
 * so a page-level object has to repeat every field the root layout sets --
 * otherwise the most-shared page of the site ends up with an OG card that has
 * no image and no site name.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });
  const ogImage = resolveOpenGraphImage(settings?.ogImage);

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: settings?.title ?? "",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

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
