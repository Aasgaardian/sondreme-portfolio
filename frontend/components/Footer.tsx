import Link from 'next/link'
import { draftMode } from 'next/headers'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SocialIcons } from './SocialIcons'
import { getClient } from '@/lib/sanity'
import type { Contact } from '@/types/sanity'

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

export async function Footer() {
  const { isEnabled } = await draftMode()
  const contact = await getContact(isEnabled)

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Sondre Aasgaard</h3>
            <p className="footer-tagline">Full Stack Developer</p>
          </div>

          <div className="footer-section">
            <h4>Navigasjon</h4>
            <nav className="footer-nav">
              <Link href="/">Hjem</Link>
              <Link href="/arbeid">Arbeid</Link>
              <Link href="/cv">CV</Link>
              <Link href="/kontakt">Kontakt</Link>
            </nav>
          </div>

          {contact && (
            <div className="footer-section">
              <h4>Kontakt</h4>
              <div className="footer-contact">
                {contact.email && (
                  <div className="footer-contact-item">
                    <Mail size={16} />
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                )}
                {contact.phone && (
                  <div className="footer-contact-item">
                    <Phone size={16} />
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </div>
                )}
                {contact.location && (
                  <div className="footer-contact-item">
                    <MapPin size={16} />
                    <p>{contact.location}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {contact?.socialLinks && (
            <div className="footer-section">
              <h4>Følg meg</h4>
              <SocialIcons socialLinks={contact.socialLinks} />
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sondre Aasgaard. Alle rettigheter reservert.</p>
          <div className="notices">
            <a href="/personvernerklaering">Personvernerklæring</a>
            <a href="/cookies">Cookieerklæring</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
