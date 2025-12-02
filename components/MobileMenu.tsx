'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

interface MobileMenuProps {
  isEnabled?: boolean
}

export function MobileMenu({ isEnabled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="mobile-menu-backdrop"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Content */}
          <div className="mobile-menu">
            <nav className="mobile-menu-nav">
              <Link
                href="/"
                className={isActive('/') ? 'active' : ''}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/arbeid"
                className={isActive('/arbeid') ? 'active' : ''}
                aria-current={isActive('/arbeid') ? 'page' : undefined}
              >
                {t('nav.work')}
              </Link>
              <Link
                href="/cv"
                className={isActive('/cv') ? 'active' : ''}
                aria-current={isActive('/cv') ? 'page' : undefined}
              >
                {t('nav.cv')}
              </Link>
              <Link
                href="/kontakt"
                className={isActive('/kontakt') ? 'active' : ''}
                aria-current={isActive('/kontakt') ? 'page' : undefined}
              >
                {t('nav.contact')}
              </Link>
            </nav>

            <div className="mobile-menu-actions">
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
          </div>
        </>
      )}
    </>
  )
}
