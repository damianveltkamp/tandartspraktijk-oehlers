import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isExternal: boolean;
}

export const Link = ({ href, children, isExternal, ...props }: LinkProps) => {
  return isExternal ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <NextLink href={href ?? ""} {...props}>
      {children}
    </NextLink>
  );
};
