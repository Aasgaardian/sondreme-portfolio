'use client'

import { Languages } from 'lucide-react'
import { useEffect, useState } from 'react'

export function LanguageToggle() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguage] = useState<'no' | 'en'>('no')

  useEffect(() => {
    setMounted(true)
    // Sjekk lagret språk
    const savedLanguage = localStorage.getItem('language') as 'no' | 'en' | null
    setLanguage(savedLanguage || 'no')
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'no' ? 'en' : 'no'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    // TODO: Implementer språkbytte-logikk
    window.location.reload()
  }

  if (!mounted) {
    return (
      <button type="button" className="theme-toggle" aria-label="Språk">
        <Languages size={20} />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="theme-toggle language-toggle"
      aria-label={language === 'no' ? 'Switch to English' : 'Bytt til norsk'}
      title={language === 'no' ? 'Switch to English' : 'Bytt til norsk'}
    >
      <span className="language-code">{language.toUpperCase()}</span>
    </button>
  )
}
