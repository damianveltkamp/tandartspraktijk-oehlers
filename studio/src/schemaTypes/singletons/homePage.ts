import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'

export const homePage = defineType({
  name: 'homePage',
  title: 'Startpagina',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Startpagina',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero section',
      type: 'videoHero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team section',
      type: 'team',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services section',
      type: 'services',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'treatments',
      title: 'Treatments section',
      type: 'accordion',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image section',
      type: 'customImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faq',
      title: 'FAQ section',
      type: 'accordion',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contact',
      title: 'Contact section',
      type: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emergencyService',
      title: 'Emergency service section',
      type: 'contact',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
