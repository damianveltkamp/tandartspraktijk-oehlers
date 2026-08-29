import {defineArrayMember, defineType} from 'sanity'

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
                // `allowRelative` keeps `/inschrijven` valid; the scheme
                // list rejects a bare `www.example.com`, which the renderer
                // would otherwise treat as external and emit as-is, making
                // the browser resolve it relative to the current page.
                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                    allowRelative: true,
                  }),
              },
            ],
          }),
        ],
      },
    }),
  ],
})
