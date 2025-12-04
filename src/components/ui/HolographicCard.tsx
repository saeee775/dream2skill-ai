'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HolographicCardProps {
  children: ReactNode
  className?: string
}

export const HolographicCard = ({ children, className = '' }: HolographicCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group ${className}`}
    >
      {/* Holographic Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-full h-full rounded-3xl bg-gray-900/95" />
      </div>
      
      <div className="relative z-10 p-8">
        {children}
      </div>
    </motion.div>
  )
}