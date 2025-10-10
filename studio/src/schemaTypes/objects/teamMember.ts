import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jobDescription',
      title: 'Role description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
