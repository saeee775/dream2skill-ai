'use client'
import { Header } from '@/components/layout/Header'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, Shield, Users, Clock, Star, Download } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Learner DNA',
      description: 'Dynamic learning profile that adapts to your unique style, voice, and pace in real-time',
      stats: '50K+ Active Profiles',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Smart MicroLessons',
      description: '1-3 minute story-based lessons in 10+ Indian languages, optimized for low bandwidth',
      stats: '95% Completion Rate',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Career Oracle AI',
      description: 'Predictive career guidance with local job market analysis and skill gap identification',
      stats: '500+ Career Paths',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Blockchain Verified',
      description: 'Tamper-proof SkillChain credentials that employers can verify instantly via QR code',
      stats: 'Zero Fraud Records',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { icon: <Users className="w-6 h-6" />, number: '50,247', label: 'ACTIVE LEARNERS', color: 'text-blue-400' },
    { icon: <Zap className="w-6 h-6" />, number: '10.3x', label: 'LEARNING SPEED', color: 'text-green-400' },
    { icon: <Star className="w-6 h-6" />, number: '95.7%', label: 'COMPLETION RATE', color: 'text-purple-400' },
    { icon: <Download className="w-6 h-6" />, number: '100%', label: 'OFFLINE MODE', color: 'text-cyan-400' }
  ]

  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-hidden pt-20">
      
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Main Headline */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-black mb-4 leading-none tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  DREAM
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  2SKILL
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto font-light tracking-wide"
            >
              <span className="text-cyan-400 font-semibold">AI-POWERED LEARNING ECOSYSTEM</span> FOR RURAL INDIA'S DIGITAL REVOLUTION
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Link href="/learning">
                <motion.button 
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
                    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-black rounded-2xl text-xl relative overflow-hidden group border border-blue-400/30"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Zap className="w-6 h-6" />
                    <span>START LEARNING NOW</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
              
              <Link href="/demo">
                <motion.button 
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: "#60A5FA",
                    backgroundColor: "rgba(96, 165, 250, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-transparent text-cyan-400 font-bold rounded-2xl border-2 border-cyan-500/30 text-xl transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center space-x-3">
                    <span>🎥</span>
                    <span>WATCH DEMO</span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Live Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group overflow-hidden"
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className={`flex items-center justify-center w-12 h-12 bg-gray-700/50 rounded-xl mb-3 mx-auto border border-white/10 ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-black text-white mb-1">{stat.number}</div>
                    <div className="text-xs text-gray-400 font-semibold tracking-wider">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                CORE
              </span>{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TECHNOLOGY
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
              Next-generation learning infrastructure powered by adaptive AI
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group overflow-hidden h-full hover:border-blue-500/30 transition-all duration-500">
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full h-full rounded-3xl bg-gray-900/95" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-white mb-3 tracking-wide">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                          {feature.description}
                        </p>
                        <div className="text-sm font-semibold text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full w-fit border border-cyan-400/20">
                          {feature.stats}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-8"
          >
            READY TO <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">TRANSFORM</span> YOUR FUTURE?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-cyan-100 mb-12 max-w-2xl mx-auto font-light tracking-wide"
          >
            Join India's most advanced learning platform. Build skills with AI-powered education designed for rural communities.
          </motion.p>
          <Link href="/auth/register">
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 50px rgba(34, 211, 238, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-black rounded-2xl text-xl hover:shadow-2xl transition-all duration-300 shadow-2xl border border-cyan-400/30"
            >
              <span className="flex items-center justify-center space-x-3">
                <Zap className="w-6 h-6" />
                <span>START YOUR JOURNEY</span>
              </span>
            </motion.button>
          </Link>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-cyan-300 mt-8 text-sm font-mono"
          >
            [ FREE FOREVER • 10+ INDIAN LANGUAGES • OFFLINE AVAILABLE ]
          </motion.p>
        </div>
      </section>
    </main>
  )
}