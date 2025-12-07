/**
 * PortableText Component
 *
 * Renders Sanity's rich text (Portable Text) into HTML.
 * You can customize how different blocks are rendered.
 */

import { PortableText as PortableTextReact } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import SanityImage from './SanityImage'

interface PortableTextProps {
  value: PortableTextBlock[]
}

// Custom components for different block types
const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="portable-text-image">
          <SanityImage image={value} alt={value.alt || 'Image'} width={1200} height={800} />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
  },
  marks: {
    link: ({ children, value }: any) => {
      return (
        <a href={value.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    },
  },
}

export default function PortableText({ value }: PortableTextProps) {
  return <PortableTextReact value={value} components={components} />
}
