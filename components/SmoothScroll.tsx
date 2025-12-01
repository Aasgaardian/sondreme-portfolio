/**
 * SmoothScroll Component
 *
 * Provides butter-smooth scrolling using Lenis
 * Add to layout for site-wide smooth scrolling
 */

'use client'

import { useEffect } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues
    let lenis: any

    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default

      lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 1.5,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    initLenis()

    return () => {
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [])

  return <>{children}</>
}
