import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { legalPageAdapter } from "@/adapters/objects/legalPage";
import { LegalPage } from "@/features/LegalPage/LegalPage";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getLegalPageQuery,
  getLegalPageSlugsQuery,
} from "@/sanity/lib/queries";

interface LegalPageRouteProps {
  params: Promise<{ slug: string }>;
}

/**
 * The `legalPage` documents that exist at build time. `dynamicParams` stays on
 * its default, so a legal page the practice publishes later is rendered on
 * demand rather than 404ing until the next deploy.
 */
export async function generateStaticParams() {
  const pages = await client.fetch(getLegalPageSlugsQuery);

  return pages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LegalPageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  // `stega: false`: metadata is not rendered into the DOM, so the encoded
  // editing markers would leak into the title and description as-is.
  const { data: page } = await sanityFetch({
    query: getLegalPageQuery,
    params: { slug },
    stega: false,
  });

  if (!page) return {};

  return {
    title: page.title,
    description: page.seoDescription,
  };
}

export default async function LegalPageRoute({ params }: LegalPageRouteProps) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: getLegalPageQuery,
    params: { slug },
  });

  const page = legalPageAdapter(data);

  // Any URL that is not a static route and not a legal page lands here, so
  // this is what serves the site's 404 for unknown paths.
  if (!page) notFound();

  return <LegalPage {...page} />;
}
