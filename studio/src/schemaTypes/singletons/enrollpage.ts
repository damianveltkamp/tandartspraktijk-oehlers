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
      name: 'showEnrollmentPage',
      title: 'Show the enrollment form.',
      type: 'boolean',
      description: 'Check this box to display the enrollment form on the page.',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    }),
    defineField({
      name: 'enrollmentUnavailableText',
      title: 'Enrollment unavailable text',
      type: 'string',
      hidden: ({document}) => {
        return Boolean(document?.showEnrollmentPage)
      },
    }),
    defineField({
      name: 'hero',
      title: 'Hero section',
      type: 'hero',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
