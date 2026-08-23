import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/utils/getBaseUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = getBaseUrl() ?? "";

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
  ];

  return sitemap;
}
