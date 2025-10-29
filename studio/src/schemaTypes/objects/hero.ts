import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'usps',
      title: 'Usps',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'link'}],
      validation: (Rule) => Rule.max(2).error('You can only add up to 2 links'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
