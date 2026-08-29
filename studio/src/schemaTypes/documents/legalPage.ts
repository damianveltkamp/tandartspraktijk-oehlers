import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'
import type {SlugValue} from 'sanity'

/**
 * Must stay in step with `SLUG_PATTERN` in `frontend/app/[slug]/page.tsx`, which
 * rejects anything else before it queries. Without this, a slug typed by hand --
 * `Cookiebeleid`, `cookie_beleid`, `privacy-2.0` -- publishes happily, is
 * advertised by the sitemap and gets a Presentation "Used on" link, and then
 * 404s. `slugify` only covers the value generated from the title.
 */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * A juridische pagina -- privacyverklaring, algemene voorwaarden, and whatever
 * the practice needs next (a cookieverklaring, say).
 *
 * Repeatable rather than a singleton per page: the frontend renders all of them
 * through one dynamic route, so the practice can publish a new legal page
 * without a developer. That is also why the URL lives in a `slug` field instead
 * of being implied by the document type.
 */
export const legalPage = defineType({
  name: 'legalPage',
  title: 'Juridische pagina',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'De kop bovenaan de pagina, en de titel in het browsertabblad.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description:
        'Het webadres van deze pagina, achter de domeinnaam. Let op: de footer en het inschrijfformulier linken naar "privacyverklaring" en "algemene-voorwaarden" -- wijzig je die twee, dan werken die links niet meer.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      // `Rule.custom` rather than `Rule.regex`: a slug field's value is the
      // object `{_type, current}`, so the string validators never see the URL.
      validation: (Rule) =>
        Rule.required().custom((value: SlugValue | undefined) => {
          const current = value?.current

          if (!current) return true

          return (
            SLUG_PATTERN.test(current) ||
            'Gebruik alleen kleine letters, cijfers en losse koppeltekens, bijvoorbeeld "algemene-voorwaarden".'
          )
        }),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Omschrijving voor zoekmachines',
      type: 'text',
      rows: 3,
      description:
        'Een korte samenvatting van de pagina. Google toont deze onder de titel in de zoekresultaten.',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'body',
      title: 'Inhoud',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare: ({title, slug}: {slug?: string; title?: string}) => ({
      title: title ?? 'Zonder titel',
      subtitle: slug ? `/${slug}` : 'Nog geen URL',
    }),
  },
})
