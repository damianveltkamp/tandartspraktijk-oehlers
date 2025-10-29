import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const restrictedLink = defineType({
  name: 'restrictedLink',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkText',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
  ],
})
