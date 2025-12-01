'use client'

import Link from 'next/link'
import Image from "next/image";
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

interface NavigationProps {
  isEnabled?: boolean
}

export function Navigation({ isEnabled }: NavigationProps) {
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
            <Link href="/">Hjem</Link>
            <Link href="/arbeid">Arbeid</Link>
            <Link href="/cv">CV</Link>
            <Link href="/kontakt">Kontakt</Link>
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
