import type { Metadata } from 'next'
import { Mail, MapPin, Phone, UserRoundSearch } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import Container from '@/components/Container'
import { client } from '@/lib/sanity'
import type { Contact } from '@/types/sanity'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Ta kontakt - send meg en melding eller finn meg på sosiale medier',
  openGraph: {
    title: 'Kontakt | Sondre Aasgaard',
    description: 'Ta kontakt - send meg en melding eller finn meg på sosiale medier',
  },
}

// Force dynamic rendering to see changes immediately
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getContact(): Promise<Contact | null> {
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

export default async function KontaktPage() {
  const contact = await getContact()

  return (
    <main>
      <Container>
        <h1>Kontakt</h1>

        <div className="contact-page-grid">
          {/* Contact Info */}
          <div className="contact-info-section">
            {contact ? (
              <>
                {contact.availability && <p className="availability">{contact.availability}</p>}

                <div className="contact-details">
                  <div className="contact-detail-item">
                    <Mail size={20} />
                    <div>
                      <strong>E-post</strong>
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </div>
                  </div>

                  {contact.phone && (
                    <div className="contact-detail-item">
                      <Phone size={20} />
                      <div>
                        <strong>Telefon</strong>
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

                {contact.socialLinks && contact.socialLinks.length > 0 && (
                  <div className="social-links">
                    <h2>Kontakt meg</h2>
                    <ul>
                      {contact.socialLinks.map((link) => (
                        <li key={link.url}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <p>Legg til kontaktinformasjonen din i Sanity Studio!</p>
            )}
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Gi meg en pling</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </main>
  )
}
