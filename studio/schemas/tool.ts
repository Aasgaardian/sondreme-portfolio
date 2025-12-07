import { defineType, defineField } from 'sanity'

/**
 * Tool Schema
 *
 * For software, tools, and technologies you use
 * Shows your toolkit and proficiency levels
 */
export default defineType({
  name: 'tool',
  title: 'Tools & Software',
  type: 'document',
  i18n: true,
  fields: [
    defineField({
      name: 'name',
      title: 'Tool Name',
      type: 'string',
      description: 'E.g., "Figma", "VS Code", "Git"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Design', value: 'design' },
          { title: 'Development', value: 'development' },
          { title: 'Productivity', value: 'productivity' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Communication', value: 'communication' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'How many years have you used this tool?',
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Logo',
      type: 'image',
      description: 'Tool logo or icon',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'How you use this tool (optional)',
      rows: 3,
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
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
