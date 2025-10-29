import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: domain as string,
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
