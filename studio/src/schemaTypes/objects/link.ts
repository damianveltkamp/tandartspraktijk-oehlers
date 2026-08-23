import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons/Link'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkText',
      title: 'Link tekst',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isExternalLink',
      title: 'Is this a link to a different website?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
