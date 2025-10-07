import {defineField, defineType} from 'sanity'

export const logo = defineType({
  name: 'logo',
  title: 'Logo',
  type: 'object',
  fields: [
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
