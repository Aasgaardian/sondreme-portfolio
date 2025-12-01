/**
 * Case Study Detail Page
 *
 * Dynamic route: /arbeid/[slug]
 * Example: /arbeid/my-project will load the case study with slug "my-project"
 *
 * This demonstrates:
 * - Dynamic routing with [slug]
 * - generateStaticParams for static generation
 * - Data fetching for individual documents
 */

import { notFound } from 'next/navigation'
import Container from '@/components/Container'
import PortableText from '@/components/PortableText'
import SanityImage from '@/components/SanityImage'
import { client } from '@/lib/sanity'
import type { CaseStudy } from '@/types/sanity'

// Force dynamic rendering to see changes immediately
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Fetch a single case study by slug
async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const query = `*[_type == "caseStudy" && slug.current == $slug && !defined(__i18n_lang)][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    slug,
    excerpt,
    mainImage,
    client,
    year,
    tags,
    content
  }`

  return await client.fetch(query, { slug })
}

// Generate static params for all case studies
// This tells Next.js to pre-render all case study pages at build time
export async function generateStaticParams() {
  const query = `*[_type == "caseStudy" && !defined(__i18n_lang)] {
    slug
  }`

  const caseStudies = await client.fetch(query)

  return caseStudies.map((study: CaseStudy) => ({
    slug: study.slug.current,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  if (!caseStudy) {
    return {
      title: 'Case-studie ikke funnet',
    }
  }

  return {
    title: `${caseStudy.title} - Sondre Aasgaard`,
    description: caseStudy.excerpt,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug)

  // If no case study found, show 404
  if (!caseStudy) {
    notFound()
  }

  return (
    <main>
      <Container>
        <article className="case-study">
          {/* Header */}
          <header className="case-study__header">
            <div className="header-wrapper">
              <h1>{caseStudy.title}</h1>

              <div className="case-study__meta">
                {caseStudy.client && <p>Klient: {caseStudy.client}</p>}
                {caseStudy.year && <p>År: {caseStudy.year}</p>}
              </div>

              {caseStudy.tags && caseStudy.tags.length > 0 && (
                <div className="case-study__tags">
                  {caseStudy.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Main Image */}
          {caseStudy.mainImage && (
            <div className="case-study__main-image">
              <SanityImage
                image={caseStudy.mainImage}
                alt={caseStudy.title}
                width={1200}
                height={800}
                priority
              />
            </div>
          )}

          {/* Excerpt */}
          {caseStudy.excerpt && (
            <div className="case-study__excerpt">
              <p className="lead">{caseStudy.excerpt}</p>
            </div>
          )}

          {/* Content */}
          {caseStudy.content && (
            <div className="case-study__content">
              <PortableText value={caseStudy.content} />
            </div>
          )}
        </article>
      </Container>
    </main>
  )
}
