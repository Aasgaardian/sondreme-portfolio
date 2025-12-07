import { defineType, defineField } from 'sanity'

/**
 * Interest Schema
 *
 * For hobbies and interests - shows personality and culture fit
 * Helps with conversation starters in interviews
 */
export default defineType({
  name: 'interest',
  title: 'Interests & Hobbies',
  type: 'document',
  i18n: true,
  fields: [
    defineField({
      name: 'name',
      title: 'Interest Name',
      type: 'string',
      description: 'E.g., "Photography", "Cycling", "Coffee"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of your interest',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sports & Fitness', value: 'sports' },
          { title: 'Arts & Creativity', value: 'arts' },
          { title: 'Technology', value: 'tech' },
          { title: 'Travel', value: 'travel' },
          { title: 'Food & Drink', value: 'food' },
          { title: 'Music', value: 'music' },
          { title: 'Reading & Learning', value: 'learning' },
          { title: 'Gaming', value: 'gaming' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Image',
      type: 'image',
      description: 'Optional icon or representative image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this interest prominently',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'icon',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : '',
        media,
      }
    },
  },
})
