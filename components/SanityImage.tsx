/**
 * SanityImage Component
 *
 * Wraps Next.js Image with Sanity's urlFor helper.
 * Handles image optimization automatically.
 *
 * Usage:
 *   <SanityImage image={caseStudy.mainImage} alt="Case study" width={800} height={600} />
 */

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface SanityImageProps {
  image: SanityImageSource
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function SanityImage({
  image,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: SanityImageProps) {
  if (!image) return null

  const imageUrl = urlFor(image).width(width).height(height).url()

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
