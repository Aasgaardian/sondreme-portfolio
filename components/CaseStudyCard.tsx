/**
 * CaseStudyCard Component
 *
 * Displays a case study in card format.
 * Used in lists (like the /arbeid page) and can link to detail pages.
 */

import Link from 'next/link'
import type { CaseStudy } from '@/types/sanity'
import SanityImage from './SanityImage'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link href={`/arbeid/${caseStudy.slug.current}`} className="case-study-card-link">
      <article className="case-study-card">
        {caseStudy.mainImage && (
          <div className="case-study-card__image">
            <SanityImage image={caseStudy.mainImage} width={800} height={600} />
          </div>
        )}

        <div className="case-study-card__content">
          {caseStudy.tags && caseStudy.tags.length > 0 && (
            <div className="case-study-card__tags">
              {caseStudy.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2>{caseStudy.title}</h2>

          <div className="case-study-card__meta">
            {caseStudy.client && <span className="case-study-card__client">{caseStudy.client}</span>}
            {caseStudy.year && caseStudy.client && <span className="separator">•</span>}
            {caseStudy.year && <span className="case-study-card__year">{caseStudy.year}</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}
