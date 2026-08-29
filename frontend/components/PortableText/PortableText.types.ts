import type { PortableTextBlock } from "@portabletext/react";

export interface PortableTextProps {
  /**
   * Rich text as it comes out of Sanity. Typed as the renderer's own block
   * type rather than the generated `BlockContent`, so the component stays
   * usable by any future field that holds rich text.
   */
  value: PortableTextBlock[];
}
