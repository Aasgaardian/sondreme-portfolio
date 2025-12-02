import type { Metadata } from 'next'
import CaseStudyCard from '@/components/CaseStudyCard'
import Container from '@/components/Container'
import { MaintenancePage } from '@/components/MaintenancePage'
import { client } from '@/lib/sanity'
import { getSiteSettings, isMaintenanceMode } from '@/lib/site-settings'
import type { CaseStudy } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Arbeid',
  description: 'Se mine prosjekter og case studies - webutvikling, design, og kreative løsninger',
  openGraph: {
    title: 'Arbeid | Sondre Aasgaard',
    description:
      'Se mine prosjekter og case studies - webutvikling, design, og kreative løsninger',
  },
}

// Force dynamic rendering to see changes immediately
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getCaseStudies(): Promise<CaseStudy[]> {
  const query = `*[_type == "caseStudy" && !defined(__i18n_lang)] | order(_createdAt desc) {
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
    tags
  }`

  return await client.fetch(query)
}

export default async function ArbeidPage() {
  // Check maintenance mode first
  const maintenanceMode = await isMaintenanceMode()

  if (maintenanceMode) {
    const settings = await getSiteSettings()
    return <MaintenancePage message={settings?.maintenanceMode?.message} />
  }

  const caseStudies = await getCaseStudies()

  return (
    <main>
      <Container>
        <h1>Arbeid</h1>
        <p>Case-studier og arbeidseksempler</p>

        {caseStudies.length === 0 ? (
          <p>Ingen case-studier ennå. Legg til noen i Sanity Studio!</p>
        ) : (
          <div className="case-studies-grid">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study._id} caseStudy={study} />
            ))}
          </div>
        )}
      </Container>
    </main>
  )
}
