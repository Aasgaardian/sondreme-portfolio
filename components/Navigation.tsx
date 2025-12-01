'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

interface NavigationProps {
  isEnabled?: boolean
}

export function Navigation({ isEnabled }: NavigationProps) {
  const { t } = useLanguage()

  return (
    <header>
      <div className="header-wrapper">
        <div className="logo">
          <Link href="/" className="flex items-center">
            <p className="logo">SondreAasgaard</p>
          </Link>
        </div>
        <nav>
          <div className="nav-links">
            <Link href="/">{t('nav.home')}</Link>
            <Link href="/arbeid">{t('nav.work')}</Link>
            <Link href="/cv">{t('nav.cv')}</Link>
            <Link href="/kontakt">{t('nav.contact')}</Link>
          </div>
          <div className="nav-actions">
            <LanguageToggle />
            <ThemeToggle />
            {isEnabled && (
              <Link href="/api/disable-draft" className="draft-mode-badge">
                Draft Mode ON
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
