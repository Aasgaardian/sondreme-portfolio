import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  i18n: true,
  groups: [
    {
      name: 'basic',
      title: 'Basic Info',
    },
    {
      name: 'details',
      title: 'Project Details',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'metadata',
      title: 'Metadata',
    },
  ],
  fields: [
    // Basic Info Group
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short description for listing pages (max 200 characters)',
      group: 'basic',
      validation: (Rule) => Rule.required().min(50).max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'basic',
      description: 'Hero image for the case study',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project prominently on homepage',
      group: 'basic',
      initialValue: false,
    }),

    // Project Details Group
    defineField({
      name: 'client',
      title: 'Client/Company',
      type: 'string',
      group: 'details',
      description: 'Who was this project for?',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.min(2000).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'duration',
      title: 'Project Duration',
      type: 'string',
      group: 'details',
      description: 'E.g., "3 months", "6 weeks", "Ongoing"',
    }),
    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      group: 'details',
      description: 'E.g., "Lead Developer", "Full Stack Developer", "Designer & Developer"',
    }),
    defineField({
      name: 'teamSize',
      title: 'Team Size',
      type: 'number',
      group: 'details',
      description: 'How many people worked on this project?',
      validation: (Rule) => Rule.min(1).max(100),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      group: 'details',
      description: 'Tech stack for this project',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Project URL',
      type: 'url',
      group: 'details',
      description: 'Link to the deployed project',
    }),
    defineField({
      name: 'repositoryUrl',
      title: 'Repository URL',
      type: 'url',
      group: 'details',
      description: 'GitHub, GitLab, or other repository link',
    }),

    // Metadata Group
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      description: 'Keywords for filtering and SEO',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'metadata',
      options: {
        list: [
          { title: 'Web Development', value: 'web' },
          { title: 'Mobile App', value: 'mobile' },
          { title: 'UI/UX Design', value: 'design' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Full Stack', value: 'fullstack' },
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
        ],
      },
    }),

    // Content Group
    defineField({
      name: 'challenge',
      title: 'Challenge/Problem',
      type: 'array',
      group: 'content',
      description: 'What problem did this project solve?',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'solution',
      title: 'Solution/Approach',
      type: 'array',
      group: 'content',
      description: 'How did you solve it?',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'results',
      title: 'Results/Impact',
      type: 'array',
      group: 'content',
      description: 'What were the outcomes? Include metrics if possible.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'content',
      title: 'Additional Content',
      type: 'array',
      group: 'content',
      description: 'Full case study content with images',
      of: [
        {
          type: 'block',
        },
        {
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'client',
    },
  },
})
