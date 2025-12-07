/**
 * Sanity Content Types
 *
 * These types match your Sanity schemas.
 * Update these whenever you change your Sanity schemas.
 */

import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url'

// Base document type that all Sanity documents extend
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Case Study
export interface CaseStudy extends SanityDocument {
  _type: 'caseStudy'
  title: string
  slug: {
    current: string
  }
  excerpt: string
  mainImage?: SanityImageSource
  client?: string
  year?: number
  tags?: string[]
  content?: PortableTextBlock[]
}

// Service (object, not document)
export interface Service {
  title: string
  description?: string
  icon?: string
}

// Homepage (Singleton)
export interface Homepage extends SanityDocument {
  _type: 'homepage'
  title: string
  subtitle?: PortableTextBlock[]
  bio?: PortableTextBlock[]
  profileImage?: SanityImageSource
  heroImage?: SanityImageSource
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  featuredWork?: CaseStudy[]
  servicesTitle?: string
  services?: Service[]
  contactCtaTitle?: string
  contactCtaText?: string
}

// Work Experience
export interface Experience extends SanityDocument {
  _type: 'experience'
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  description?: PortableTextBlock[]
  skills?: string[]
  logo?: SanityImageSource
}

// Education
export interface Education extends SanityDocument {
  _type: 'education'
  institution: string
  degree: string
  field?: string
  startDate: string
  endDate?: string
  current: boolean
  grade?: string
  description?: PortableTextBlock[]
  logo?: SanityImageSource
}

// Skill
export interface Skill extends SanityDocument {
  _type: 'skill'
  name: string
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'other'
  proficiency: number // 1-100 (percentage)
  description?: string
  icon?: SanityImageSource
}

// Social Link (object, not document)
export interface SocialLink {
  platform: 'linkedin' | 'github' | 'twitter' | 'instagram' | 'dribbble' | 'behance'
  url: string
}

// Contact Information (Singleton)
export interface Contact extends SanityDocument {
  _type: 'contact'
  email: string
  phone?: string
  location?: string
  socialLinks?: SocialLink[]
  availability?: string
  professionalSummary?: string
}

// Tool / Software
export interface Tool extends SanityDocument {
  _type: 'tool'
  name: string
  category: 'design' | 'development' | 'productivity' | 'devops' | 'communication' | 'other'
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience?: number
  icon?: SanityImageSource
  description?: string
}

// Interest / Hobby
export interface Interest extends SanityDocument {
  _type: 'interest'
  name: string
  description?: string
  category?:
    | 'sports'
    | 'arts'
    | 'tech'
    | 'travel'
    | 'food'
    | 'music'
    | 'learning'
    | 'gaming'
    | 'other'
  icon?: SanityImageSource
  featured: boolean
}

// Language (Spoken or Programming)
export interface Language extends SanityDocument {
  _type: 'language'
  name: string
  type: 'spoken' | 'programming'
  proficiency:
    | 'native'
    | 'fluent'
    | 'professional'
    | 'limited'
    | 'elementary'
    | 'expert'
    | 'advanced'
    | 'intermediate'
    | 'beginner'
  yearsOfExperience?: number
  icon?: SanityImageSource
  certifications?: string[]
}

// Site Settings (Singleton)
export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings'
  title: string
  description: string
  keywords?: string[]
  ogImage?: SanityImageSource
  favicon?: SanityImageSource
  primaryColor?: string
  socialMedia?: {
    twitter?: string
    linkedIn?: string
    github?: string
  }
  analytics?: {
    googleAnalyticsId?: string
    plausibleDomain?: string
  }
  announcement?: {
    enabled: boolean
    text?: string
    link?: string
    type: 'info' | 'success' | 'warning'
  }
}
