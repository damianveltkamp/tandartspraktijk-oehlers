import { Link } from "@/components/Link/Link";
import { PRACTICE_PHONE } from "@/constants/practice";
import type { ErrorPageProps } from "./ErrorPage.types";

/**
 * Shared layout for the 404 and error routes. Both render inside the root
 * layout, so the header, the footer and the page grid are already in place --
 * this only owns the content of `main`.
 */
export const ErrorPage = ({ children, description, title }: ErrorPageProps) => {
  return (
    <div className="main-grid">
      <div className="content-section flex flex-col items-start gap-25 py-60 lg:py-110">
        <div className="flex flex-col gap-15">
          <h1 className="typography-headline-1 lg:typography-hero-large text-black">
            {title}
          </h1>
          <p className="typography-body max-w-[62ch] leading-normal text-black">
            {description}
          </p>
        </div>
        {children && <div className="flex flex-wrap gap-10">{children}</div>}
        <p className="typography-body leading-normal text-black">
          Liever direct contact? Bel de praktijk op{" "}
          <Link
            isExternal
            href={PRACTICE_PHONE.href}
            className="font-bold underline"
          >
            {PRACTICE_PHONE.display}
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
