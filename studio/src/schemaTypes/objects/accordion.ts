import {defineField, defineType} from 'sanity'

export const accordion = defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accordionItems',
      title: 'Accordion items',
      type: 'array',
      of: [{type: 'accordionItem'}],
    }),
  ],
})
