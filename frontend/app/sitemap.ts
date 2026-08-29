import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { getLegalPageSlugsQuery } from "@/sanity/lib/queries";
import { getBaseUrl } from "@/utils/getBaseUrl";

/**
 * Legal pages are editor-created, so the set this file renders is not fixed at
 * deploy time: a page published later, or a slug renamed in the Studio, has to
 * reach the sitemap without a redeploy. Next prerenders `sitemap.ts` by
 * default and caches it indefinitely, so revalidate it hourly instead.
 */
export const revalidate = 3600;

/**
 * The static routes below are what matters for indexing, and this file is
 * prerendered during the build -- so a failing Sanity query must degrade the
 * sitemap rather than fail the whole build.
 *
 * Note the limit: this only covers the request. Missing configuration is not
 * caught here, because `sanity/lib/api` and `sanity/lib/token` throw while the
 * module graph is still evaluating, before anything below runs.
 */
async function fetchLegalPageSlugs() {
  try {
    return await client.fetch(getLegalPageSlugsQuery);
  } catch (error) {
    console.error(
      "Kon de juridische pagina's niet ophalen voor de sitemap",
      error,
    );

    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = getBaseUrl() ?? "";

  const legalPages = await fetchLegalPageSlugs();

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: domain,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "monthly",
    },
    {
      url: domain + "/inschrijven",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Legal pages are listed for completeness rather than to compete for
    // traffic -- hence the low priority and the yearly change frequency.
    ...legalPages.map(({ slug, _updatedAt }) => ({
      url: `${domain}/${slug}`,
      lastModified: new Date(_updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  return sitemap;
}
