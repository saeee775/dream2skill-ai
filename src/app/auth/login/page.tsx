// apps/web/src/app/auth/login/page.tsx
'use client'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Smartphone, Globe } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    language: 'hindi'
  })

  const languages = [
    { code: 'hindi', name: 'हिन्दी', native: 'हिन्दी' },
    { code: 'marathi', name: 'Marathi', native: 'मराठी' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bengali', name: 'Bengali', native: 'বাংলা' },
    { code: 'english', name: 'English', native: 'English' }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DREAM2SKILL
              </span>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Continue your learning journey</p>
        </div>

        {/* Login Form */}
        <form className="space-y-6">
          {/* Language Selector */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Globe className="w-4 h-4 mr-2" />
              Preferred Language
            </label>
            <select 
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
              className="w-full bg-gray-700/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Email/Phone Input */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email or Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter email or phone"
                className="w-full bg-gray-700/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password"
                className="w-full bg-gray-700/50 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Sign In
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">New to Dream2Skill?</span>
          </div>
        </div>

        {/* Register Link */}
        <Link href="/auth/register">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-transparent border-2 border-cyan-500/30 text-cyan-400 font-bold py-4 rounded-xl hover:bg-cyan-500/10 transition-all duration-300"
          >
            Create New Account
          </motion.button>
        </Link>

        {/* Offline Notice */}
        <div className="mt-6 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-center">
          <p className="text-cyan-300 text-sm font-mono">
            💡 Works Offline • Low Data Usage
          </p>
        </div>
      </motion.div>
    </div>
  )
}