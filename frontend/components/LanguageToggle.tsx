'use client'

import { useLanguage } from '@/lib/language-context'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    const newLanguage = language === 'no' ? 'en' : 'no'
    setLanguage(newLanguage)
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
