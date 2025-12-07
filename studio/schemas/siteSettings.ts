import { defineType, defineField } from 'sanity'

/**
 * Site Settings Schema (Singleton)
 *
 * Global site configuration - appearance, features, integrations
 * For SEO settings, see the SEO Settings schema
 */
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  groups: [
    {
      name: 'branding',
      title: 'Branding',
    },
    {
      name: 'features',
      title: 'Features',
    },
    {
      name: 'announcements',
      title: 'Announcements',
    },
  ],
  fields: [
    // Brand & Appearance
    defineField({
      name: 'primaryColor',
      title: 'Primary Brand Color',
      type: 'string',
      description: 'Main brand color (hex code, e.g., #81A094)',
      group: 'branding',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error(
          'Must be a valid hex color code'
        ),
      initialValue: '#81A094',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Brand Color',
      type: 'string',
      description: 'Secondary brand color (hex code, e.g., #294D4A)',
      group: 'branding',
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error(
          'Must be a valid hex color code'
        ),
      initialValue: '#294D4A',
    }),

    // Features
    defineField({
      name: 'features',
      title: 'Site Features',
      type: 'object',
      description: 'Enable/disable site features',
      group: 'features',
      fields: [
        {
          name: 'darkMode',
          title: 'Enable Dark Mode Toggle',
          type: 'boolean',
          description: 'Show dark/light mode switcher in navigation',
          initialValue: true,
        },
        {
          name: 'languageToggle',
          title: 'Enable Language Toggle',
          type: 'boolean',
          description: 'Show Norwegian/English language switcher',
          initialValue: true,
        },
        {
          name: 'smoothScroll',
          title: 'Enable Smooth Scrolling',
          type: 'boolean',
          description: 'Use Lenis smooth scroll library',
          initialValue: true,
        },
      ],
    }),

    // Announcement Bar
    defineField({
      name: 'announcement',
      title: 'Announcement Bar',
      type: 'object',
      description: 'Optional announcement shown at top of site',
      group: 'announcements',
      fields: [
        {
          name: 'enabled',
          title: 'Show Announcement',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'text',
          title: 'Announcement Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link (optional)',
          type: 'url',
        },
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Success', value: 'success' },
              { title: 'Warning', value: 'warning' },
            ],
          },
          initialValue: 'info',
        },
      ],
    }),

    // Maintenance Mode
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'object',
      description: 'Show maintenance page to visitors',
      group: 'announcements',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Maintenance Mode',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Maintenance Message',
          type: 'text',
          rows: 3,
          initialValue: 'Site is currently under maintenance. Check back soon!',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Appearance & Features',
      }
    },
  },
})
