/**
 * The practice's phone number, hard-coded rather than read from the CMS.
 *
 * Everywhere else on the site the number comes from the homepage's contact
 * section, but the error routes cannot depend on that: the most likely reason
 * a visitor is looking at one of them is that a Sanity fetch just failed, and
 * `global-error` renders outside the root layout entirely, where no server
 * fetch has run at all. A visitor who hit an error while trying to enrol still
 * needs a way to reach the practice, so the number is inlined here.
 *
 * Kept in sync with the `contact` section on the homePage singleton and with
 * the JSON-LD in `app/layout.tsx`.
 */
export const PRACTICE_PHONE = {
  display: "020 482 3573",
  href: "tel:+31204823573",
} as const;
