import caseStudy from './caseStudy'
import contact from './contact'
import education from './education'
import experience from './experience'
import homepage from './homepage'
import interest from './interest'
import language from './language'
import seo from './seo'
import siteSettings from './siteSettings'
import skill from './skill'
import tool from './tool'

export const schemaTypes = [
  // Documents (repeatable content)
  caseStudy,
  experience,
  education,
  skill,
  tool,
  interest,
  language,

  // Singletons (only one document each)
  homepage,
  contact,
  seo,
  siteSettings,
]
