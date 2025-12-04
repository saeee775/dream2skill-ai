// apps/web/src/components/layout/Header.tsx - UPDATE EXISTING FILE
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DREAM2SKILL
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/learning" className="text-gray-300 hover:text-white font-medium transition-colors">
              Learning
            </Link>
            <Link href="/skills" className="text-gray-300 hover:text-white font-medium transition-colors">
              Skills
            </Link>
            <Link href="/career" className="text-gray-300 hover:text-white font-medium transition-colors">
              Career
            </Link>
            <Link href="/profile" className="text-gray-300 hover:text-white font-medium transition-colors">
              Profile
            </Link>
          </nav>

          {/* Auth Buttons - Now shows user info when logged in */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-300 text-sm">
                  Welcome, {user?.village || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}