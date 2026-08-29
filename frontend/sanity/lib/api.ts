/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

/**
 * `.env.example` ships the optional keys with an empty string value, so an
 * unconfigured variable reaches us as `''` just as often as `undefined` --
 * both have to fall through to the default.
 */
function valueOr(value: string | undefined, fallback: string): string {
  return value === undefined || value === '' ? fallback : value
}

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

/**
 * see https://www.sanity.io/docs/api-versioning for how versioning works
 */
export const apiVersion = valueOr(process.env.NEXT_PUBLIC_SANITY_API_VERSION, '2025-09-25')

/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
export const studioUrl = valueOr(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  'http://localhost:3333',
)
