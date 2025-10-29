import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId, studioUrl } from "@/sanity/lib/api";
import type { CreateDataAttributeProps } from "next-sanity";
import { createDataAttribute } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
// import type { SettingsQueryResult } from "@/sanity.types";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};

// export function resolveOpenGraphImage(
//   image: NonNullable<SettingsQueryResult>["ogImage"] | null,
//   width = 1200,
//   height = 627,
// ) {
//   if (!image) return;
//   const url = urlForImage(image).width(1200).height(627).fit("crop").url();
//   if (!url) return;
//   return { url, alt: image.alt, width, height };
// }

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, "id" | "path" | "type">>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}
