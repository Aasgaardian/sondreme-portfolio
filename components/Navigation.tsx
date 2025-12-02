'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { LanguageToggle } from './LanguageToggle'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

interface NavigationProps {
  isEnabled?: boolean
}

export function Navigation({ isEnabled }: NavigationProps) {
  const { t } = useLanguage()
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <header role="banner">
      <div className="header-wrapper">
        <div className="logo">
          <Link href="/" className="flex items-center" aria-label="Home - Sondre Aasgaard">
            <p className="logo">SondreAasgaard</p>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav role="navigation" aria-label="Main navigation" className="desktop-nav">
          <div className="nav-links">
            <Link href="/" className={isActive('/') ? 'active' : ''} aria-current={isActive('/') ? 'page' : undefined}>
              {t('nav.home')}
            </Link>
            <Link href="/arbeid" className={isActive('/arbeid') ? 'active' : ''} aria-current={isActive('/arbeid') ? 'page' : undefined}>
              {t('nav.work')}
            </Link>
            <Link href="/cv" className={isActive('/cv') ? 'active' : ''} aria-current={isActive('/cv') ? 'page' : undefined}>
              {t('nav.cv')}
            </Link>
            <Link href="/kontakt" className={isActive('/kontakt') ? 'active' : ''} aria-current={isActive('/kontakt') ? 'page' : undefined}>
              {t('nav.contact')}
            </Link>
          </div>
          <div className="nav-actions" role="group" aria-label="Site controls">
            <LanguageToggle />
            <ThemeToggle />
            {isEnabled && (
              <Link
                href="/api/disable-draft"
                className="draft-mode-badge"
                aria-label="Disable draft mode"
              >
                Draft Mode ON
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu isEnabled={isEnabled} />
      </div>
    </header>
  )
}
