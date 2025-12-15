// apps/web/src/app/auth/register/page.tsx - UPDATED VERSION
'use client'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, MapPin, Smartphone, Globe, Calendar, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    village: '',
    district: '',
    state: '',
    language: 'hindi',
    education: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const languages = [
    { code: 'hindi', name: 'हिन्दी', native: 'हिन्दी' },
    { code: 'marathi', name: 'Marathi', native: 'मराठी' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bengali', name: 'Bengali', native: 'বাংলা' },
    { code: 'english', name: 'English', native: 'English' }
  ]

  const educationLevels = [
    'No Formal Education',
    'Primary School (1-5)',
    'Middle School (6-8)',
    'High School (9-10)',
    'Intermediate (11-12)',
    'Graduate',
    'Post Graduate'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.email = 'Email or phone number is required'
    } else if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.village.trim()) {
      newErrors.village = 'Village/Town is required'
    }

    if (!formData.district.trim()) {
      newErrors.district = 'District is required'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    if (!formData.education) {
      newErrors.education = 'Education level is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        // Save user data and token
        localStorage.setItem('dream2skill-user', JSON.stringify(result.data.user))
        localStorage.setItem('dream2skill-token', result.data.token)
        
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setErrors({ submit: result.error })
      }
    } catch (error) {
      console.error('Registration failed:', error)
      setErrors({ submit: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
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
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-cyan-600 rounded-lg" />
              <span className="text-xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                DREAM2SKILL
              </span>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Join Dream2Skill</h1>
          <p className="text-gray-400">Start your learning journey today</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 mr-2" />
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full bg-gray-700/50 border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 transition-all ${
                  errors.fullName 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-green-500 focus:ring-green-500/20'
                }`}
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`w-full bg-gray-700/50 border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-green-500 focus:ring-green-500/20'
                }`}
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            {!formData.email && !formData.phone && <p className="text-gray-400 text-xs mt-1">Email or phone required</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Smartphone className="w-4 h-4 mr-2" />
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter 10-digit phone number"
                className={`w-full bg-gray-700/50 border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 transition-all ${
                  errors.phone 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-green-500 focus:ring-green-500/20'
                }`}
              />
              <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Location - Village */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              Village/Town *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.village}
                onChange={(e) => handleInputChange('village', e.target.value)}
                placeholder="Enter your village or town"
                className={`w-full bg-gray-700/50 border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 transition-all ${
                  errors.village 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-green-500 focus:ring-green-500/20'
                }`}
              />
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.village && <p className="text-red-400 text-xs mt-1">{errors.village}</p>}
          </div>

          {/* District */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              District *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                placeholder="Enter your district"
                className={`w-full bg-gray-700/50 border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 transition-all ${
                  errors.district 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-green-500 focus:ring-green-500/20'
                }`}
              />
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.district && <p className="text-red-400 text-xs mt-1">{errors.district}</p>}
          </div>

          {/* State */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              State *
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="Enter your state"
                className={`w-full bg-gray-700/50 border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 transition-all ${
                  errors.state 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-green-500 focus:ring-green-500/20'
                }`}
              />
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
          </div>

          {/* Education Level */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Education Level *
            </label>
            <select 
              value={formData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              className={`w-full bg-gray-700/50 border rounded-xl px-4 py-3 text-white focus:ring-2 transition-all ${
                errors.education 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-white/10 focus:border-green-500 focus:ring-green-500/20'
              }`}
            >
              <option value="">Select your education level</option>
              {educationLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.education && <p className="text-red-400 text-xs mt-1">{errors.education}</p>}
          </div>

          {/* Language Preference */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Globe className="w-4 h-4 mr-2" />
              Preferred Learning Language
            </label>
            <select 
              value={formData.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full bg-gray-700/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Lock className="w-4 h-4 mr-2" />
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Create a password (min. 6 characters)"
                className={`w-full bg-gray-700/50 border rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-400 focus:ring-2 transition-all ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : 'border-white/10 focus:border-green-500 focus:ring-green-500/20'
                }`}
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
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {errors.submit}
            </div>
          )}

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-cyan-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Create Account</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Rural India Features */}
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <h3 className="text-green-400 font-semibold mb-2">Perfect for Rural India:</h3>
          <ul className="text-green-300 text-sm space-y-1">
            <li>✓ Works offline with low data usage</li>
            <li>✓ Available in your local language</li>
            <li>✓ Voice-based lessons available</li>
            <li>✓ No advanced education required</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}