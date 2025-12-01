/**
 * Visual Editing Component
 *
 * This component enables the visual editing overlay when in draft mode.
 * It must be a client component to use the VisualEditing from Sanity.
 */

'use client'

import { enableVisualEditing } from '@sanity/visual-editing'
import { useEffect } from 'react'

export default function VisualEditing() {
  useEffect(() => {
    const disable = enableVisualEditing({
      studioUrl: 'http://localhost:3333',
    })

    return () => disable()
  }, [])

  return null
}
