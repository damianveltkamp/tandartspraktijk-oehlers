import type { VideoHeroProps } from "@/features/VideoHero/VideoHero.types";
import type { GetHomepageQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

type HomepageHeroData = NonNullable<GetHomepageQueryResult>["hero"];

export const videoHeroAdapter = (data: HomepageHeroData | null | undefined) => {
  if (!data) return null;
  const posterSrc = urlForImage(data.image.image).url();

  const videoHeroData: VideoHeroProps = {
    title: data.heading,
    description: data.description,
    uspItems: data.usps ?? [],
    linkButtons: data.links?.map((link) => {
      return {
        isExternal: Boolean(link.isExternalLink),
        href: link.href,
        children: link.linkText,
      };
    }),
    poster: {
      src: posterSrc,
      alt: data.image.alt,
    },
    // `video` is required in the schema, so typegen types it as always present.
    // Content published before the field existed has no value for it yet, which
    // would make a non-optional access throw at runtime.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    videoUrl: data.video?.asset?.url ?? null,
  };

  return videoHeroData;
};
