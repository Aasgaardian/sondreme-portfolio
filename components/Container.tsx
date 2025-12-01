/**
 * Container Component
 *
 * Provides consistent max-width and padding across pages.
 * This is a simple but powerful pattern for layout consistency.
 */

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return <div className={`container ${className}`}>{children}</div>
}
