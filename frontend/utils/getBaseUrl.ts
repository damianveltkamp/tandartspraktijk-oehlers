/**
 * `NEXT_PUBLIC_BASE_URL` is typed by hand into a deployment dashboard, so it
 * arrives as often without a scheme (`tandartsoehlers.nl`) as with one. The
 * sitemap and robots routes concatenate it into strings and shrug that off,
 * but `new URL()` throws -- and inside `generateMetadata` a throw takes down
 * every route instead of only degrading the OG tags. Normalising the value in
 * one place keeps the three consumers in agreement and keeps the failure mode
 * "no absolute URLs" rather than "no site".
 *
 * Returns an origin without a trailing slash, or `undefined` when the variable
 * is unset or unusable.
 */
export const getBaseUrl = (): string | undefined => {
  const raw = process.env.NEXT_PUBLIC_BASE_URL?.trim();

  if (!raw) return undefined;

  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    return new URL(withScheme).toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
};
