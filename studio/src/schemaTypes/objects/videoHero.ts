import {defineField, defineType} from 'sanity'

export const videoHero = defineType({
  name: 'videoHero',
  title: 'Video hero',
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
      title: 'Poster afbeelding',
      description:
        'Wordt getoond op mobiel, terwijl de video laadt, en voor bezoekers die bewegende beelden hebben uitgezet.',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      description: 'MP4 bestand. Wordt alleen op desktop afgespeeld, zonder geluid.',
      type: 'file',
      options: {accept: 'video/mp4'},
      validation: (Rule) => Rule.required(),
    }),
  ],
})
