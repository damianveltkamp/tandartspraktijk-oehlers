import type { PortableTextComponents } from "@portabletext/react";
import { PortableText as PortableTextRenderer } from "@portabletext/react";

import { Link } from "@/components/Link/Link";
import type { PortableTextProps } from "./PortableText.types";

/**
 * Renders Sanity rich text using the site's own typography utilities.
 *
 * The `blockContent` schema is deliberately narrow, so this covers all of it:
 * two heading levels, paragraphs, both list kinds, strong/em, and links. Every
 * style the schema can produce has an entry here -- if a style is added to the
 * schema without one, `@portabletext/react` falls back to an unstyled element
 * rather than throwing, which is easy to miss. Keep the two in step.
 */
const isExternalHref = (href: string) => !href.startsWith("/");

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="typography-headline-2 mt-35 text-black first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="typography-headline-3 mt-25 text-black first:mt-0">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="typography-body leading-normal text-black">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="typography-body flex list-disc flex-col gap-5 pl-20 leading-normal text-black">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="typography-body flex list-decimal flex-col gap-5 pl-20 leading-normal text-black">
        {children}
      </ol>
    ),
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => (
      <strong className="typography-body-emphasized">{children}</strong>
    ),
    blockLink: ({ children, value }) => {
      // `href` is required in the schema, but a draft can be saved mid-edit
      // with the annotation applied and the URL still empty.
      const href = value?.href;

      if (!href) return <>{children}</>;

      return (
        <Link
          href={href}
          isExternal={isExternalHref(href)}
          className="hocus:no-underline font-bold underline"
        >
          {children}
        </Link>
      );
    },
  },
};

export const PortableText = ({ value }: PortableTextProps) => {
  return (
    <div className="flex flex-col gap-15">
      <PortableTextRenderer components={components} value={value} />
    </div>
  );
};
