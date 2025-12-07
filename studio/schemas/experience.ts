import { defineType, defineField } from 'sanity'

/**
 * Experience Schema
 *
 * For your work experience/CV entries.
 * Each document represents one job or position.
 */
export default defineType({
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  i18n: true,
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if currently working here',
    }),
    defineField({
      name: 'current',
      title: 'Current Position',
      type: 'boolean',
      description: 'Check if this is your current job',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies, tools, or skills used in this role',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
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
  ],
  preview: {
    select: {
      title: 'position',
      subtitle: 'company',
      media: 'logo',
    },
  },
  orderings: [
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
})
