import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == 'settings'][0]`);

/**
 * The site header shows the practice's phone number on every route, but the
 * number is only stored once, on the homepage's contact section. Reading it
 * from there keeps a single source of truth rather than duplicating it into
 * the settings singleton, where the two copies would eventually drift.
 */
export const getHeaderPhoneQuery = defineQuery(`
  *[_type == 'homePage'][0]{
    "phone": contact.contactDetails[type == 'phone'][0]{linkText, href},
  }
`);

// const linkReference = /* groq */ `
//   _type == "link" => {
//     "page": page->slug.current,
//   }
// `;

// const linkFields = /* groq */ `
//   link {
//       ...,
//       ${linkReference}
//       }
// `;

export const getHomepageQuery = defineQuery(`
  *[_type == 'homePage'][0]{
    _id,
    _type,
    name,
    hero{
      ...,
      video{asset->{url}},
    },
    faq,
    services,
    contact,
    image,
    emergencyService,
    team,
    treatments,
  }
`);

export const getEnrollmentPageQuery = defineQuery(`
  *[_type == 'enrollPage'][0]{
    _id,
    _type,
    name,
    showEnrollmentPage,
    enrollmentUnavailableText,
    hero,
  }
`);

export const getNotificationQuery = defineQuery(`
  *[_type == 'notification'][0]{
    _id,
    _type,
    heading,
    description,
    showNotification,
  }
`);

/**
 * A single legal page, addressed by its slug. `app/[slug]/page.tsx` renders
 * whatever comes back and 404s when nothing does.
 */
export const getLegalPageQuery = defineQuery(`
  *[_type == 'legalPage' && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    seoDescription,
    body,
  }
`);

/**
 * Every published legal page, for `generateStaticParams` and the sitemap.
 *
 * This replaces the template's `sitemapData` query, which selected `page` and
 * `post` -- document types this project has never had.
 */
export const getLegalPageSlugsQuery = defineQuery(`
  *[_type == 'legalPage' && defined(slug.current)] | order(slug.current asc) {
    "slug": slug.current,
    _updatedAt,
  }
`);
