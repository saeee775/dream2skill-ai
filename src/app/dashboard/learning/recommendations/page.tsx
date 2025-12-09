// apps/web/src/app/dashboard/learning/recommendations/page.tsx - UPDATED
'use client'

import { motion } from 'framer-motion'
import { 
  Brain, Zap, Target, Clock, Users, Download, CheckCircle,
  Star, TrendingUp, BookOpen, Video, Headphones, Code,
  Smartphone, Wifi, WifiOff, Languages, Award, Rocket,
  ArrowRight, Filter, Search, BarChart3, Heart, Shield,
  Globe, Battery, Leaf, Palette, Droplets, CloudRain,
  Activity, DollarSign, Truck, Sparkles
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { coursesDatabase, Course } from '@/lib/courses'

interface DNAAnswers {
  learningStyle: string
  informationProcessing: string
  memoryRetention: string
  problemSolving: string
  motivationType: string
  stressResponse: string
  confidenceLevel: string
  socialLearning: string
  studyEnvironment: string
  energyPatterns: string
  focusDuration: string
  techComfort: string
  deviceUsage: string
  internetStability: string
  offlineNeeds: string
}

export default function RecommendationsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [dnaAnswers, setDnaAnswers] = useState<DNAAnswers | null>(null)
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [topMatch, setTopMatch] = useState<Course | null>(null)
  const [learningProfile, setLearningProfile] = useState({
    style: '',
    pace: '',
    environment: '',
    strengths: [] as string[],
    challenges: [] as string[],
    recommendations: [] as string[]
  })
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Get unique categories
  const categories = ['all', ...new Set(coursesDatabase.flatMap(course => course.category))]

  useEffect(() => {
    // Load DNA answers from localStorage
    const savedDNA = localStorage.getItem('user_dna_answers')
    if (!savedDNA) {
      router.push('/dashboard/learning')
      return
    }

    const dnaData = JSON.parse(savedDNA)
    setDnaAnswers(dnaData)
    
    // Set all courses
    setAllCourses(coursesDatabase)
    
    // Analyze DNA and create learning profile
    const profile = analyzeDNAProfile(dnaData)
    setLearningProfile(profile)
    
    // Get course recommendations
    const recommendations = getRecommendations(dnaData)
    setRecommendedCourses(recommendations)
    setTopMatch(recommendations[0] || null)
    
    setLoading(false)
  }, [router])

  const analyzeDNAProfile = (dna: DNAAnswers) => {
    const profile = {
      style: '',
      pace: '',
      environment: '',
      strengths: [] as string[],
      challenges: [] as string[],
      recommendations: [] as string[]
    }

    // Determine learning style
    if (dna.learningStyle === 'visual') {
      profile.style = 'Visual Learner'
      profile.recommendations.push('You\'ll receive more visual content like diagrams and videos')
    } else if (dna.learningStyle === 'auditory') {
      profile.style = 'Auditory Learner'
      profile.recommendations.push('Audio explanations and discussions will be emphasized')
    } else if (dna.learningStyle === 'kinesthetic') {
      profile.style = 'Hands-on Learner'
      profile.recommendations.push('Practical exercises and projects will be prioritized')
    } else {
      profile.style = 'Reading/Writing Learner'
      profile.recommendations.push('Detailed notes and reading materials will be provided')
    }

    // Determine pace based on focus duration
    if (dna.focusDuration === 'short') {
      profile.pace = 'Micro-learning (15-30 minute sessions)'
      profile.recommendations.push('Lessons broken into bite-sized chunks for better focus')
    } else if (dna.focusDuration === 'medium') {
      profile.pace = 'Balanced (30-60 minute sessions)'
      profile.recommendations.push('Medium-length sessions with regular breaks')
    } else if (dna.focusDuration === 'long') {
      profile.pace = 'Deep Focus (1-2 hour sessions)'
      profile.recommendations.push('Longer, immersive learning sessions')
    } else {
      profile.pace = 'Extended Focus (2+ hour sessions)'
      profile.recommendations.push('Extended learning periods for complex topics')
    }

    // Determine environment preference
    if (dna.studyEnvironment === 'quiet') {
      profile.environment = 'Quiet, Private Space'
      profile.recommendations.push('Content optimized for distraction-free learning')
    } else if (dna.studyEnvironment === 'background') {
      profile.environment = 'Some Background Noise'
      profile.recommendations.push('Learning materials work well with ambient noise')
    } else if (dna.studyEnvironment === 'active') {
      profile.environment = 'Active Social Environment'
      profile.recommendations.push('Group activities and discussions included')
    } else {
      profile.environment = 'Outdoor/Natural Setting'
      profile.recommendations.push('Mobile-friendly content for outdoor learning')
    }

    // Identify strengths
    if (dna.confidenceLevel === 'very') {
      profile.strengths.push('High confidence with technology')
      profile.recommendations.push('You\'ll be challenged with advanced features early')
    }
    if (dna.problemSolving === 'creative') {
      profile.strengths.push('Creative problem-solving')
      profile.recommendations.push('Open-ended projects and creative challenges included')
    }
    if (dna.motivationType === 'achievement') {
      profile.strengths.push('Goal-oriented motivation')
      profile.recommendations.push('Clear milestones and achievement tracking provided')
    }
    if (dna.memoryRetention === 'association') {
      profile.strengths.push('Strong pattern recognition')
      profile.recommendations.push('Content connects new information to existing knowledge')
    }

    // Identify challenges
    if (dna.techComfort === 'learning') {
      profile.challenges.push('May need tech support initially')
      profile.recommendations.push('Extra technical guidance and simplified interfaces')
    }
    if (dna.internetStability === 'unstable' || dna.offlineNeeds === 'critical') {
      profile.challenges.push('Requires good offline options')
      profile.recommendations.push('All content available for download and offline use')
    }
    if (dna.confidenceLevel === 'nervous') {
      profile.challenges.push('Needs encouragement and small wins')
      profile.recommendations.push('Frequent positive feedback and gradual difficulty increase')
    }
    if (dna.focusDuration === 'short') {
      profile.challenges.push('Benefits from micro-learning')
      profile.recommendations.push('Short lessons with frequent review opportunities')
    }

    return profile
  }

  const getRecommendations = (dna: DNAAnswers): Course[] => {
    const scoredCourses = coursesDatabase.map(course => {
      let score = 0
      let reasons = []

      // Learning style match (25% weight)
      if (course.dnaMatch.learningStyle.includes(dna.learningStyle)) {
        score += 25
        reasons.push(`Matches your ${dna.learningStyle} learning style`)
      }

      // Motivation match (20% weight)
      if (course.dnaMatch.motivationType.includes(dna.motivationType)) {
        score += 20
        reasons.push(`Aligns with your ${dna.motivationType} motivation`)
      }

      // Environment match (15% weight)
      if (course.dnaMatch.environment.includes(dna.studyEnvironment)) {
        score += 15
        reasons.push(`Suits your preferred ${dna.studyEnvironment} environment`)
      }

      // Technical level match (15% weight)
      const techLevels = ['learning', 'basic', 'comfortable', 'expert']
      const userTechIndex = techLevels.indexOf(dna.techComfort)
      const courseTechIndex = course.dnaMatch.technical[0] ? 
        Math.max(...course.dnaMatch.technical.map(t => techLevels.indexOf(t))) : 0
        
      if (userTechIndex >= courseTechIndex - 1) {
        score += 15
        reasons.push(`Appropriate for your technical level`)
      }

      // Focus duration match (10% weight)
      if (course.dnaMatch.focusDuration.includes(dna.focusDuration)) {
        score += 10
        reasons.push(`Matches your ${dna.focusDuration} focus pattern`)
      }

      // Confidence level match (10% weight)
      if (course.dnaMatch.confidenceLevel.includes(dna.confidenceLevel)) {
        score += 10
        reasons.push(`Builds on your confidence level`)
      }

      // Bonus for offline availability
      if ((dna.internetStability === 'unstable' || dna.offlineNeeds === 'critical') && course.offlineAvailable) {
        score += 15
        reasons.push(`Available offline for your connectivity needs`)
      }

      // Adjust for device usage
      if (dna.deviceUsage === 'smartphone' && course.format.includes('mobile-friendly')) {
        score += 5
      }

      // Language bonus (if user prefers local language)
      if (course.language.includes('Hindi') || course.language.includes('Marathi') || course.language.includes('Tamil')) {
        score += 5
      }

      return {
        ...course,
        matchScore: Math.min(score, 100),
        reason: reasons.join('. ')
      }
    })

    // Sort by match score (descending) and return top 8
    return scoredCourses
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 8)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'advanced': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'agriculture': return <Leaf className="w-4 h-4" />
      case 'technology': return <Smartphone className="w-4 h-4" />
      case 'health': return <Activity className="w-4 h-4" />
      case 'business': return <DollarSign className="w-4 h-4" />
      case 'creative': return <Palette className="w-4 h-4" />
      case 'environment': return <Droplets className="w-4 h-4" />
      case 'safety': return <Shield className="w-4 h-4" />
      case 'leadership': return <Users className="w-4 h-4" />
      case 'essential': return <CheckCircle className="w-4 h-4" />
      case 'foundational': return <BookOpen className="w-4 h-4" />
      case 'sustainability': return <Leaf className="w-4 h-4" />
      case 'community': return <Users className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video': return <Video className="w-4 h-4" />
      case 'hands-on': return <Zap className="w-4 h-4" />
      case 'interactive': return <Target className="w-4 h-4" />
      case 'project': return <Code className="w-4 h-4" />
      case 'audio': return <Headphones className="w-4 h-4" />
      case 'quiz': return <Brain className="w-4 h-4" />
      case 'simulation': return <Globe className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const handleStartCourse = (courseId: string) => {
    localStorage.setItem('current_course', courseId)
    router.push(`/dashboard/learning/course/${courseId}`)
  }

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  const filteredCourses = selectedCategory === 'all' 
    ? recommendedCourses 
    : recommendedCourses.filter(course => course.category.includes(selectedCategory))

  const searchedCourses = searchQuery 
    ? filteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : filteredCourses

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Finding perfect courses for you...</p>
          <p className="text-gray-400 mt-2">Analyzing your DNA profile and matching with courses</p>
        </div>
      </div>
    )
  }

  if (!dnaAnswers) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">No DNA Analysis Found</h2>
          <p className="text-gray-400 mb-6">Please complete your AI Learner DNA analysis first</p>
          <button
            onClick={() => router.push('/dashboard/learning')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-bold hover:shadow-xl transition-all"
          >
            Start DNA Analysis
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6"
          >
            <Brain className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4">
            Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Personalized Learning Path
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8">
            Based on your unique AI Learner DNA, we've handpicked courses that match your 
            learning style, goals, and environment perfectly.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses by name, topic, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-2xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                {categories.slice(0, 10).map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Learning Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 md:mb-12"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-2">Your Learning Profile</h2>
                <p className="text-gray-300">AI-generated insights based on your DNA analysis</p>
              </div>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">AI-Powered Recommendations</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold">Learning Style</h3>
                </div>
                <p className="text-gray-300 text-sm">{learningProfile.style}</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold">Optimal Pace</h3>
                </div>
                <p className="text-gray-300 text-sm">{learningProfile.pace}</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold">Environment</h3>
                </div>
                <p className="text-gray-300 text-sm">{learningProfile.environment}</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Target className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold">Top Match Score</h3>
                </div>
                <p className="text-2xl font-bold text-yellow-400">
                  {topMatch ? `${topMatch.matchScore}%` : 'Calculating...'}
                </p>
              </div>
            </div>

            {/* Strengths & Recommendations */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-800/30 rounded-xl p-4">
                <h4 className="font-semibold text-green-400 mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Your Strengths
                </h4>
                <ul className="space-y-2">
                  {learningProfile.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-800/30 rounded-xl p-4">
                <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  AI Adaptations
                </h4>
                <ul className="space-y-2">
                  {learningProfile.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Sparkles className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Recommendation */}
        {topMatch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className={`px-3 py-1 rounded-full ${getDifficultyColor(topMatch.difficulty)} text-sm`}>
                      {topMatch.difficulty.toUpperCase()}
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{topMatch.rating}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {topMatch.learners.toLocaleString()} learners
                    </div>
                    <div className="text-gray-400 text-sm">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {topMatch.duration}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      #1 Match:
                    </span>{' '}
                    {topMatch.title}
                  </h2>
                  
                  <p className="text-gray-300 text-lg mb-4">{topMatch.subtitle}</p>
                  
                  <p className="text-gray-400 mb-6 max-w-3xl">
                    {topMatch.detailedDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {topMatch.tags.slice(0, 6).map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Course Features */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {topMatch.features.slice(0, 6).map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-xl p-6 lg:ml-6 lg:min-w-80 w-full lg:w-auto mt-6 lg:mt-0">
                  <div className="mb-6">
                    <div className="text-5xl font-black text-center text-yellow-400 mb-2">
                      {topMatch.matchScore}%
                    </div>
                    <div className="text-center text-gray-400">AI Match Score</div>
                    <div className="text-center text-sm text-gray-500 mt-1">
                      Based on {Object.keys(dnaAnswers).length} DNA factors
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {topMatch.duration} ({topMatch.totalLessons} lessons)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Instructor</span>
                      <span className="text-blue-400">{topMatch.instructor.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Certificate</span>
                      <span className={topMatch.certificate ? "text-green-400" : "text-gray-400"}>
                        {topMatch.certificate ? 'Available' : 'Not available'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Offline Access</span>
                      <span className={topMatch.offlineAvailable ? "text-green-400" : "text-gray-400"}>
                        {topMatch.offlineAvailable ? 'Available' : 'Online only'}
                      </span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStartCourse(topMatch.id)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl text-lg hover:shadow-xl transition-all mb-3"
                  >
                    Start Learning Now
                  </motion.button>
                  
                  <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download Course Syllabus
                  </button>
                </div>
              </div>
              
              {/* Why this matches */}
              <div className="mt-6 p-4 bg-gray-800/30 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">Why this matches your learning DNA:</h4>
                    <p className="text-gray-300">{topMatch.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* More Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                More Perfect Matches for You
              </h2>
              <p className="text-gray-400">
                {searchedCourses.length} courses matching your profile
              </p>
            </div>
            <div className="text-sm text-gray-400">
              Sorted by match score
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {searchedCourses.slice(0, 6).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty.toUpperCase()}
                      </div>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <Star className="w-3 h-3 fill-current mr-1" />
                        {course.rating}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.subtitle}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-800/50 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right ml-3">
                    <div className="text-2xl font-black text-yellow-400 mb-1">
                      {course.matchScore}%
                    </div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.totalLessons} lessons
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {(course.learners / 1000).toFixed(1)}K
                  </div>
                </div>
                
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStartCourse(course.id)}
                    className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl transition-all"
                  >
                    View Course Details
                  </motion.button>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      {course.offlineAvailable && (
                        <span className="flex items-center mr-3">
                          <Download className="w-3 h-3 mr-1" />
                          Offline
                        </span>
                      )}
                      {course.certificate && (
                        <span className="flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          Certificate
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {course.format.slice(0, 2).map((fmt, idx) => (
                        <div key={idx} className="ml-2">
                          {getFormatIcon(fmt)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show message if no courses match search */}
          {searchedCourses.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* All Courses Grid (If user wants to explore more) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Explore All Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coursesDatabase.slice(0, 8).map((course, index) => (
              <div key={course.id} className="bg-gray-800/30 rounded-xl p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-400">{course.weeks} weeks</div>
                </div>
                <h4 className="font-semibold mb-2 line-clamp-2">{course.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{course.category[0]}</span>
                  <span>{course.learners.toLocaleString().slice(0, 3)}K learners</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard/learning')}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl transition-all w-full sm:w-auto"
          >
            Re-take DNA Analysis
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoToDashboard}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transition-all w-full sm:w-auto flex items-center justify-center"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard/learning/courses')}
            className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-medium rounded-xl transition-all w-full sm:w-auto"
          >
            Browse All Courses
          </motion.button>
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-white/10 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="text-2xl font-bold text-purple-400">{coursesDatabase.length}</div>
              <div className="text-gray-400 text-sm">Total Courses</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">95%</div>
              <div className="text-gray-400 text-sm">Completion Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">50K+</div>
              <div className="text-gray-400 text-sm">Active Learners</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">24/7</div>
              <div className="text-gray-400 text-sm">AI Tutor Support</div>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm">
            🎯 Personalized learning • ⚡ Real-time adaptation • 🔒 Secure & private • 🌐 Multi-language support
          </p>
        </motion.div>
      </div>
    </div>
  )
}