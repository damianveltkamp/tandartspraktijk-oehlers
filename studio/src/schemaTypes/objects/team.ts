import {defineField, defineType} from 'sanity'

export const team = defineType({
  name: 'team',
  title: 'Team',
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
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [{type: 'teamMember'}],
    }),
  ],
})
