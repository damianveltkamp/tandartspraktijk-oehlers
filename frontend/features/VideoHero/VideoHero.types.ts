import type { LinkButtonProps } from "@/components/Button/Button.types";

export interface VideoHeroProps {
  description: string;
  linkButtons?: LinkButtonProps[];
  /**
   * The video's poster frame, and the standalone hero image while no video
   * asset exists. `src` is always a resolved Sanity URL, never a static import,
   * so it can be handed straight to the `<video poster>` attribute.
   */
  poster: { alt: string; src: string };
  title: string;
  uspItems: string[];
  /** Absent when no video asset has been uploaded yet; the poster then stands alone. */
  videoUrl: null | string;
}
