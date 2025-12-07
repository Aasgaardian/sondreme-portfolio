import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "./schemas";

/**
 * Custom structure for Sanity Studio
 * Organized sidebar with sections for better navigation
 */
const structure = (S: any) =>
	S.list()
		.title("Content")
		.items([
			// ===== SITE CONFIGURATION =====
			S.listItem()
				.title("🌐 Site Configuration")
				.child(
					S.list()
						.title("Site Configuration")
						.items([
							S.listItem()
								.title("Homepage")
								.icon(() => "🏠")
								.child(
									S.document().schemaType("homepage").documentId("homepage")
								),
							S.listItem()
								.title("Contact Info")
								.icon(() => "📧")
								.child(
									S.document().schemaType("contact").documentId("contact")
								),
							S.listItem()
								.title("SEO Settings")
								.icon(() => "🔍")
								.child(
									S.document()
										.schemaType("seo")
										.documentId("seo")
								),
							S.listItem()
								.title("Site Settings")
								.icon(() => "⚙️")
								.child(
									S.document()
										.schemaType("siteSettings")
										.documentId("siteSettings")
								),
						])
				),

			S.divider(),

			// ===== PORTFOLIO =====
			S.listItem()
				.title("💼 Portfolio")
				.child(
					S.list()
						.title("Portfolio")
						.items([
							S.listItem()
								.title("Case Studies")
								.icon(() => "📁")
								.child(S.documentTypeList("caseStudy").title("Case Studies")),
						])
				),

			S.divider(),

			// ===== CV / RESUME =====
			S.listItem()
				.title("📄 CV / Resume")
				.child(
					S.list()
						.title("CV / Resume")
						.items([
							S.listItem()
								.title("Work Experience")
								.icon(() => "💼")
								.child(
									S.documentTypeList("experience").title("Work Experience")
								),
							S.listItem()
								.title("Education")
								.icon(() => "🎓")
								.child(S.documentTypeList("education").title("Education")),
							S.listItem()
								.title("Skills")
								.icon(() => "⚡")
								.child(S.documentTypeList("skill").title("Skills")),
							S.listItem()
								.title("Tools & Software")
								.icon(() => "🛠️")
								.child(S.documentTypeList("tool").title("Tools & Software")),
							S.listItem()
								.title("Languages")
								.icon(() => "🗣️")
								.child(S.documentTypeList("language").title("Languages")),
						])
				),

			S.divider(),

			// ===== ABOUT =====
			S.listItem()
				.title("👤 About")
				.child(
					S.list()
						.title("About")
						.items([
							S.listItem()
								.title("Interests & Hobbies")
								.icon(() => "🎨")
								.child(
									S.documentTypeList("interest").title("Interests & Hobbies")
								),
						])
				),
		]);

export default defineConfig({
	name: "default",
	title: "Sondre Portfolio",

	projectId: "39ptbp4y",
	dataset: "production",

	plugins: [
		structureTool({
			structure,
		}),
		documentInternationalization({
			// Supported languages - Norwegian is the base language
			supportedLanguages: [{ id: "en", title: "English" }],
			// Base language (default for new documents)
			// Document types that support translation
			schemaTypes: [
				"caseStudy",
				"homepage",
				"experience",
				"education",
				"skill",
				"tool",
				"language",
				"interest",
			],
		}),
		presentationTool({
			previewUrl: {
				origin: "http://localhost:3000",
				draftMode: {
					enable: "/api/draft",
				},
			},
		}),
		visionTool(),
		unsplashImageAsset(),
	],

	schema: {
		types: schemaTypes,
		// Hide language-specific document types from the create menu
		templates: (prev) =>
			prev.filter((template) => {
				// Hide templates that end with language codes
				const id = template.id;
				return !id.endsWith(".no") && !id.endsWith(".en");
			}),
	},
});
