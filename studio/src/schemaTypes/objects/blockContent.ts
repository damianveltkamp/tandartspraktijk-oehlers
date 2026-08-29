import {defineArrayMember, defineType} from 'sanity'

/**
 * The schemes `components/PortableText` knows how to render as an external
 * link. Keep this in step with `isExternalHref` there.
 */
const ALLOWED_SCHEMES = ['http', 'https', 'mailto', 'tel']

/**
 * The project's rich text type. Every other content field is a plain string,
 * so this exists for the one thing that genuinely needs structure: the legal
 * pages, whose copy is written by the practice and runs to headings, numbered
 * clauses and links.
 *
 * Deliberately narrow -- no images, no embedded objects, two heading levels.
 * A legal document needs none of it, and widening this later is far cheaper
 * than narrowing it once editors have used the extra options.
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Inhoud',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // `h1` is omitted on purpose: the page renders the document title as the
      // single h1, so an editor-authored h1 would break the heading outline.
      styles: [
        {title: 'Normaal', value: 'normal'},
        {title: 'Kop', value: 'h2'},
        {title: 'Subkop', value: 'h3'},
      ],
      lists: [
        {title: 'Opsomming', value: 'bullet'},
        {title: 'Genummerd', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Vet', value: 'strong'},
          {title: 'Cursief', value: 'em'},
        ],
        annotations: [
          defineArrayMember({
            name: 'blockLink',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'string',
                description:
                  'Een volledige URL (https://...), een pad op deze website (/inschrijven), een e-mailadres (mailto:...) of een telefoonnummer (tel:...).',
                // `Rule.uri` alone is not enough here: with `allowRelative`
                // it resolves the value against a dummy origin first, so a
                // bare `www.tandartsoehlers.nl` comes back as scheme `http`
                // and passes. The renderer would then treat it as external
                // and emit it as-is, and the browser would resolve it
                // relative to the current page. Require the two shapes the
                // renderer actually knows how to handle instead.
                validation: (Rule) =>
                  Rule.required().custom((value?: string) => {
                    if (!value) return true

                    if (value.startsWith('/')) return true

                    const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(value)?.[1]?.toLowerCase()

                    if (scheme && ALLOWED_SCHEMES.includes(scheme)) return true

                    return 'Begin met "/" voor een pagina op deze website, of met https://, mailto: of tel:.'
                  }),
              },
            ],
          }),
        ],
      },
    }),
  ],
})
