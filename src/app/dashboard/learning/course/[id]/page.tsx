// apps/web/src/app/dashboard/learning/course/[id]/page.tsx - ENHANCED
'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Play, BookOpen, CheckCircle, Download, 
  Clock, Users, Star, Video, Headphones, FileText,
  Smartphone, WifiOff, Globe, Award, Target, Zap,
  MessageCircle, Share2, Bookmark, BarChart3, Heart,
  ChevronRight, ChevronDown, Calendar, Percent,
  Shield, Leaf, DollarSign, Users as UsersIcon,
  TrendingUp, RefreshCw, HelpCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getCourseById, Course } from '@/lib/courses'

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  type: 'video' | 'audio' | 'reading' | 'quiz' | 'project' | 'assignment'
  completed: boolean
  locked: boolean
  downloadUrl?: string
  points: number
  prerequisites?: string[]
  resources: string[]
}

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedModules, setExpandedModules] = useState<number[]>([0])
  const [bookmarked, setBookmarked] = useState(false)
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)

  useEffect(() => {
    const courseId = params.id as string
    const courseData = getCourseById(courseId)
    
    if (!courseData) {
      router.push('/dashboard/learning/recommendations')
      return
    }

    setCourse(courseData)
    
    // Generate detailed lessons
    const generatedLessons = generateLessons(courseData)
    setLessons(generatedLessons)
    
    // Check enrollment
    const enrollment = localStorage.getItem(`enrollment_${courseId}`)
    setEnrolled(!!enrollment)
    
    // Calculate progress
    const completedLessons = generatedLessons.filter(l => 
      localStorage.getItem(`completed_${courseId}_${l.id}`)
    ).length
    setProgress(Math.round((completedLessons / generatedLessons.length) * 100))
    
    // Check bookmark
    const bookmark = localStorage.getItem(`bookmark_${courseId}`)
    setBookmarked(!!bookmark)
    
    setLoading(false)
  }, [params.id, router])

  const generateLessons = (courseData: Course): Lesson[] => {
    const lessonTemplates = {
      beginner: [
        { type: 'video' as const, duration: '10-15 min', points: 10 },
        { type: 'reading' as const, duration: '8-12 min', points: 8 },
        { type: 'quiz' as const, duration: '5-8 min', points: 15 },
        { type: 'assignment' as const, duration: '15-20 min', points: 20 },
        { type: 'project' as const, duration: '25-30 min', points: 25 }
      ],
      intermediate: [
        { type: 'video' as const, duration: '15-20 min', points: 12 },
        { type: 'reading' as const, duration: '12-15 min', points: 10 },
        { type: 'quiz' as const, duration: '8-10 min', points: 18 },
        { type: 'assignment' as const, duration: '20-25 min', points: 25 },
        { type: 'project' as const, duration: '30-40 min', points: 30 }
      ],
      advanced: [
        { type: 'video' as const, duration: '20-25 min', points: 15 },
        { type: 'reading' as const, duration: '15-20 min', points: 12 },
        { type: 'quiz' as const, duration: '10-12 min', points: 20 },
        { type: 'assignment' as const, duration: '25-30 min', points: 30 },
        { type: 'project' as const, duration: '40-50 min', points: 35 }
      ]
    }

    const template = lessonTemplates[courseData.difficulty]
    const lessons: Lesson[] = []
    
    // Create modules (weeks)
    const modules = Array.from({ length: courseData.weeks }, (_, weekIndex) => {
      return {
        title: `Week ${weekIndex + 1}`,
        description: `Module ${weekIndex + 1}: ${getModuleDescription(courseData, weekIndex)}`,
        lessons: Array.from({ length: Math.ceil(courseData.totalLessons / courseData.weeks) }, (_, lessonIndex) => {
          const globalIndex = weekIndex * Math.ceil(courseData.totalLessons / courseData.weeks) + lessonIndex
          if (globalIndex >= courseData.totalLessons) return null
          
          const lessonType = template[globalIndex % template.length]
          return {
            id: `week${weekIndex + 1}_lesson${lessonIndex + 1}`,
            title: getLessonTitle(courseData, weekIndex, lessonIndex),
            description: getLessonDescription(courseData, weekIndex, lessonIndex),
            duration: lessonType.duration,
            type: lessonType.type,
            completed: !!localStorage.getItem(`completed_${courseData.id}_week${weekIndex + 1}_lesson${lessonIndex + 1}`),
            locked: !enrolled || globalIndex > 0,
            points: lessonType.points,
            resources: getLessonResources(courseData, weekIndex, lessonIndex)
          }
        }).filter(Boolean) as Lesson[]
      }
    })

    return lessons.concat(...modules.map(m => m.lessons))
  }

  const getModuleDescription = (course: Course, weekIndex: number): string => {
    const descriptions = {
      'Mobile-First Digital Literacy': [
        'Smartphone Basics & Navigation',
        'Essential Apps & Internet Safety',
        'Advanced Features & Troubleshooting'
      ],
      'Smart Farming with Agri-Tech': [
        'Introduction to Agri-Tech Tools',
        'Crop Monitoring & Weather Apps',
        'Market Connectivity & Data Analysis'
      ],
      'E-commerce for Rural Entrepreneurs': [
        'Setting Up Online Store',
        'Product Photography & Listing',
        'Marketing & Customer Service'
      ]
    }
    
    return descriptions[course.title as keyof typeof descriptions]?.[weekIndex] || `Module ${weekIndex + 1} Content`
  }

  const getLessonTitle = (course: Course, weekIndex: number, lessonIndex: number): string => {
    const titles = {
      video: ['Introduction', 'Deep Dive', 'Advanced Concepts', 'Case Study', 'Expert Interview'],
      reading: ['Overview', 'Detailed Guide', 'Reference Material', 'Study Notes', 'Supplementary Reading'],
      quiz: ['Knowledge Check', 'Skill Assessment', 'Progress Test', 'Final Quiz', 'Practice Exam'],
      assignment: ['Hands-on Exercise', 'Practical Task', 'Project Work', 'Real-world Application', 'Skill Challenge'],
      project: ['Mini Project', 'Capstone Project', 'Portfolio Piece', 'Community Project', 'Final Submission']
    }
    
    return `${titles.video[lessonIndex % titles.video.length]}: ${course.title.split(' ')[0]} ${weekIndex + 1}.${lessonIndex + 1}`
  }

  const getLessonDescription = (course: Course, weekIndex: number, lessonIndex: number): string => {
    return `Learn ${course.title.toLowerCase()} concepts through ${['video tutorials', 'interactive readings', 'assessment quizzes', 'practical assignments', 'hands-on projects'][lessonIndex % 5]}.`
  }

  const getLessonResources = (course: Course, weekIndex: number, lessonIndex: number): string[] => {
    return [
      'Downloadable PDF Guide',
      'Video Transcript',
      'Practice Exercises',
      'Additional Reading',
      'Community Discussion'
    ].slice(0, 3)
  }

  const handleEnroll = () => {
    if (!course) return
    
    setEnrolled(true)
    localStorage.setItem(`enrollment_${course.id}`, JSON.stringify({
      enrolledAt: new Date().toISOString(),
      userId: user?.id
    }))
    
    // Unlock first lesson
    const firstLesson = lessons[0]
    if (firstLesson) {
      localStorage.setItem(`unlocked_${course.id}_${firstLesson.id}`, 'true')
    }
    
    setShowEnrollmentModal(false)
  }

  const handleStartLesson = (lessonId: string) => {
    if (!course || !enrolled) {
      setShowEnrollmentModal(true)
      return
    }
    
    // Unlock this lesson
    localStorage.setItem(`unlocked_${course.id}_${lessonId}`, 'true')
    
    // Navigate to lesson
    router.push(`/dashboard/learning/course/${course.id}/lesson/${lessonId}`)
  }

  const toggleModule = (index: number) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handleBookmark = () => {
    if (!course) return
    
    setBookmarked(!bookmarked)
    if (!bookmarked) {
      localStorage.setItem(`bookmark_${course.id}`, 'true')
    } else {
      localStorage.removeItem(`bookmark_${course.id}`)
    }
  }

  const handleShare = () => {
    if (!course) return
    
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Course link copied to clipboard!')
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5 text-blue-400" />
      case 'audio': return <Headphones className="w-5 h-5 text-green-400" />
      case 'reading': return <BookOpen className="w-5 h-5 text-purple-400" />
      case 'quiz': return <Target className="w-5 h-5 text-yellow-400" />
      case 'project': return <Award className="w-5 h-5 text-red-400" />
      case 'assignment': return <FileText className="w-5 h-5 text-cyan-400" />
      default: return <Play className="w-5 h-5 text-gray-400" />
    }
  }

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-500/20 text-blue-400'
      case 'audio': return 'bg-green-500/20 text-green-400'
      case 'reading': return 'bg-purple-500/20 text-purple-400'
      case 'quiz': return 'bg-yellow-500/20 text-yellow-400'
      case 'project': return 'bg-red-500/20 text-red-400'
      case 'assignment': return 'bg-cyan-500/20 text-cyan-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Course not found</h2>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Recommendations
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-lg ${bookmarked ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700'}`}
              >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-gray-700"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  {course.difficulty.toUpperCase()}
                </span>
                <span className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  {course.rating}
                </span>
                <span className="text-gray-400">
                  {course.learners.toLocaleString()} learners
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {course.title}
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                {course.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {course.tags.slice(0, 5).map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2" />
                  <span>{(course.learners / 1000).toFixed(1)}K enrolled</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-96">
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-yellow-400 mb-2">
                    {progress}%
                  </div>
                  <div className="text-gray-400">Your Progress</div>
                  <div className="w-full h-2 bg-gray-800 rounded-full mt-2">
                    <div 
                      className="h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {course.duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Lessons</span>
                    <span>
                      {lessons.filter(l => l.completed).length} / {lessons.length} completed
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Certificate</span>
                    <span className={course.certificate ? "text-green-400" : "text-gray-400"}>
                      {course.certificate ? 'Available' : 'Not available'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Language</span>
                    <span>{course.language.slice(0, 2).join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Updated</span>
                    <span>{course.updated}</span>
                  </div>
                </div>
                
                {enrolled ? (
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const nextLesson = lessons.find(l => !l.completed && !l.locked) || lessons[0]
                        if (nextLesson) handleStartLesson(nextLesson.id)
                      }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl text-lg hover:shadow-xl transition-all"
                    >
                      {progress === 0 ? 'Start Learning' : progress === 100 ? 'Review Course' : 'Continue Learning'}
                    </motion.button>
                    
                    <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      Download All Materials
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEnrollmentModal(true)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl text-lg hover:shadow-xl transition-all"
                  >
                    Enroll Now - Free
                  </motion.button>
                )}
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  🔒 100% secure • 💯 Free access • 📱 Mobile friendly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {['overview', 'curriculum', 'instructor', 'reviews', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">Course Description</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg mb-6">{course.detailedDescription}</p>
                  
                  <h3 className="text-xl font-bold mb-4 text-green-400">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-gray-800/30 rounded-xl p-4">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-purple-400">Course Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Instructor Card */}
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">Instructor</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${course.instructor.avatarColor} rounded-full`}></div>
                  <div>
                    <h4 className="font-bold text-lg">{course.instructor.name}</h4>
                    <p className="text-gray-400 text-sm">{course.instructor.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{course.instructor.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {course.instructor.expertise.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700/50 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Prerequisites */}
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Prerequisites</h3>
                <ul className="space-y-3">
                  {course.prerequisites.map((req, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Course Stats */}
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Course Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Completion Rate</span>
                    <span className="text-green-400">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Avg. Time to Complete</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Certificate Rate</span>
                    <span className="text-purple-400">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Student Satisfaction</span>
                    <span className="text-yellow-400">{course.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'curriculum' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-400">Course Curriculum</h2>
              <div className="text-gray-400">
                {lessons.length} lessons • {course.totalLessons} total
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Generate modules/weeks */}
              {Array.from({ length: course.weeks }, (_, weekIndex) => {
                const weekLessons = lessons.slice(
                  weekIndex * Math.ceil(course.totalLessons / course.weeks),
                  (weekIndex + 1) * Math.ceil(course.totalLessons / course.weeks)
                )
                const completedWeekLessons = weekLessons.filter(l => l.completed).length
                const weekProgress = weekLessons.length > 0 
                  ? Math.round((completedWeekLessons / weekLessons.length) * 100)
                  : 0
                
                return (
                  <div key={weekIndex} className="bg-gray-800/30 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleModule(weekIndex)}
                      className="w-full p-6 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          expandedModules.includes(weekIndex) ? 'bg-purple-500/20' : 'bg-gray-700/50'
                        }`}>
                          {expandedModules.includes(weekIndex) ? (
                            <ChevronDown className="w-5 h-5 text-purple-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg">Week {weekIndex + 1}</h3>
                          <p className="text-gray-400 text-sm">
                            {getModuleDescription(course, weekIndex)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-400">
                            {completedWeekLessons}/{weekLessons.length} lessons
                          </div>
                          <div className="w-32 h-2 bg-gray-700 rounded-full">
                            <div 
                              className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                              style={{ width: `${weekProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </button>
                    
                    {expandedModules.includes(weekIndex) && (
                      <div className="px-6 pb-6">
                        <div className="space-y-3">
                          {weekLessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className={`p-4 rounded-xl border ${
                                lesson.locked 
                                  ? 'border-gray-700 bg-gray-900/30' 
                                  : 'border-white/10 bg-gray-800/30 hover:border-purple-500/50'
                              } transition-all`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    lesson.locked ? 'bg-gray-800' : 'bg-purple-500/20'
                                  }`}>
                                    {getLessonIcon(lesson.type)}
                                  </div>
                                  
                                  <div>
                                    <div className="flex items-center space-x-3">
                                      <h3 className="font-semibold">{lesson.title}</h3>
                                      {lesson.completed && (
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-400">{lesson.description}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <div className="flex items-center space-x-2">
                                      <span className={`px-2 py-1 rounded-full text-xs ${getLessonTypeColor(lesson.type)}`}>
                                        {lesson.type.toUpperCase()}
                                      </span>
                                      <span className="text-gray-400 text-sm">{lesson.duration}</span>
                                      <span className="text-yellow-400 text-sm">{lesson.points} pts</span>
                                    </div>
                                    {lesson.locked ? (
                                      <div className="px-3 py-1 bg-gray-800 rounded-full text-sm mt-2">
                                        {enrolled ? 'Locked' : 'Enroll to access'}
                                      </div>
                                    ) : (
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleStartLesson(lesson.id)}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg transition-all mt-2"
                                      >
                                        {lesson.completed ? 'Review' : 'Start'}
                                      </motion.button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {lesson.resources.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                  <h4 className="text-sm font-medium text-gray-400 mb-2">Resources:</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {lesson.resources.map((resource, idx) => (
                                      <span key={idx} className="px-3 py-1 bg-gray-800/50 rounded-full text-xs">
                                        {resource}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {activeTab === 'instructor' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-800/30 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                  <div className={`w-24 h-24 bg-gradient-to-r ${course.instructor.avatarColor} rounded-2xl`}></div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{course.instructor.name}</h2>
                    <p className="text-xl text-gray-300 mb-4">{course.instructor.role}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                        <span className="text-lg">4.9/5</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-400 mr-1" />
                        <span className="text-lg">50K+ students</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 text-green-400 mr-1" />
                        <span className="text-lg">15 courses</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">About the Instructor</h3>
                  <p className="text-gray-300 text-lg mb-6">{course.instructor.bio}</p>
                  
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Expertise</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {course.instructor.expertise.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-gray-800/50 rounded-xl p-4">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Teaching Philosophy</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Heart className="w-5 h-5 text-pink-400 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Student-Centered Approach</h4>
                        <p className="text-gray-300">Focus on practical, real-world applications that students can immediately use.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Target className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Clear Learning Paths</h4>
                        <p className="text-gray-300">Structured progression from basics to advanced concepts.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="w-5 h-5 text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1">Interactive Learning</h4>
                        <p className="text-gray-300">Emphasis on engagement through discussions, projects, and community.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Instructor Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total Students</span>
                    <span className="text-2xl font-bold">50,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Courses Created</span>
                    <span className="text-2xl font-bold">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Avg. Rating</span>
                    <span className="text-2xl font-bold text-yellow-400">4.9/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Reviews</span>
                    <span className="text-2xl font-bold">10,500+</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">Other Courses</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 cursor-pointer">
                    <h4 className="font-medium mb-1">Advanced Digital Marketing</h4>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>4.8 ★</span>
                      <span>8,500 students</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 cursor-pointer">
                    <h4 className="font-medium mb-1">Rural Entrepreneurship</h4>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>4.9 ★</span>
                      <span>12,000 students</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 cursor-pointer">
                    <h4 className="font-medium mb-1">Community Leadership</h4>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>4.7 ★</span>
                      <span>6,800 students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-blue-400">Student Reviews</h2>
                <p className="text-gray-400">What learners are saying about this course</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">{course.rating}</div>
                <div className="flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                  ))}
                </div>
                <p className="text-gray-400 text-sm mt-1">Based on {Math.floor(course.learners / 10)} reviews</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Review stats */}
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">Rating Breakdown</h3>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center w-16">
                      <span className="text-gray-400 mr-2">{stars}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-yellow-500 rounded-full"
                        style={{ width: `${(stars === 5 ? 75 : stars === 4 ? 15 : stars === 3 ? 7 : stars === 2 ? 2 : 1)}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-sm w-12">
                      {stars === 5 ? '75%' : stars === 4 ? '15%' : stars === 3 ? '7%' : stars === 2 ? '2%' : '1%'}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Review highlights */}
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-400">What Students Liked</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Practical Content</h4>
                      <p className="text-gray-400 text-sm">94% found the lessons immediately applicable</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Clear Instructions</h4>
                      <p className="text-gray-400 text-sm">89% appreciated step-by-step guidance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Supportive Community</h4>
                      <p className="text-gray-400 text-sm">92% benefited from peer learning</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Mobile Friendly</h4>
                      <p className="text-gray-400 text-sm">96% could learn on their smartphones</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sample Reviews */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Rahul Sharma', role: 'Farmer from Punjab', rating: 5, comment: 'This course transformed how I manage my farm. The weather prediction app alone saved my crops from unexpected rain.' },
                { name: 'Priya Patel', role: 'Small Business Owner', rating: 5, comment: 'Started selling my handicrafts online after this course. Made ₹50,000 in first month!' },
                { name: 'Arun Kumar', role: 'Village Teacher', rating: 4, comment: 'Excellent for beginners. Teaching my students with these materials now.' },
                { name: 'Meena Devi', role: 'Homemaker', rating: 5, comment: 'Learned to use smartphone for family health tracking. Telemedicine consultations saved us hospital trips.' },
                { name: 'Suresh Yadav', role: 'Electrician', rating: 4, comment: 'Solar installation skills helped me start new business. Government subsidy guidance was very helpful.' },
                { name: 'Anjali Singh', role: 'College Student', rating: 5, comment: 'Perfect for rural youth. Got internship based on skills learned here.' }
              ].map((review, index) => (
                <div key={index} className="bg-gray-800/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <p className="text-gray-400 text-sm">{review.role}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    {['2 days ago', '1 week ago', '2 weeks ago', '1 month ago', '2 months ago', '3 months ago'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'faq' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Do I need any prior experience for this course?',
                    a: `No prior experience is needed. This course is designed for complete beginners. We start from the very basics and gradually build up your skills. The only requirement is willingness to learn.`
                  },
                  {
                    q: 'What equipment do I need?',
                    a: `A smartphone with internet access is sufficient for most lessons. Some courses may benefit from additional tools, but we always provide alternative methods if you don't have access to specific equipment.`
                  },
                  {
                    q: 'Is the course really free?',
                    a: `Yes, all courses on Dream2Skill AI are completely free. We believe education should be accessible to everyone, regardless of financial background.`
                  },
                  {
                    q: 'How long do I have access to the course materials?',
                    a: `Lifetime access! Once enrolled, you can access the course materials anytime, anywhere. All updates and new content are also included.`
                  },
                  {
                    q: 'Can I learn offline?',
                    a: `Yes! Most courses offer downloadable materials for offline learning. Look for the download icon next to lessons for offline access.`
                  },
                  {
                    q: 'Will I get a certificate?',
                    a: `Yes, upon successful completion of all lessons and assessments, you'll receive a digital certificate that you can share with employers or on social media.`
                  },
                  {
                    q: 'What if I have questions during the course?',
                    a: `You can ask questions in the community forum, and our AI tutor is available 24/7 to help. For complex issues, our human instructors respond within 24 hours.`
                  },
                  {
                    q: 'Is this course available in my local language?',
                    a: `Most courses are available in Hindi, English, and several regional languages. Check the course details for specific language availability.`
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-gray-800/30 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-3 text-gray-200">{faq.q}</h3>
                    <p className="text-gray-300">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">Still have questions?</h3>
                <p className="text-gray-300 mb-6">Our support team is here to help you</p>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl font-medium hover:shadow-lg transition-all mb-3">
                  <MessageCircle className="w-5 h-5 inline mr-2" />
                  Chat with AI Tutor
                </button>
                <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all">
                  <HelpCircle className="w-5 h-5 inline mr-2" />
                  Visit Help Center
                </button>
              </div>
              
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-400">Course Success Stories</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-bold">Average Income Increase</h4>
                        <p className="text-2xl text-green-400">₹15,000/month</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">For learners who complete the course</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold">Community Impact</h4>
                        <p className="text-2xl text-blue-400">85%</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">Teach skills to 5+ community members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
      {showEnrollmentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl p-6 md:p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Enroll in {course.title}</h3>
              <p className="text-gray-400">Start your learning journey today!</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                <span className="text-gray-400">Course Access</span>
                <span className="text-green-400 font-bold">Lifetime</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                <span className="text-gray-400">Certificate</span>
                <span className="text-green-400 font-bold">Included</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                <span className="text-gray-400">Cost</span>
                <span className="text-green-400 font-bold">FREE</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnroll}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl text-lg hover:shadow-xl transition-all"
              >
                Enroll Now - Start Learning
              </motion.button>
              
              <button
                onClick={() => setShowEnrollmentModal(false)}
                className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
              >
                Maybe Later
              </button>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-4">
              🔒 100% secure enrollment • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/dashboard/learning/recommendations')}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              More Courses
            </button>
            {enrolled && (
              <button
                onClick={() => {
                  const nextLesson = lessons.find(l => !l.completed && !l.locked) || lessons[0]
                  if (nextLesson) handleStartLesson(nextLesson.id)
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                {progress === 100 ? 'Review Course' : 'Continue Learning'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}