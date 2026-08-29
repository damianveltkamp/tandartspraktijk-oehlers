import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { getLegalPageSlugsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const legalPages = await client.fetch(getLegalPageSlugsQuery);

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
