'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  href?: string
}

export function AnimatedCard({ children, className = '', href }: AnimatedCardProps) {
  const cardContent = (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <a href={href}>{cardContent}</a>
  }

  return cardContent
}
