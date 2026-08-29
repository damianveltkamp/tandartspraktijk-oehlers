import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { legalPageAdapter } from "@/adapters/objects/legalPage";
import { LegalPage } from "@/features/LegalPage/LegalPage";
import { sanityFetch } from "@/sanity/lib/live";
import { getLegalPageQuery } from "@/sanity/lib/queries";

interface LegalPageRouteProps {
  params: Promise<{ slug: string }>;
}

/**
 * The shape `slug` generates from a Dutch title: lowercase letters, digits and
 * single hyphens. This catch-all segment matches every unmatched top-level
 * path, so without this guard each scanner request (`/wp-login.php`, `/.env`)
 * would cost a Sanity query before 404ing. No such path can name a real
 * document, so rejecting it early changes nothing an editor can reach.
 *
 * There is no prerendering to pair this with: the route renders through
 * `sanityFetch`, which awaits `draftMode()` and so is always dynamic.
 */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function generateMetadata({
  params,
}: LegalPageRouteProps): Promise<Metadata> {
  const { slug } = await params;

  if (!SLUG_PATTERN.test(slug)) return {};

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

  // Any URL that is not a static route and not a legal page lands here, so
  // this is what serves the site's 404 for unknown paths.
  if (!SLUG_PATTERN.test(slug)) notFound();

  const { data } = await sanityFetch({
    query: getLegalPageQuery,
    params: { slug },
  });

  const page = legalPageAdapter(data);

  if (!page) notFound();

  return <LegalPage {...page} />;
}
