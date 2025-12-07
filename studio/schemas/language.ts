import { defineType, defineField } from 'sanity'

/**
 * Language Schema
 *
 * For both spoken languages and programming languages
 * Shows communication abilities and technical skills
 */
export default defineType({
  name: 'language',
  title: 'Languages',
  type: 'document',
  i18n: true,
  fields: [
    defineField({
      name: 'name',
      title: 'Language Name',
      type: 'string',
      description: 'E.g., "Norwegian", "TypeScript"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Spoken Language', value: 'spoken' },
          { title: 'Programming Language', value: 'programming' },
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
          // For spoken languages
          { title: 'Native', value: 'native' },
          { title: 'Fluent', value: 'fluent' },
          { title: 'Professional Working Proficiency', value: 'professional' },
          { title: 'Limited Working Proficiency', value: 'limited' },
          { title: 'Elementary', value: 'elementary' },
          // For programming languages
          { title: 'Expert', value: 'expert' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Beginner', value: 'beginner' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Optional: How many years have you used this language?',
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Flag',
      type: 'image',
      description: 'Country flag for spoken languages, logo for programming languages',
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
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      description: 'Language certifications (e.g., TOEFL, IELTS for spoken)',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
      proficiency: 'proficiency',
      media: 'icon',
    },
    prepare({ title, type, proficiency, media }) {
      const typeLabel = type === 'spoken' ? '💬' : '💻'
      return {
        title: `${typeLabel} ${title}`,
        subtitle: proficiency ? proficiency.charAt(0).toUpperCase() + proficiency.slice(1) : '',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Type, then Proficiency',
      name: 'typeAndProficiency',
      by: [
        { field: 'type', direction: 'asc' },
        { field: 'proficiency', direction: 'desc' },
      ],
    },
  ],
})
