import { PortableText } from "@/components/PortableText/PortableText";
import type { LegalPageProps } from "./LegalPage.types";

/**
 * Layout for the juridische pagina's -- privacyverklaring, algemene
 * voorwaarden, and any further legal page the practice publishes.
 *
 * A single column capped at a comfortable measure: this is long-form prose
 * nobody reads for pleasure, so the only job is to keep it legible.
 */
export const LegalPage = ({ body, title }: LegalPageProps) => {
  return (
    <div className="main-grid">
      <article className="content-section flex max-w-[75ch] flex-col gap-25 py-60 lg:py-110">
        <h1 className="typography-headline-1 text-black">{title}</h1>
        <PortableText value={body} />
      </article>
    </div>
  );
};
