import { Mail, MapPin, Phone, UserRoundSearch } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import CaseStudyCard from '@/components/CaseStudyCard'
import Container from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageTransition } from '@/components/PageTransition'
import PortableText from '@/components/PortableText'
import SanityImage from '@/components/SanityImage'
import { SocialIcons } from '@/components/SocialIcons'
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer'
import { getClient } from '@/lib/sanity'
import { isMaintenanceMode } from '@/lib/site-settings'
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
      subtitle,
      profileImage,
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
      services
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
  const [homepage, contact, maintenanceMode] = await Promise.all([
    getHomepage(isEnabled),
    getContact(isEnabled),
    isMaintenanceMode(),
  ])

  return (
    <PageTransition>
      {homepage ? (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <Container>
              <div className="hero-content">
                <div className="profile-section">
                  {homepage.profileImage && (
                    <div className="profile-image">
                      <SanityImage
                        image={homepage.profileImage}
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
                        <p className="contact-detail-title">Sondre Aasgaard</p>
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
                      {contact.socialLinks && contact.socialLinks.length > 0 && (
                        <div className="contact-detail-item contact-social">
                          <SocialIcons socialLinks={contact.socialLinks} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="profile-text">
                  {homepage.subtitle && Array.isArray(homepage.subtitle) && homepage.subtitle.length > 0 && (
                    <div className="subtitle">
                      <PortableText value={homepage.subtitle} />
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>

          {/* Only show these sections if not in maintenance mode */}
          {!maintenanceMode && (
            <>
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
                    <FadeIn>
                      {homepage.servicesTitle && (
                        <h2 className="section-title">
                          <Balancer>{homepage.servicesTitle}</Balancer>
                        </h2>
                      )}
                    </FadeIn>
                    <StaggerContainer className="services-grid">
                      {homepage.services.map((service) => {
                        const IconComponent =
                          service.icon &&
                          (LucideIcons as any)[service.icon]
                        return (
                          <StaggerItem key={service.title}>
                            <div className="service-card">
                              {IconComponent && (
                                <div className="service-icon">
                                  <IconComponent size={32} />
                                </div>
                              )}
                              <h3>{service.title}</h3>
                              {service.description && <p>{service.description}</p>}
                            </div>
                          </StaggerItem>
                        )
                      })}
                    </StaggerContainer>
                  </Container>
                </section>
              )}
            </>
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
    </PageTransition>
  )
}
