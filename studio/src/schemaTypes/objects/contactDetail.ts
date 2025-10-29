import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const contactDetail = defineType({
  name: 'contactDetail',
  title: 'Contactdetail',
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
      name: 'type',
      title: 'Contact type',
      type: 'string',
      options: {
        list: [
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
          {title: 'Website', value: 'website'},
          {title: 'Location', value: 'location'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
