/**
 * The two legal pages the site links to from fixed places -- the footer and the
 * enrollment form's terms checkbox.
 *
 * `legalPage` is a repeatable document type whose URL lives in an editor-owned
 * `slug` field, so there is no type-level guarantee that a document with these
 * slugs exists. Those two slugs are therefore treated as contract: the Studio
 * warns on the field that renaming them breaks these links. Any *other* legal
 * page the practice publishes is reachable by its URL and needs no entry here.
 */
export const LEGAL_PAGES = {
  privacy: {
    href: "/privacyverklaring",
    label: "Privacyverklaring",
  },
  terms: {
    href: "/algemene-voorwaarden",
    label: "Algemene voorwaarden",
  },
} as const;
