import { defineType, defineField } from 'sanity'

/**
 * SEO Settings Schema (Singleton)
 *
 * Centralized SEO configuration for the entire site
 * Includes meta tags, Open Graph, Twitter cards, and more
 */
export default defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'document',
  icon: () => '🔍',
  groups: [
    {
      name: 'basic',
      title: 'Basic SEO',
    },
    {
      name: 'openGraph',
      title: 'Social Media',
    },
    {
      name: 'technical',
      title: 'Technical',
    },
    {
      name: 'analytics',
      title: 'Analytics',
    },
  ],
  fields: [
    // Basic SEO
    defineField({
      name: 'title',
      title: 'Default Site Title',
      type: 'string',
      description: 'Used in browser tab and as fallback for SEO',
      group: 'basic',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Default Meta Description',
      type: 'text',
      description: 'Used in search results and social media previews',
      rows: 3,
      group: 'basic',
      validation: (Rule) => Rule.required().min(50).max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'SEO Keywords',
      type: 'array',
      description: 'Keywords for search engine optimization',
      group: 'basic',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      description: 'Your full name for authorship meta tags',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Your site\'s full URL (e.g., https://sondreme-portfolio.vercel.app)',
      group: 'basic',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),

    // Open Graph
    defineField({
      name: 'openGraph',
      title: 'Open Graph Settings',
      type: 'object',
      description: 'Settings for when your site is shared on social media',
      group: 'openGraph',
      fields: [
        {
          name: 'image',
          title: 'Default OG Image',
          type: 'image',
          description: '1200x630px recommended. Used when pages don\'t have their own image',
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
        },
        {
          name: 'imageAlt',
          title: 'OG Image Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility',
        },
        {
          name: 'locale',
          title: 'Locale',
          type: 'string',
          description: 'Language and region (e.g., no_NO, en_US)',
          initialValue: 'no_NO',
        },
        {
          name: 'siteName',
          title: 'Site Name',
          type: 'string',
          description: 'Name of your website shown on social shares',
          initialValue: 'Sondre Aasgaard Portfolio',
        },
      ],
    }),

    // Favicon & Icons
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site icon shown in browser tab (32x32px recommended)',
      group: 'technical',
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

    // Structured Data
    defineField({
      name: 'structuredData',
      title: 'Structured Data (JSON-LD)',
      type: 'object',
      description: 'Schema.org markup for rich search results',
      group: 'technical',
      fields: [
        {
          name: 'type',
          title: 'Schema Type',
          type: 'string',
          options: {
            list: [
              { title: 'Person', value: 'Person' },
              { title: 'Organization', value: 'Organization' },
              { title: 'Portfolio', value: 'CreativeWork' },
            ],
          },
          initialValue: 'Person',
        },
        {
          name: 'jobTitle',
          title: 'Job Title',
          type: 'string',
          description: 'Your professional title',
        },
      ],
    }),

    // Robots & Indexing
    defineField({
      name: 'robots',
      title: 'Search Engine Indexing',
      type: 'object',
      description: 'Control how search engines crawl your site',
      group: 'technical',
      fields: [
        {
          name: 'index',
          title: 'Allow Indexing',
          type: 'boolean',
          description: 'Allow search engines to index your site',
          initialValue: true,
        },
        {
          name: 'follow',
          title: 'Follow Links',
          type: 'boolean',
          description: 'Allow search engines to follow links',
          initialValue: true,
        },
      ],
    }),

    // Analytics
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      group: 'analytics',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Format: G-XXXXXXXXXX or UA-XXXXXXXXX',
        },
        {
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'Format: GTM-XXXXXXX',
        },
        {
          name: 'vercelAnalytics',
          title: 'Enable Vercel Analytics',
          type: 'boolean',
          description: 'Enable Vercel\'s built-in analytics',
          initialValue: false,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'SEO Settings',
        subtitle: 'Search Engine Optimization',
      }
    },
  },
})
