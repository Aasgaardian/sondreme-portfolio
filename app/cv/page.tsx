import Container from '@/components/Container'
import PortableText from '@/components/PortableText'
import SanityImage from '@/components/SanityImage'
import { client } from '@/lib/sanity'
import type {
  Contact,
  Education,
  Experience,
  Interest,
  Language,
  Skill,
  Tool,
} from '@/types/sanity'

// Force dynamic rendering to see changes immediately
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getExperience(): Promise<Experience[]> {
  const query = `*[_type == "experience" && !defined(__i18n_lang)] | order(startDate desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    company,
    position,
    startDate,
    endDate,
    current,
    description,
    skills,
    logo
  }`

  return await client.fetch(query)
}

async function getEducation(): Promise<Education[]> {
  const query = `*[_type == "education" && !defined(__i18n_lang)] | order(startDate desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    institution,
    degree,
    field,
    startDate,
    endDate,
    current,
    grade,
    description,
    logo
  }`

  return await client.fetch(query)
}

async function getSkills(): Promise<Skill[]> {
  const query = `*[_type == "skill" && !defined(__i18n_lang)] | order(category asc, proficiency desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    category,
    proficiency,
    icon
  }`

  return await client.fetch(query)
}

async function getContact(): Promise<Contact | null> {
  const query = `*[_type == "contact"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    email,
    phone,
    location,
    socialLinks,
    availability,
    professionalSummary
  }`

  return await client.fetch(query)
}

async function getTools(): Promise<Tool[]> {
  const query = `*[_type == "tool" && !defined(__i18n_lang)] | order(category asc, proficiency desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    category,
    proficiency,
    yearsOfExperience,
    icon,
    description
  }`

  return await client.fetch(query)
}

async function getLanguages(): Promise<Language[]> {
  const query = `*[_type == "language" && !defined(__i18n_lang)] | order(type asc, proficiency desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    type,
    proficiency,
    yearsOfExperience,
    icon,
    certifications
  }`

  return await client.fetch(query)
}

async function getInterests(): Promise<Interest[]> {
  const query = `*[_type == "interest" && !defined(__i18n_lang)] | order(featured desc, category asc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    description,
    category,
    icon,
    featured
  }`

  return await client.fetch(query)
}

export default async function CVPage() {
  const [experiences, education, skills, contact, tools, languages, interests] = await Promise.all([
    getExperience(),
    getEducation(),
    getSkills(),
    getContact(),
    getTools(),
    getLanguages(),
    getInterests(),
  ])

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  // Group tools by category
  const toolsByCategory = tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = []
      }
      acc[tool.category].push(tool)
      return acc
    },
    {} as Record<string, Tool[]>
  )

  // Separate spoken and programming languages
  const spokenLanguages = languages.filter((lang) => lang.type === 'spoken')
  const programmingLanguages = languages.filter((lang) => lang.type === 'programming')

  return (
    <main>
      <Container>
        <h1>CV</h1>

        {/* Professional Summary */}
        {contact?.professionalSummary && (
          <section className="cv-section professional-summary">
            <p className="summary-text">{contact.professionalSummary}</p>
          </section>
        )}

        {/* Experience Section */}
        <section className="cv-section">
          <h2>Jobberfaring</h2>
          {experiences.length === 0 ? (
            <p>Add your work experience in Sanity Studio!</p>
          ) : (
            <div className="experience-list">
              {experiences.map((exp) => (
                <article key={exp._id} className="experience-item">
                  {exp.logo && (
                    <div className="experience-logo">
                      <SanityImage
                        image={exp.logo}
                        alt={exp.company}
                        width={200}
                        height={200}
                      />
                    </div>
                  )}

                  <div className="experience-content">
                    <h3>{exp.position}</h3>
                    <p className="experience-company">{exp.company}</p>
                    <p className="experience-dates">
                      {new Date(exp.startDate).toLocaleDateString('no-NO', {
                        year: 'numeric',
                        month: 'long',
                      })}
                      {' - '}
                      {exp.current
                        ? 'Present'
                        : exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString('no-NO', {
                              year: 'numeric',
                              month: 'long',
                            })
                          : 'Present'}
                    </p>

                    {exp.description && (
                      <div className="experience-description">
                        <PortableText value={exp.description} />
                      </div>
                    )}

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="experience-skills">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Education Section */}
        <section className="cv-section">
          <h2>Utdanning</h2>
          {education.length === 0 ? (
            <p>Add your education in Sanity Studio!</p>
          ) : (
            <div className="experience-list">
              {education.map((edu) => (
                <article key={edu._id} className="experience-item">
                  {edu.logo && (
                    <div className="experience-logo">
                      <SanityImage
                        image={edu.logo}
                        alt={edu.institution}
                        width={200}
                        height={200}
                      />
                    </div>
                  )}

                  <div className="experience-content">
                    <h3>{edu.degree}</h3>
                    {edu.field && <p className="experience-company">{edu.field}</p>}
                    <p className="experience-company">{edu.institution}</p>
                    <p className="experience-dates">
                      {new Date(edu.startDate).toLocaleDateString('no-NO', {
                        year: 'numeric',
                        month: 'long',
                      })}
                      {' - '}
                      {edu.current
                        ? 'Present'
                        : edu.endDate
                          ? new Date(edu.endDate).toLocaleDateString('no-NO', {
                              year: 'numeric',
                              month: 'long',
                            })
                          : 'Present'}
                    </p>

                    {edu.grade && <p className="education-grade">Grade: {edu.grade}</p>}

                    {edu.description && (
                      <div className="experience-description">
                        <PortableText value={edu.description} />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section className="cv-section">
          <h2>Ferdigheter</h2>
          {skills.length === 0 ? (
            <p>Legg til ferdighetene dine i Sanity Studio!</p>
          ) : (
            <div className="skills-grid">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="skill-category">
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                  <ul>
                    {categorySkills.map((skill) => (
                      <li key={skill._id}>
                        {skill.name}
                        <span className="skill-proficiency">
                          {'★'.repeat(skill.proficiency)}
                          {'☆'.repeat(5 - skill.proficiency)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Tools & Software Section */}
        <section className="cv-section">
          <h2>Verktøy & Programvare</h2>
          {tools.length === 0 ? (
            <p>Legg til verktøyene dine i Sanity Studio!</p>
          ) : (
            <div className="skills-grid">
              {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
                <div key={category} className="skill-category">
                  <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                  <ul>
                    {categoryTools.map((tool) => (
                      <li key={tool._id}>
                        {tool.icon && (
                          <span className="tool-icon">
                            <SanityImage image={tool.icon} alt={tool.name} width={20} height={20} />
                          </span>
                        )}
                        {tool.name}
                        <span className="tool-proficiency">
                          {tool.proficiency}
                          {tool.yearsOfExperience && ` • ${tool.yearsOfExperience}y`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Languages Section */}
        <section className="cv-section">
          <h2>Språk</h2>
          {languages.length === 0 ? (
            <p>Legg til språkene dine i Sanity Studio!</p>
          ) : (
            <div className="languages-container">
              {spokenLanguages.length > 0 && (
                <div className="language-group">
                  <h3>Talte språk</h3>
                  <ul className="language-list">
                    {spokenLanguages.map((lang) => (
                      <li key={lang._id}>
                        {lang.icon && (
                          <span className="language-icon">
                            <SanityImage image={lang.icon} alt={lang.name} width={24} height={24} />
                          </span>
                        )}
                        <div className="language-info">
                          <span className="language-name">{lang.name}</span>
                          <span className="language-proficiency">
                            {lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)}
                          </span>
                          {lang.certifications && lang.certifications.length > 0 && (
                            <span className="language-certifications">
                              {lang.certifications.join(', ')}
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {programmingLanguages.length > 0 && (
                <div className="language-group">
                  <h3>Programmeringsspråk</h3>
                  <ul className="language-list">
                    {programmingLanguages.map((lang) => (
                      <li key={lang._id}>
                        {lang.icon && (
                          <span className="language-icon">
                            <SanityImage image={lang.icon} alt={lang.name} width={24} height={24} />
                          </span>
                        )}
                        <div className="language-info">
                          <span className="language-name">{lang.name}</span>
                          <span className="language-proficiency">
                            {lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)}
                          </span>
                          {lang.yearsOfExperience && (
                            <span className="language-experience">
                              {lang.yearsOfExperience} years
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Interests & Hobbies Section */}
        <section className="cv-section">
          <h2>Interesser & Hobbyer</h2>
          {interests.length === 0 ? (
            <p>Legg til interessene dine i Sanity Studio!</p>
          ) : (
            <div className="interests-grid">
              {interests.map((interest) => (
                <div key={interest._id} className="interest-card">
                  {interest.icon && (
                    <div className="interest-image">
                      <SanityImage
                        image={interest.icon}
                        alt={interest.name}
                        width={400}
                        height={300}
                      />
                    </div>
                  )}
                  <div className="interest-content">
                    <h3>{interest.name}</h3>
                    {interest.description && (
                      <p className="interest-description">{interest.description}</p>
                    )}
                    {interest.category && (
                      <span className="interest-category">
                        {interest.category.charAt(0).toUpperCase() + interest.category.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </Container>
    </main>
  )
}
