import { Mail, MapPin, Phone, UserRoundSearch } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import BlurryBlob from '@/components/animata/background/blurry-blob'
import CaseStudyCard from '@/components/CaseStudyCard'
import Container from '@/components/Container'
import PortableText from '@/components/PortableText'
import SanityImage from '@/components/SanityImage'
import { getClient } from '@/lib/sanity'
import type { Contact, Homepage } from '@/types/sanity'

// Force dynamic rendering to see changes immediately
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getHomepage(isDraft = false): Promise<Homepage | null> {
  const client = getClient(isDraft)
  const query = `*[_type == "homepage" && _id == "homepage"][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      subtitle,
      bio,
      profileImage,
      heroImage,
      ctaText,
      ctaLink,
      secondaryCtaText,
      secondaryCtaLink,
      "featuredWork": featuredWork[]-> {
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
      },
      servicesTitle,
      services,
      stats,
      testimonial,
      contactCtaTitle,
      contactCtaText
    }`

  return await client.fetch(query)
}

async function getContact(isDraft = false): Promise<Contact | null> {
  const client = getClient(isDraft)
  const query = `*[_type == "contact" && _id == "contact"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    email,
    phone,
    location,
    socialLinks,
    availability
  }`

  return await client.fetch(query)
}


export default async function Home() {
  const { isEnabled } = await draftMode()
  const [homepage, contact] = await Promise.all([
    getHomepage(isEnabled),
    getContact(isEnabled),
  ])



  return (
    <main>
      {homepage ? (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            {homepage.heroImage && (
              <>
                <div className="hero-background">
                  <SanityImage
                    image={homepage.heroImage}
                    alt="Hero background"
                    width={1920}
                    height={1080}
                    priority
                  />
                </div>
                <div className="hero-overlay" />
              </>
            )}
            <div className="hero-blobs">
              <BlurryBlob firstBlobColor="bg-teal" secondBlobColor="bg-slate" />
            </div>

            <Container>
              <div className="hero-content">
                <div className="profile-section">
                  {homepage.profileImage && (
                    <div className="profile-image">
                      <SanityImage
                        image={homepage.profileImage}
                        alt={homepage.title}
                        width={600}
                        height={600}
                        priority
                      />
                    </div>
                  )}

                  {contact && (
                    <div className="contact-details">
                      <div className="contact-detail-item contact-title">
                        <UserRoundSearch size={20} />
                        <p className="contact-detail-title">{homepage.title}</p>
                      </div>
                      <div className="contact-detail-item">
                        <Mail size={20} />
                        <div>
                          <strong>Mail</strong>
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </div>
                      </div>
                      {contact.phone && (
                        <div className="contact-detail-item">
                          <Phone size={20} />
                          <div>
                            <strong>mobil</strong>
                            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                          </div>
                        </div>
                      )}
                      {contact.location && (
                        <div className="contact-detail-item">
                          <MapPin size={20} />
                          <div>
                            <strong>Basert</strong>
                            <p>{contact.location}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="profile-text">
                  {homepage.title && (
                    <h1>
                      <Balancer>{homepage.title}</Balancer>
                    </h1>
                  )}

                  {homepage.subtitle && (
                    <p className="subtitle">
                      <Balancer>{homepage.subtitle}</Balancer>
                    </p>
                  )}

                  {homepage.bio && (
                    <div className="bio">
                      <PortableText value={homepage.bio} />
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>

          {/* ################ */}
          {/* Featured Work Section */}
          {homepage.featuredWork && homepage.featuredWork.length > 0 && (
            <section className="featured-work-section">
              <Container>
                <div className="case-studies-grid">
                  {homepage.featuredWork.map((study) => (
                    <CaseStudyCard key={study._id} caseStudy={study} />
                  ))}
                </div>
              </Container>
            </section>
          )}

          {/* ################ */}
          {/* Services Section */}
          {homepage.services && homepage.services.length > 0 && (
            <section className="services-section">
              <Container>
                {homepage.servicesTitle && (
                  <h2 className="section-title">
                    <Balancer>{homepage.servicesTitle}</Balancer>
                  </h2>
                )}
                <div className="services-grid">
                  {homepage.services.map((service) => {
                    const IconComponent =
                      service.icon &&
                      (LucideIcons as any)[service.icon]
                    return (
                      <div key={service.title} className="service-card">
                        {IconComponent && (
                          <div className="service-icon">
                            <IconComponent size={32} />
                          </div>
                        )}
                        <h3>{service.title}</h3>
                        {service.description && <p>{service.description}</p>}
                      </div>
                    )
                  })}
                </div>
              </Container>
            </section>
          )}

          {(homepage.ctaText || homepage.secondaryCtaText) && (
            <div className="cta-buttons">
              {homepage.ctaText && homepage.ctaLink && (
                <Link href={homepage.ctaLink} className="btn btn-primary">
                  {homepage.ctaText}
                </Link>
              )}
              {homepage.secondaryCtaText && homepage.secondaryCtaLink && (
                <Link href={homepage.secondaryCtaLink} className="btn btn-secondary">
                  {homepage.secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <Container>
          <div>
            <h1>Sondre Aasgaard</h1>
            <p>Velkommen! Legg til hjemmesideinnhold i Sanity Studio.</p>
          </div>
        </Container>
      )}
    </main>
  )
}
