import { defineType, defineField } from 'sanity'

/**
 * Skill Schema
 *
 * For organizing your skills/technologies.
 * You can categorize them (e.g., "Frontend", "Backend", "Design")
 */
export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  i18n: true,
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Design', value: 'design' },
          { title: 'Tools', value: 'tools' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'number',
      description: '1-100 scale (percentage of expertise)',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of your experience with this skill',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Optional icon/logo for this skill',
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
      title: 'name',
      subtitle: 'category',
      media: 'icon',
    },
  },
})
