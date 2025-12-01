import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sondreme-portfolio.vercel.app'

  // Fetch all case studies for dynamic routes
  const caseStudies = await client.fetch<{ slug: { current: string }; _updatedAt: string }[]>(
    `*[_type == "caseStudy" && !defined(__i18n_lang)] {
      "slug": slug,
      _updatedAt
    }`
  )

  const caseStudyUrls = caseStudies.map((study) => ({
    url: `${baseUrl}/arbeid/${study.slug.current}`,
    lastModified: new Date(study._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/arbeid`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...caseStudyUrls,
  ]
}
