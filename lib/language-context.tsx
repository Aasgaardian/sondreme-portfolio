'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'no' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  no: {
    // Navigation
    'nav.home': 'Hjem',
    'nav.work': 'Arbeid',
    'nav.cv': 'CV',
    'nav.contact': 'Kontakt',

    // Homepage
    'home.viewProjects': 'Se mine prosjekter',
    'home.contactMe': 'Kontakt meg',
    'home.servicesTitle': 'Hva jeg gjør',

    // Contact page
    'contact.title': 'La oss jobbe sammen',
    'contact.description': 'Har du et prosjekt eller en idé? Send meg en melding!',
    'contact.form.name': 'Navn',
    'contact.form.email': 'E-post',
    'contact.form.message': 'Melding',
    'contact.form.send': 'Send melding',
    'contact.form.sending': 'Sender...',
    'contact.success': 'Takk for meldingen! Jeg kommer tilbake til deg snart.',
    'contact.error': 'Noe gikk galt. Prøv igjen senere.',

    // Contact details
    'contact.mail': 'Mail',
    'contact.phone': 'Mobil',
    'contact.location': 'Basert',
    'contact.availability': 'Tilgjengelighet',

    // CV page
    'cv.title': 'CV',
    'cv.experience': 'Jobberfaring',
    'cv.education': 'Utdanning',
    'cv.skills': 'Ferdigheter',
    'cv.tools': 'Verktøy & Programvare',
    'cv.languages': 'Språk',
    'cv.spokenLanguages': 'Talte språk',
    'cv.programmingLanguages': 'Programmeringsspråk',
    'cv.interests': 'Interesser & Hobbyer',
    'cv.present': 'Nåværende',

    // Work page
    'work.title': 'Mitt arbeid',
    'work.noProjects': 'Legg til case studies i Sanity Studio!',

    // Common
    'common.readMore': 'Les mer',
    'common.visitWebsite': 'Besøk nettside',
    'common.close': 'Lukk',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.work': 'Work',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',

    // Homepage
    'home.viewProjects': 'View my projects',
    'home.contactMe': 'Contact me',
    'home.servicesTitle': 'What I do',

    // Contact page
    'contact.title': "Let's work together",
    'contact.description': 'Have a project or idea? Send me a message!',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send message',
    'contact.form.sending': 'Sending...',
    'contact.success': 'Thank you for your message! I will get back to you soon.',
    'contact.error': 'Something went wrong. Please try again later.',

    // Contact details
    'contact.mail': 'Mail',
    'contact.phone': 'Phone',
    'contact.location': 'Based in',
    'contact.availability': 'Availability',

    // CV page
    'cv.title': 'CV',
    'cv.experience': 'Work Experience',
    'cv.education': 'Education',
    'cv.skills': 'Skills',
    'cv.tools': 'Tools & Software',
    'cv.languages': 'Languages',
    'cv.spokenLanguages': 'Spoken Languages',
    'cv.programmingLanguages': 'Programming Languages',
    'cv.interests': 'Interests & Hobbies',
    'cv.present': 'Present',

    // Work page
    'work.title': 'My work',
    'work.noProjects': 'Add case studies in Sanity Studio!',

    // Common
    'common.readMore': 'Read more',
    'common.visitWebsite': 'Visit website',
    'common.close': 'Close',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('no')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as Language | null
    if (savedLanguage && (savedLanguage === 'no' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    if (!mounted) return key
    return translations[language][key as keyof typeof translations['no']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
