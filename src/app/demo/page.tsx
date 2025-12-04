// src/app/demo/page.tsx
'use client'
import { Header } from '@/components/layout/Header'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, Shield, Play, Users, Star, Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DemoPage() {
  const demoFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Learner DNA Analysis',
      description: 'Watch how our AI analyzes learning patterns, cognitive styles, and emotional intelligence in real-time',
      gradient: 'from-blue-500 to-cyan-500',
      videoPreview: '/demos/dna-analysis.mp4'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Smart MicroLessons',
      description: 'Experience adaptive 1-3 minute lessons that change based on your comprehension and engagement',
      gradient: 'from-green-500 to-emerald-500',
      videoPreview: '/demos/micro-lessons.mp4'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Career Oracle AI',
      description: 'See predictive career guidance with local job market analysis and personalized skill recommendations',
      gradient: 'from-purple-500 to-pink-500',
      videoPreview: '/demos/career-oracle.mp4'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Blockchain Verification',
      description: 'Watch instant credential verification via QR code with tamper-proof SkillChain technology',
      gradient: 'from-orange-500 to-red-500',
      videoPreview: '/demos/blockchain-verify.mp4'
    }
  ]

  const interactiveDemo = [
    {
      step: 1,
      title: "AI Assessment",
      description: "15-minute intelligent profiling",
      duration: "2 min demo",
      active: true
    },
    {
      step: 2,
      title: "Personalized Path", 
      description: "AI-generated learning roadmap",
      duration: "3 min demo",
      active: false
    },
    {
      step: 3,
      title: "Adaptive Learning",
      description: "Real-time content adjustment",
      duration: "4 min demo", 
      active: false
    },
    {
      step: 4,
      title: "Skill Verification",
      description: "Blockchain credential issuance",
      duration: "2 min demo",
      active: false
    }
  ]

  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <Header />
      
      {/* Animated Background - Same as landing page */}
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
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  LIVE
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  DEMO
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
              <span className="text-cyan-400 font-semibold">EXPERIENCE THE FUTURE</span> OF RURAL EDUCATION THROUGH INTERACTIVE DEMONSTRATIONS
            </motion.p>
            
            {/* Interactive Demo Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-6xl mx-auto mb-16"
            >
              <div className="grid md:grid-cols-4 gap-6">
                {interactiveDemo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`relative bg-gray-700/30 backdrop-blur-lg border rounded-2xl p-6 text-center group cursor-pointer transition-all duration-300 ${
                      item.active 
                        ? 'border-cyan-500/50 bg-cyan-500/10' 
                        : 'border-white/10 hover:border-purple-500/30'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      item.active 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-gray-600/50 text-gray-400'
                    }`}>
                      {item.active ? <Play className="w-6 h-6" /> : item.step}
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${
                      item.active ? 'text-cyan-400' : 'text-gray-300'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                    <div className="text-xs text-cyan-400 font-mono">{item.duration}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Play Demo Button */}
              <motion.div className="text-center mt-8">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 40px rgba(34, 211, 238, 0.5)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 font-black rounded-2xl text-lg border border-cyan-400/30 flex items-center space-x-3 mx-auto"
                >
                  <Play className="w-6 h-6" />
                  <span>PLAY FULL INTERACTIVE DEMO</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Demos Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                WATCH
              </span>{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FEATURES
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
              See our AI-powered features in action through detailed video demonstrations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {demoFeatures.map((feature, index) => (
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
                        <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                          {feature.description}
                        </p>
                        
                        {/* Video Preview Placeholder */}
                        <div className="relative bg-gray-900/50 rounded-2xl p-4 border border-white/10 group/card">
                          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center relative z-10 shadow-2xl"
                            >
                              <Play className="w-8 h-8 text-gray-900 ml-1" />
                            </motion.button>
                            <div className="absolute bottom-4 left-4 text-sm text-cyan-300 font-mono">
                              Click to play demo
                            </div>
                          </div>
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
            READY TO <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">EXPERIENCE</span> IT YOURSELF?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-cyan-100 mb-12 max-w-2xl mx-auto font-light tracking-wide"
          >
            Join thousands of rural learners already transforming their lives with AI-powered education.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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
                  <span>START FREE TRIAL</span>
                </span>
              </motion.button>
            </Link>
            
            <Link href="/learning">
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "#60A5FA",
                  backgroundColor: "rgba(96, 165, 250, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-transparent text-cyan-400 font-bold rounded-2xl border-2 border-cyan-500/30 text-xl transition-all duration-300 group"
              >
                <span className="flex items-center justify-center space-x-3">
                  <ArrowRight className="w-6 h-6" />
                  <span>EXPLORE LEARNING</span>
                </span>
              </motion.button>
            </Link>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-cyan-300 mt-8 text-sm font-mono"
          >
            [ NO CREDIT CARD • 10+ INDIAN LANGUAGES • INSTANT ACCESS ]
          </motion.p>
        </div>
      </section>
    </main>
  )
}