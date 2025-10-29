import {defineField, defineType} from 'sanity'

export const accordionItem = defineType({
  name: 'accordionItem',
  title: 'Accordin item',
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
  ],
})
