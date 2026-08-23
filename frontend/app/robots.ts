import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/utils/getBaseUrl";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  // Only a positively identified non-production Vercel deployment is hidden
  // from crawlers. Anything we cannot identify -- a self-hosted build, a local
  // run -- stays indexable, so a missing variable can never de-index the live
  // site by accident.
  const vercelEnv = process.env.VERCEL_ENV;
  const isPreviewDeployment =
    vercelEnv !== undefined && vercelEnv !== "production";

  if (isPreviewDeployment) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: baseUrl ? `${baseUrl}/sitemap.xml` : undefined,
  };
}
