import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'

export const notification = defineType({
  name: 'notification',
  title: 'Notification',
  type: 'document',
  icon: CogIcon,
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
      name: 'showNotification',
      title: 'Show Notification on Site',
      type: 'boolean',
      description: 'Check this box to display the notification on the page.',
      initialValue: false,
      options: {
        layout: 'checkbox',
      },
    }),
  ],
})
