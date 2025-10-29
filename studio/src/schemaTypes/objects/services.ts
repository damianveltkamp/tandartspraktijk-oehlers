import {defineField, defineType} from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Services',
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
      name: 'logos',
      title: 'Logo\u0027s',
      type: 'array',
      of: [{type: 'logo'}],
    }),
    defineField({
      name: 'costIndicationLink',
      title: 'Link to cost indication pdf',
      type: 'restrictedLink',
      validation: (Rule) => Rule.required(),
      initialValue: () => ({
        href: '/Indicatie-bijkomende-materiaal-en-techniekkosten-tandheelkundige-behandelingen.pdf',
      }),
    }),
  ],
})
