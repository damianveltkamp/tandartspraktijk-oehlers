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
      name: 'contactLink',
      title: 'Link to contact section',
      type: 'restrictedLink',
      validation: (Rule) => Rule.required(),
      initialValue: () => ({
        href: '#contact',
      }),
    }),
    defineField({
      name: 'enrollmentLink',
      title: 'Link to enrollment form',
      type: 'restrictedLink',
      validation: (Rule) => Rule.required(),
      initialValue: () => ({
        href: '/inschrijven',
      }),
    }),
  ],
})
