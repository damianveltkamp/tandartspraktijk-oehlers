import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId, studioUrl } from "@/sanity/lib/api";
import type { CreateDataAttributeProps } from "next-sanity";
import { createDataAttribute } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import type { SettingsQueryResult } from "@/sanity.types";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};

export function resolveOpenGraphImage(
  image: NonNullable<SettingsQueryResult>["ogImage"] | null | undefined,
  width = 1200,
  height = 627,
) {
  // Sanity keeps the image wrapper object around as soon as any subfield is
  // set, so an `ogImage` with only `alt` filled in passes a plain null check
  // and then makes the url builder throw. This runs inside the root
  // `generateMetadata`, where a throw takes down every route, so both the
  // missing asset and a malformed `_ref` have to degrade to "no OG image".
  if (!image?.asset?._ref) return;

  let url: string | undefined;
  try {
    url = urlForImage(image).width(width).height(height).fit("crop").url();
  } catch {
    return;
  }
  if (!url) return;

  return { url, alt: image.alt ?? "", width, height };
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, "id" | "path" | "type">>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}
