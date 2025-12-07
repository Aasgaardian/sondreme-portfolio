import { defineType, defineField } from 'sanity'

/**
 * Education Schema
 *
 * For your educational background - degrees, certifications, courses
 */
export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  i18n: true,
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      description: 'University, school, or organization',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree/Certificate',
      type: 'string',
      description: 'E.g., "Bachelor of Science", "UX Design Certificate"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string',
      description: 'E.g., "Computer Science", "Graphic Design"',
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
      description: 'Leave empty if currently studying',
    }),
    defineField({
      name: 'current',
      title: 'Currently Studying',
      type: 'boolean',
      description: 'Check if you are currently enrolled',
      initialValue: false,
    }),
    defineField({
      name: 'grade',
      title: 'Grade/GPA',
      type: 'string',
      description: 'Optional: e.g., "3.8/4.0" or "First Class Honours"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Relevant coursework, achievements, activities',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Institution Logo',
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
      title: 'degree',
      subtitle: 'institution',
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
