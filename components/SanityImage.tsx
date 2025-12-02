/**
 * SanityImage Component
 *
 * Wraps Next.js Image with Sanity's urlFor helper.
 * Handles image optimization automatically.
 *
 * Usage:
 *   <SanityImage image={caseStudy.mainImage} width={800} height={600} />
 *   Alt text is automatically extracted from the image object's alt field
 */

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface SanityImageProps {
  image: SanityImageSource & { alt?: string }
  alt?: string // Optional fallback alt text
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

  // Use alt from image object first, then fallback to prop, then empty string
  const altText = (image as any)?.alt || alt || ''

  return (
    <Image
      src={imageUrl}
      alt={altText}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
