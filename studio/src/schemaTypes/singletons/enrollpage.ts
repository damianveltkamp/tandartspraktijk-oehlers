import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const enrollPage = defineType({
  name: 'enrollPage',
  title: 'Inschrijf pagina',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Inschrijfpagina',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero section',
      type: 'hero',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
