import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Deelafbeelding',
      type: 'image',
      description:
        'Wordt getoond wanneer de website gedeeld wordt op social media en in zoekresultaten. Gebruik een liggende afbeelding van minimaal 1200 x 627 pixels.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatieve tekst',
          description: 'Belangrijk voor toegankelijkheid en SEO.',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt, context) => {
              const ogImage = context.document?.ogImage as {asset?: {_ref?: string}} | undefined

              if (ogImage?.asset?._ref && !alt) {
                return 'Verplicht wanneer er een afbeelding is gekozen.'
              }

              return true
            }),
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
