import type { GetHeaderPhoneQueryResult } from "@/sanity.types";
import { stegaClean } from "@sanity/client/stega";

type HeaderPhoneData = NonNullable<GetHeaderPhoneQueryResult>["phone"];

/**
 * Sanity stores the number as a display string ("020 482 3573") rather than a
 * URI, so the `tel:` href has to be derived. Dutch numbers are stored in
 * national format with a leading 0, which is replaced by the +31 country code
 * so the link also works for visitors dialling from abroad.
 */
const toTelHref = (displayNumber: string) => {
  const digits = stegaClean(displayNumber).replace(/\D/g, "");
  if (!digits) return null;
  return `tel:${digits.startsWith("0") ? `+31${digits.slice(1)}` : digits}`;
};

export const headerPhoneAdapter = (
  data: HeaderPhoneData | null | undefined,
) => {
  if (!data?.linkText) return null;

  const href = toTelHref(data.linkText);
  if (!href) return null;

  return { href, text: data.linkText };
};
