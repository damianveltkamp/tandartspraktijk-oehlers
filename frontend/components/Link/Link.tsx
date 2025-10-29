import NextLink from "next/link";
import type { LinkProps } from "./Link.types";

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
