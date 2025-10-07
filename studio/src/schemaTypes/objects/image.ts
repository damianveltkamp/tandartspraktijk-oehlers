import {defineField, defineType} from 'sanity'

export const customImage = defineType({
  name: 'customImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
})
