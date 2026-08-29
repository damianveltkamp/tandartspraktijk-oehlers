import type { PortableTextBlock } from "@portabletext/react";

import type { LegalPageProps } from "@/features/LegalPage/LegalPage.types";
import type { GetLegalPageQueryResult } from "@/sanity.types";

export const legalPageAdapter = (data: GetLegalPageQueryResult) => {
  if (!data) return null;

  const legalPageData: LegalPageProps = {
    title: data.title,
    // The generated `BlockContent` and the renderer's `PortableTextBlock` model
    // the same data with different optionality, and neither is assignable to
    // the other. The blocks are passed straight through untouched -- crucially
    // including their stega-encoded strings, so visual editing keeps working.
    body: data.body as unknown as PortableTextBlock[],
  };

  return legalPageData;
};
