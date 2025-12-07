import { defineType, defineField } from "sanity";

/**
 * Homepage Schema
 *
 * This is a "singleton" - you'll only have one homepage document.
 * It stores all the dynamic content for your homepage.
 */
export default defineType({
	name: "homepage",
	title: "Homepage",
	type: "document",
	i18n: true,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Main headline on homepage",
		}),
		defineField({
			name: "subtitle",
			title: "Subtitle",
			type: "array",
			description: "Subheading or tagline (supports bold text and links)",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "profileImage",
			title: "Profile Image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					title: "Alternative Text",
					type: "string",
					description: "Important for SEO and accessibility",
					validation: (Rule) => Rule.required(),
				},
			],
		}),
		defineField({
			name: "featuredWork",
			title: "Featured Work",
			type: "array",
			description: "Select case studies to feature on homepage",
			of: [
				{
					type: "reference",
					to: [{ type: "caseStudy" }],
				},
			],
		}),
		defineField({
			name: "servicesTitle",
			title: "Services Section Title",
			type: "string",
			description: "Title for the services/skills section",
			initialValue: "Hva jeg gjør",
		}),
		defineField({
			name: "services",
			title: "Services",
			type: "array",
			description: "List of services or areas of expertise",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "title",
							title: "Service Title",
							type: "string",
							validation: (Rule) => Rule.required(),
						},
						{
							name: "description",
							title: "Description",
							type: "text",
							rows: 3,
						},
						{
							name: "icon",
							title: "Icon Name",
							type: "string",
							description: "Lucide icon name (e.g., Code, Palette, Rocket)",
						},
					],
					preview: {
						select: {
							title: "title",
							subtitle: "description",
						},
					},
				},
			],
			validation: (Rule) => Rule.max(6),
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "profileImage",
		},
	},
});
