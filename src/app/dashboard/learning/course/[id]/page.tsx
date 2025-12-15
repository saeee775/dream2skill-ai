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
  TrendingUp, RefreshCw, HelpCircle, Brain, Timer,
  Rabbit, Turtle, Gauge, Repeat, Layers, Sparkles,
  Puzzle, X, Send
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { coursesDatabase } from '@/lib/courses'
import AITutor from '@/components/AITutor'

interface PersonalizedSettings {
  pace: 'slowPaced' | 'averagePaced' | 'fastPaced';
  estimatedCompletionTime: string;
  dnaMatchScore: number;
  learningPlan: {
    weeklySchedule: string[];
    studyTips: string[];
    difficultyAdjustments: string[];
  };
  userDNA: any;
}

interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  actualDuration: number
  type: 'video' | 'audio' | 'reading' | 'quiz' | 'project' | 'assignment'
  completed: boolean
  locked: boolean
  downloadUrl?: string
  points: number
  prerequisites?: string[]
  resources: string[]
  personalizedNotes?: string
  extraExamples?: number
  repetitionCount?: number
  breaksRecommended?: number
}

interface Course {
  id: string;
  title: string;
  description: string;
  subtitle: string;
  category: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons?: number;
  learners?: number;
  enrolled?: number;
  rating: number;
  tags: string[];
  learningOutcomes?: string[];
  dnaCompatibility?: {
    learningStyles?: string[];
    difficultyLevels?: string[];
    focusDurations?: string[];
    revisionNeeds?: string[];
    motivationTypes?: string[];
  };
  lessonVariants?: {
    slowPaced?: {
      lessonDuration: number;
      examplesPerConcept: number;
      repetitionCount: number;
      breaks: number;
    };
    averagePaced?: {
      lessonDuration: number;
      examplesPerConcept: number;
      repetitionCount: number;
      breaks: number;
    };
    fastPaced?: {
      lessonDuration: number;
      examplesPerConcept: number;
      repetitionCount: number;
      breaks: number;
    };
  };
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
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
  const [personalizedSettings, setPersonalizedSettings] = useState<PersonalizedSettings | null>(null)
  
  // AI Tutor State
  const [showAITutor, setShowAITutor] = useState(false)
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste! I\'m your AI Tutor. I can help explain concepts, answer questions about this course, and provide personalized learning tips based on your DNA profile. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Helper function to safely get enrolled count
  const getEnrolledCount = () => {
    if (!course) return '1,000';
    
    // Try learners first, then enrolled, then default
    if (course.learners !== undefined) {
      return course.learners.toLocaleString();
    }
    if (course.enrolled !== undefined) {
      return course.enrolled.toLocaleString();
    }
    return '1,000'; // Default fallback
  };

  useEffect(() => {
    const courseId = params.id as string
    const courseData = coursesDatabase.find(c => c.id === courseId) as Course | undefined
    
    if (!courseData) {
      router.push('/dashboard/learning/recommendations')
      return
    }

    setCourse(courseData)
    
    // Get enrollment and personalization data
    const enrollment = localStorage.getItem(`enrollment_${courseId}`)
    if (enrollment) {
      setEnrolled(true)
      try {
        const enrollmentData = JSON.parse(enrollment)
        setPersonalizedSettings(enrollmentData.personalizedSettings)
      } catch (error) {
        console.error('Error parsing enrollment data:', error)
      }
    }
    
    // Get DNA data for personalization
    const dnaData = localStorage.getItem('user_dna_answers')
    const userDNA = dnaData ? JSON.parse(dnaData) : {}
    
    // Create personalized settings if not already enrolled
    if (!enrollment && courseData) {
      const pace = determinePace(userDNA)
      const dnaMatchScore = calculateDNAScore(userDNA, courseData)
      const estimatedCompletionTime = calculateEstimatedTime(courseData, pace)
      const learningPlan = createLearningPlan(userDNA, courseData, pace)
      
      const settings: PersonalizedSettings = {
        pace,
        estimatedCompletionTime,
        dnaMatchScore,
        learningPlan,
        userDNA
      }
      
      setPersonalizedSettings(settings)
    }
    
    // Generate personalized lessons
    const generatedLessons = generatePersonalizedLessons(courseData, personalizedSettings || 
      (enrollment ? JSON.parse(enrollment).personalizedSettings : null)
    )
    setLessons(generatedLessons)
    
    // Calculate progress
    const completedLessons = generatedLessons.filter(l => 
      localStorage.getItem(`completed_${courseId}_${l.id}`)
    ).length
    setProgress(generatedLessons.length > 0 ? Math.round((completedLessons / generatedLessons.length) * 100) : 0)
    
    // Check bookmark
    const bookmark = localStorage.getItem(`bookmark_${courseId}`)
    setBookmarked(!!bookmark)
    
    setLoading(false)
  }, [params.id, router])

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [aiMessages, isTyping])

  const determinePace = (userDNA: any): 'slowPaced' | 'averagePaced' | 'fastPaced' => {
    if (userDNA.learningSpeed === 'slow' || userDNA.learningSpeed === 'very_slow') {
      return 'slowPaced'
    } else if (userDNA.learningSpeed === 'fast' || userDNA.learningSpeed === 'very_fast') {
      return 'fastPaced'
    }
    return 'averagePaced'
  }

  const calculateDNAScore = (userDNA: any, courseData: Course): number => {
    let score = 0
    const maxScore = 100
    
    if (!userDNA || Object.keys(userDNA).length === 0) {
      return 75
    }
    
    // Learning Style Match
    if (userDNA.learningStyle) {
      const styleMapping: Record<string, number> = {
        'visual': courseData.tags?.some(tag => 
          ['video', 'visual', 'diagram', 'chart'].some(keyword => 
            tag.toLowerCase().includes(keyword)
          )
        ) ? 25 : 15,
        'auditory': courseData.tags?.some(tag => 
          ['audio', 'listening', 'podcast', 'discussion'].some(keyword => 
            tag.toLowerCase().includes(keyword)
          )
        ) ? 25 : 15,
        'kinesthetic': courseData.tags?.some(tag => 
          ['hands-on', 'practice', 'project', 'exercise', 'workshop'].some(keyword => 
            tag.toLowerCase().includes(keyword)
          )
        ) ? 25 : 15,
        'reading': courseData.tags?.some(tag => 
          ['reading', 'text', 'notes', 'documentation'].some(keyword => 
            tag.toLowerCase().includes(keyword)
          )
        ) ? 25 : 15
      }
      score += styleMapping[userDNA.learningStyle] || 15
    } else {
      score += 15
    }
    
    // Learning Speed & Difficulty Match
    if (userDNA.learningSpeed) {
      const speedDifficultyMapping: Record<string, Record<string, number>> = {
        'very_slow': { 'beginner': 25, 'intermediate': 15, 'advanced': 5 },
        'slow': { 'beginner': 25, 'intermediate': 20, 'advanced': 10 },
        'average': { 'beginner': 20, 'intermediate': 25, 'advanced': 15 },
        'fast': { 'beginner': 15, 'intermediate': 25, 'advanced': 20 },
        'very_fast': { 'beginner': 10, 'intermediate': 20, 'advanced': 25 }
      }
      const mapping = speedDifficultyMapping[userDNA.learningSpeed]
      if (mapping && mapping[courseData.difficulty]) {
        score += mapping[courseData.difficulty]
      } else {
        score += 15
      }
    } else {
      score += 15
    }
    
    // Focus Duration Compatibility
    if (userDNA.focusDuration) {
      const hasPracticalContent = courseData.tags?.some(tag => 
        ['hands-on', 'practice', 'workshop', 'project', 'exercise', 'assignment'].some(keyword => 
          tag.toLowerCase().includes(keyword)
        )
      )
      if (hasPracticalContent) {
        score += 20
      } else if (userDNA.focusDuration === 'short' && courseData.tags?.some(tag => 
        ['micro-learning', 'quick', 'short', 'brief'].some(keyword => 
          tag.toLowerCase().includes(keyword)
        )
      )) {
        score += 20
      } else if (userDNA.focusDuration === 'extended' && courseData.difficulty === 'advanced') {
        score += 20
      } else {
        score += 15
      }
    } else {
      score += 15
    }
    
    // Motivation & Course Category Match
    if (userDNA.motivationType) {
      const motivationCategoryMapping: Record<string, string[]> = {
        'achievement': ['technology', 'business', 'certification', 'career', 'advanced', 'professional'],
        'curiosity': ['exploration', 'creative', 'innovation', 'discovery', 'new', 'emerging'],
        'social': ['community', 'collaboration', 'leadership', 'networking', 'group', 'team'],
        'practical': ['agriculture', 'health', 'sustainability', 'environment', 'essential', 'daily', 'basic']
      }
      const targetCategories = motivationCategoryMapping[userDNA.motivationType] || []
      const courseCategories = courseData.category?.map(c => c.toLowerCase()) || []
      const hasMatch = targetCategories.some(targetCat => 
        courseCategories.some(courseCat => 
          courseCat.toLowerCase().includes(targetCat.toLowerCase())
        )
      )
      score += hasMatch ? 20 : 10
    } else {
      score += 10
    }
    
    // Confidence Level & Course Difficulty
    if (userDNA.confidenceLevel) {
      const confidenceMapping: Record<string, string[]> = {
        'nervous': ['beginner'],
        'cautious': ['beginner', 'intermediate'],
        'moderate': ['intermediate'],
        'very': ['intermediate', 'advanced']
      }
      const suitableLevels = confidenceMapping[userDNA.confidenceLevel] || ['beginner', 'intermediate']
      score += suitableLevels.includes(courseData.difficulty) ? 10 : 5
    } else {
      score += 5
    }
    
    return Math.max(70, Math.min(95, score))
  }

  const calculateEstimatedTime = (courseData: Course, pace: string): string => {
    const durationMatch = courseData.duration.match(/(\d+)/)
    const baseWeeks = durationMatch ? parseInt(durationMatch[1]) : 4
    
    let multiplier = 1
    if (pace === 'slowPaced') {
      multiplier = 1.5
    } else if (pace === 'fastPaced') {
      multiplier = 0.75
    }
    
    const estimatedWeeks = Math.ceil(baseWeeks * multiplier)
    return `${estimatedWeeks} week${estimatedWeeks !== 1 ? 's' : ''}`
  }

  const createLearningPlan = (userDNA: any, courseData: Course, pace: string) => {
    const weeklySchedule = []
    const studyTips = []
    const difficultyAdjustments = []
    
    const variant = courseData.lessonVariants?.[pace as keyof typeof courseData.lessonVariants] || 
                   courseData.lessonVariants?.averagePaced
    
    if (pace === 'slowPaced') {
      weeklySchedule.push(
        `📅 ${variant?.lessonDuration || 20}-minute lessons`,
        `⏸️ Take ${variant?.breaks || 2} breaks during each session`,
        `🔄 Review concepts ${variant?.repetitionCount || 3} times`,
        `📚 Study 3-4 days per week`
      )
    } else if (pace === 'averagePaced') {
      weeklySchedule.push(
        `📅 ${variant?.lessonDuration || 30}-minute lessons`,
        `⏸️ Take ${variant?.breaks || 1} break during each session`,
        `🔄 Review concepts ${variant?.repetitionCount || 2} times`,
        `📚 Study 4-5 days per week`
      )
    } else {
      weeklySchedule.push(
        `📅 ${variant?.lessonDuration || 45}-minute lessons`,
        `⚡ Intensive learning sessions`,
        `🔄 Review concepts ${variant?.repetitionCount || 1} time`,
        `📚 Study 5-6 days per week`
      )
    }
    
    if (userDNA.learningStyle === 'visual') {
      studyTips.push('👀 Watch all video demonstrations carefully', '📊 Use diagrams and charts for better understanding')
    } else if (userDNA.learningStyle === 'auditory') {
      studyTips.push('👂 Listen to audio explanations multiple times', '💬 Discuss concepts with study partners')
    } else if (userDNA.learningStyle === 'kinesthetic') {
      studyTips.push('🛠️ Practice all hands-on exercises', '🔧 Try the practical assignments immediately')
    }
    
    if (userDNA.learningSpeed === 'slow' || userDNA.learningSpeed === 'very_slow') {
      studyTips.push('🐢 Don\'t rush - take your time with each concept', '📝 Take detailed notes for better retention')
    }
    
    if (userDNA.learningSpeed === 'slow' || userDNA.learningSpeed === 'very_slow') {
      difficultyAdjustments.push('🐢 Extra examples provided for difficult concepts', '📝 Step-by-step breakdown of complex topics', '🔄 Additional practice exercises')
    } else if (userDNA.learningSpeed === 'fast' || userDNA.learningSpeed === 'very_fast') {
      difficultyAdjustments.push('⚡ Advanced challenges included', '🚀 Bonus materials for quick learners', '💡 Deep-dive into advanced topics')
    }
    
    if (userDNA.revisionNeeds === 'always' || userDNA.revisionNeeds === 'frequently') {
      difficultyAdjustments.push('🔄 Spaced repetition system activated', '📖 Frequent revision quizzes', '🎯 Memory reinforcement exercises')
    }
    
    return { weeklySchedule, studyTips, difficultyAdjustments }
  }

  const generatePersonalizedLessons = (courseData: Course, settings: PersonalizedSettings | null): Lesson[] => {
    const baseDuration = 30
    let lessonDuration = baseDuration
    let examplesPerConcept = 3
    let repetitionCount = 1
    let breaksRecommended = 0
    
    if (settings) {
      const variant = courseData.lessonVariants?.[settings.pace as keyof typeof courseData.lessonVariants] || 
                     courseData.lessonVariants?.averagePaced
      if (variant) {
        lessonDuration = variant.lessonDuration
        examplesPerConcept = variant.examplesPerConcept
        repetitionCount = variant.repetitionCount
        breaksRecommended = variant.breaks
      }
    }
    
    const lessonTypes = ['video', 'reading', 'quiz', 'assignment', 'project'] as const
    const lessons: Lesson[] = []
    const totalLessons = courseData.lessons || 10
    
    for (let i = 0; i < totalLessons; i++) {
      const lessonType = lessonTypes[i % lessonTypes.length]
      const userDNA = settings?.userDNA || {}
      const isSlowLearner = userDNA?.learningSpeed === 'slow' || userDNA?.learningSpeed === 'very_slow'
      const isFastLearner = userDNA?.learningSpeed === 'fast' || userDNA?.learningSpeed === 'very_fast'
      
      let personalizedDuration = lessonDuration
      let personalizedExamples = examplesPerConcept
      let personalizedRepetition = repetitionCount
      let personalizedBreaks = breaksRecommended
      let personalizedNotes = ''
      
      if (isSlowLearner) {
        personalizedDuration = Math.round(lessonDuration * 1.3)
        personalizedExamples = Math.min(6, examplesPerConcept + 2)
        personalizedRepetition = Math.min(3, repetitionCount + 1)
        personalizedBreaks = Math.min(3, breaksRecommended + 1)
        personalizedNotes = 'Take your time with this lesson. Extra examples and repetition are included for better understanding.'
      } else if (isFastLearner) {
        personalizedDuration = Math.round(lessonDuration * 0.8)
        personalizedExamples = Math.max(1, examplesPerConcept - 1)
        personalizedRepetition = Math.max(1, repetitionCount)
        personalizedBreaks = Math.max(0, breaksRecommended - 1)
        personalizedNotes = 'Accelerated pace for fast learners. Includes advanced challenges.'
      }
      
      if (userDNA?.focusDuration === 'short') {
        personalizedDuration = Math.min(25, personalizedDuration)
        personalizedBreaks = Math.max(2, personalizedBreaks)
      } else if (userDNA?.focusDuration === 'extended') {
        personalizedDuration = Math.max(45, personalizedDuration)
      }
      
      lessons.push({
        id: `lesson_${i + 1}`,
        title: getLessonTitle(courseData, i, lessonType),
        description: getLessonDescription(courseData, i, lessonType, userDNA),
        duration: lessonDuration,
        actualDuration: personalizedDuration,
        type: lessonType,
        completed: !!localStorage.getItem(`completed_${courseData.id}_lesson_${i + 1}`),
        locked: !enrolled || i > 0,
        points: calculatePoints(i, userDNA),
        resources: getLessonResources(courseData, i, userDNA),
        personalizedNotes,
        extraExamples: personalizedExamples,
        repetitionCount: personalizedRepetition,
        breaksRecommended: personalizedBreaks
      })
    }
    
    return lessons
  }

  const getLessonTitle = (course: Course, index: number, type: string): string => {
    const prefixes: Record<string, string> = {
      video: 'Watch & Learn:',
      reading: 'Study Guide:',
      quiz: 'Knowledge Check:',
      assignment: 'Hands-on Practice:',
      project: 'Real-world Project:'
    }
    
    const topics = [
      'Introduction & Basics',
      'Core Concepts',
      'Advanced Techniques',
      'Practical Applications',
      'Expert Insights',
      'Case Studies',
      'Troubleshooting',
      'Best Practices',
      'Future Trends',
      'Community Impact'
    ]
    
    return `${prefixes[type] || 'Lesson:'} ${topics[index % topics.length]}`
  }

  const getLessonDescription = (course: Course, index: number, type: string, dna: any): string => {
    let baseDescription = ''
    
    switch(type) {
      case 'video':
        baseDescription = 'Video tutorial with visual demonstrations'
        break
      case 'reading':
        baseDescription = 'Detailed reading materials with examples'
        break
      case 'quiz':
        baseDescription = 'Interactive assessment to test your understanding'
        break
      case 'assignment':
        baseDescription = 'Practical exercise to apply your skills'
        break
      case 'project':
        baseDescription = 'Real-world project to showcase your learning'
        break
      default:
        baseDescription = 'Learning content'
    }
    
    if (dna?.learningStyle === 'visual' && type === 'video') {
      baseDescription += ' (Perfect for visual learners!)'
    } else if (dna?.learningStyle === 'reading' && type === 'reading') {
      baseDescription += ' (Tailored for reading/writing learners)'
    } else if (dna?.learningStyle === 'kinesthetic' && (type === 'assignment' || type === 'project')) {
      baseDescription += ' (Great for hands-on learners)'
    }
    
    return baseDescription
  }

  const calculatePoints = (lessonIndex: number, dna: any): number => {
    let basePoints = 10 + (lessonIndex * 2)
    
    if (dna?.learningSpeed === 'slow' || dna?.learningSpeed === 'very_slow') {
      basePoints = Math.round(basePoints * 1.2)
    } else if (dna?.learningSpeed === 'fast' || dna?.learningSpeed === 'very_fast') {
      basePoints = Math.round(basePoints * 0.9)
    }
    
    return basePoints
  }

  const getLessonResources = (course: Course, index: number, dna: any): string[] => {
    let resources = [
      '📄 Downloadable Guide',
      '🎬 Video Transcript',
      '📝 Practice Exercises'
    ]
    
    if (dna?.learningStyle === 'visual') {
      resources.push('📊 Visual Diagrams', '🎨 Infographic Summary')
    } else if (dna?.learningStyle === 'auditory') {
      resources.push('🎧 Audio Summary', '🗣️ Pronunciation Guide')
    } else if (dna?.learningStyle === 'kinesthetic') {
      resources.push('🛠️ Hands-on Checklist', '🔧 Interactive Tool')
    }
    
    if (dna?.revisionNeeds === 'always' || dna?.revisionNeeds === 'frequently') {
      resources.push('🔄 Revision Cards', '📖 Summary Sheets')
    }
    
    return resources.slice(0, 5)
  }

  const handleEnroll = () => {
    if (!course) return
    
    const dnaData = localStorage.getItem('user_dna_answers')
    const userDNA = dnaData ? JSON.parse(dnaData) : {}
    
    const pace = determinePace(userDNA)
    const dnaMatchScore = calculateDNAScore(userDNA, course)
    const estimatedCompletionTime = calculateEstimatedTime(course, pace)
    const learningPlan = createLearningPlan(userDNA, course, pace)
    
    const personalizedSettings: PersonalizedSettings = {
      pace,
      estimatedCompletionTime,
      dnaMatchScore,
      learningPlan,
      userDNA
    }
    
    const enrollmentData = {
      enrolledAt: new Date().toISOString(),
      userId: user?.id,
      personalizedSettings
    }
    
    localStorage.setItem(`enrollment_${course.id}`, JSON.stringify(enrollmentData))
    setEnrolled(true)
    setPersonalizedSettings(personalizedSettings)
    
    const personalizedLessons = generatePersonalizedLessons(course, personalizedSettings)
    setLessons(personalizedLessons)
    
    setShowEnrollmentModal(false)
  }

  const handleStartLesson = (lessonId: string) => {
    if (!course || !enrolled) {
      setShowEnrollmentModal(true)
      return
    }
    
    const lesson = lessons.find(l => l.id === lessonId)
    if (lesson) {
      const lessonData = {
        courseId: course.id,
        lessonId,
        startedAt: new Date().toISOString(),
        personalizedDuration: lesson.actualDuration,
        breaksRecommended: lesson.breaksRecommended,
        extraExamples: lesson.extraExamples,
        repetitionCount: lesson.repetitionCount
      }
      
      localStorage.setItem(`current_lesson_${course.id}`, JSON.stringify(lessonData))
      router.push(`/dashboard/learning/course/${course.id}/lesson/${lessonId}`)
    }
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

  // AI Tutor Functions
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    }

    setAiMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(newMessage, course, personalizedSettings)
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }
      setAiMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string, course: Course | null, settings: PersonalizedSettings | null): string => {
    const message = userMessage.toLowerCase()
    
    if (!course) {
      return "I'm not sure which course you're referring to. Please try refreshing the page."
    }

    if (message.includes('help') || message.includes('struggling') || message.includes('difficult')) {
      return `Based on your learning style (${settings?.userDNA?.learningStyle || 'adaptive'}), I recommend:\n1. ${settings?.learningPlan.studyTips[0] || 'Take breaks every 30 minutes'}\n2. ${settings?.learningPlan.studyTips[1] || 'Focus on practical examples'}\n\nThis course is tailored for ${settings?.pace === 'slowPaced' ? 'slow and steady learners' : settings?.pace === 'fastPaced' ? 'fast learners' : 'average pace learners'}.`
    }

    if (message.includes('duration') || message.includes('time') || message.includes('long')) {
      return `This course typically takes ${course.duration}. For you personally, I estimate ${settings?.estimatedCompletionTime || '4 weeks'} based on your ${settings?.userDNA?.learningSpeed || 'average'} learning speed.`
    }

    if (message.includes('content') || message.includes('lesson') || message.includes('module')) {
      const lessonCount = course.lessons || 10
      return `This course has ${lessonCount} personalized lessons covering ${course.category.join(', ')}. The content is adapted to your ${settings?.userDNA?.learningStyle || 'learning'} style with ${settings?.learningPlan.difficultyAdjustments.length || 3} special adjustments for better understanding.`
    }

    if (message.includes('personalize') || message.includes('dna') || message.includes('adapt')) {
      const dnaScore = settings?.dnaMatchScore || 85
      return `This course is ${dnaScore}% matched to your learning DNA! Based on your profile:\n• Learning style: ${settings?.userDNA?.learningStyle || 'Adaptive'}\n• Pace: ${settings?.pace || 'Average'}\n• Focus: ${settings?.userDNA?.focusDuration || 'Medium sessions'}\n\nI've adjusted the lessons to include more ${settings?.userDNA?.learningStyle === 'visual' ? 'visual content' : settings?.userDNA?.learningStyle === 'auditory' ? 'audio explanations' : 'hands-on exercises'}.`
    }

    if (message.includes('hi') || message.includes('hello') || message.includes('namaste')) {
      return `Namaste! I'm your AI Tutor for "${course.title}". How can I help you today? You can ask about:\n• Course content and structure\n• Personalized learning tips\n• Estimated completion time\n• How the course adapts to your DNA\n• Any specific concepts you're struggling with`
    }

    return `I understand you're asking about "${userMessage}" in the "${course.title}" course. This is a ${course.difficulty} level course designed for rural Indian learners. Based on your DNA profile, you might find the ${course.tags.slice(0, 2).join(' and ')} aspects particularly interesting. Would you like more specific information about any particular module?`
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

  const getPaceIcon = (pace?: string) => {
    switch (pace) {
      case 'slowPaced': return <Turtle className="w-5 h-5 text-blue-400" />
      case 'averagePaced': return <Gauge className="w-5 h-5 text-green-400" />
      case 'fastPaced': return <Rabbit className="w-5 h-5 text-yellow-400" />
      default: return <Gauge className="w-5 h-5 text-gray-400" />
    }
  }

  const getPaceDescription = (pace?: string) => {
    switch (pace) {
      case 'slowPaced': return { title: 'Slow & Steady', description: 'More examples, repetition, and breaks' }
      case 'averagePaced': return { title: 'Balanced Pace', description: 'Standard learning progression' }
      case 'fastPaced': return { title: 'Accelerated', description: 'Faster pace with advanced challenges' }
      default: return { title: 'Standard', description: 'Regular learning pace' }
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
      {/* AI Tutor Floating Button */}
      <button
        onClick={() => setShowAITutor(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110"
      >
        <Brain className="w-7 h-7" />
      </button>

      {/* AI Tutor Modal */}
      {showAITutor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl border border-purple-500/30 w-full max-w-md h-[600px] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">AI Tutor</h3>
                  <p className="text-xs text-gray-400">Powered by your DNA profile</p>
                </div>
              </div>
              <button
                onClick={() => setShowAITutor(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {aiMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 rounded-br-none'
                        : 'bg-gray-800 rounded-bl-none border border-purple-500/30'
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.content}</div>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-2xl rounded-bl-none p-4 border border-purple-500/30">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Ask about "${course.title}"...`}
                  className="flex-1 bg-gray-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Ask about course content, personalization, or learning tips
              </p>
            </div>
          </motion.div>
        </div>
      )}

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
                onClick={() => setShowAITutor(true)}
                className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
              >
                <Brain className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
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
                {personalizedSettings && (
                  <span className="flex items-center px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                    {getPaceIcon(personalizedSettings.pace)}
                    <span className="ml-2">{getPaceDescription(personalizedSettings.pace).title}</span>
                  </span>
                )}
                <span className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  {course.rating}
                </span>
                <span className="text-gray-400">
                  {getEnrolledCount()} learners
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {course.title}
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {course.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{personalizedSettings?.estimatedCompletionTime || course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>{course.lessons || 10} lessons</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2" />
                  <span>{getEnrolledCount()} enrolled</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-96">
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                {personalizedSettings && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">DNA Match</span>
                      <span className="text-lg font-bold text-purple-400">{personalizedSettings.dnaMatchScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${personalizedSettings.dnaMatchScore}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
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
                      {personalizedSettings?.estimatedCompletionTime || course.duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Lessons</span>
                    <span>
                      {lessons.filter(l => l.completed).length} / {lessons.length} completed
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Learning Pace</span>
                    <span className="flex items-center">
                      {getPaceIcon(personalizedSettings?.pace)}
                      <span className="ml-2">{getPaceDescription(personalizedSettings?.pace).title}</span>
                    </span>
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
            {['overview', 'curriculum', 'instructor', 'reviews', 'faq', 'personalization'].map((tab) => (
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
                {tab === 'personalization' && personalizedSettings && (
                  <span className="ml-2 px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                    DNA
                  </span>
                )}
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
                  <p className="text-gray-300 text-lg mb-6">{course.description}</p>
                  
                  <h3 className="text-xl font-bold mb-4 text-green-400">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {course.learningOutcomes?.map((outcome: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 bg-gray-800/30 rounded-xl p-4">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    )) || (
                      <div className="text-gray-400">Learning outcomes will be personalized based on your DNA</div>
                    )}
                  </div>
                  
                  {personalizedSettings && (
                    <>
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Personalized For You</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {personalizedSettings.learningPlan.studyTips.map((item: string, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Personalization Card */}
              {personalizedSettings && (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-purple-400 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Personalization
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Learning Pace</div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold">
                          {getPaceDescription(personalizedSettings.pace).title}
                        </div>
                        {getPaceIcon(personalizedSettings.pace)}
                      </div>
                      <p className="text-gray-300 text-sm mt-1">
                        {getPaceDescription(personalizedSettings.pace).description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 mb-1">DNA Match Score</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${personalizedSettings.dnaMatchScore}%` }}
                          ></div>
                        </div>
                        <div className="text-lg font-bold">{personalizedSettings.dnaMatchScore}%</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Estimated Completion</div>
                      <div className="text-lg font-semibold text-white">{personalizedSettings.estimatedCompletionTime}</div>
                      <p className="text-gray-300 text-sm mt-1">
                        Personalized based on your learning speed
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
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
              <div>
                <h2 className="text-2xl font-bold text-blue-400">Personalized Curriculum</h2>
                {personalizedSettings && (
                  <p className="text-gray-400">
                    Lessons adapted to your {personalizedSettings.userDNA?.learningStyle || 'learning'} style
                  </p>
                )}
              </div>
              <div className="text-gray-400">
                {lessons.length} lessons • {personalizedSettings?.estimatedCompletionTime || course.duration}
              </div>
            </div>
            
            <div className="space-y-4">
              {lessons.map((lesson, index) => {
                const moduleIndex = Math.floor(index / 5)
                const isModuleExpanded = expandedModules.includes(moduleIndex)
                
                if (index % 5 === 0) {
                  return (
                    <div key={`module_${moduleIndex}`} className="bg-gray-800/30 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleModule(moduleIndex)}
                        className="w-full p-6 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isModuleExpanded ? 'bg-purple-500/20' : 'bg-gray-700/50'
                          }`}>
                            {isModuleExpanded ? (
                              <ChevronDown className="w-5 h-5 text-purple-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-lg">Module {moduleIndex + 1}</h3>
                            <p className="text-gray-400 text-sm">
                              {index === 0 ? 'Getting Started' : 
                               index === 5 ? 'Core Concepts' : 
                               index === 10 ? 'Advanced Topics' : 'Practical Applications'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-gray-400">
                            {Math.min(5, lessons.length - index)} lessons
                          </div>
                          <div className="text-sm text-purple-400">
                            {lesson.actualDuration} min each
                          </div>
                        </div>
                      </button>
                      
                      {isModuleExpanded && (
                        <div className="px-6 pb-6">
                          <div className="space-y-3">
                            {lessons.slice(index, Math.min(index + 5, lessons.length)).map((moduleLesson, lessonIndex) => (
                              <div
                                key={moduleLesson.id}
                                className={`p-4 rounded-xl border ${
                                  moduleLesson.locked 
                                    ? 'border-gray-700 bg-gray-900/30' 
                                    : 'border-white/10 bg-gray-800/30 hover:border-purple-500/50'
                                } transition-all`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                      moduleLesson.locked ? 'bg-gray-800' : 'bg-purple-500/20'
                                    }`}>
                                      {getLessonIcon(moduleLesson.type)}
                                    </div>
                                    
                                    <div>
                                      <div className="flex items-center space-x-3">
                                        <h3 className="font-semibold">{moduleLesson.title}</h3>
                                        {moduleLesson.completed && (
                                          <CheckCircle className="w-5 h-5 text-green-400" />
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-400">{moduleLesson.description}</p>
                                      
                                      {/* Personalized indicators */}
                                      {!moduleLesson.locked && (
                                        <div className="flex items-center space-x-2 mt-2">
                                          {moduleLesson.extraExamples && moduleLesson.extraExamples > 3 && (
                                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                                              +{moduleLesson.extraExamples - 3} extra examples
                                            </span>
                                          )}
                                          {moduleLesson.repetitionCount && moduleLesson.repetitionCount > 1 && (
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                              {moduleLesson.repetitionCount}x repetition
                                            </span>
                                          )}
                                          {moduleLesson.breaksRecommended && moduleLesson.breaksRecommended > 0 && (
                                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                                              {moduleLesson.breaksRecommended} breaks
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                      <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getLessonTypeColor(moduleLesson.type)}`}>
                                          {moduleLesson.type.toUpperCase()}
                                        </span>
                                        <span className="text-gray-400 text-sm">{moduleLesson.actualDuration} min</span>
                                        <span className="text-yellow-400 text-sm">{moduleLesson.points} pts</span>
                                      </div>
                                      {moduleLesson.locked ? (
                                        <div className="px-3 py-1 bg-gray-800 rounded-full text-sm mt-2">
                                          {enrolled ? 'Complete previous lesson' : 'Enroll to access'}
                                        </div>
                                      ) : (
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={() => handleStartLesson(moduleLesson.id)}
                                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg transition-all mt-2"
                                        >
                                          {moduleLesson.completed ? 'Review' : 'Start'}
                                        </motion.button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                {moduleLesson.personalizedNotes && (
                                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                                    <div className="flex items-start space-x-2">
                                      <Sparkles className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                                      <p className="text-sm text-gray-300">{moduleLesson.personalizedNotes}</p>
                                    </div>
                                  </div>
                                )}
                                
                                {moduleLesson.resources.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-white/10">
                                    <h4 className="text-sm font-medium text-gray-400 mb-2">Personalized Resources:</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {moduleLesson.resources.map((resource, idx) => (
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
                }
                return null
              })}
            </div>
          </div>
        )}
        
        {activeTab === 'personalization' && personalizedSettings && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Your Personalization Profile</h2>
              
              <div className="space-y-6">
                {/* DNA Analysis */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    DNA Analysis
                  </h3>
                  
                  <div className="space-y-4">
                    {personalizedSettings.userDNA?.learningSpeed && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Learning Speed</span>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          personalizedSettings.userDNA.learningSpeed.includes('slow') ? 'bg-blue-500/20 text-blue-400' :
                          personalizedSettings.userDNA.learningSpeed.includes('fast') ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {personalizedSettings.userDNA.learningSpeed === 'very_slow' ? 'Very Slow Learner' :
                           personalizedSettings.userDNA.learningSpeed === 'slow' ? 'Slow Learner' :
                           personalizedSettings.userDNA.learningSpeed === 'average' ? 'Average Pace' :
                           personalizedSettings.userDNA.learningSpeed === 'fast' ? 'Fast Learner' : 'Very Fast Learner'}
                        </span>
                      </div>
                    )}
                    
                    {personalizedSettings.userDNA?.learningStyle && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Learning Style</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                          {personalizedSettings.userDNA.learningStyle === 'visual' ? 'Visual Learner' :
                           personalizedSettings.userDNA.learningStyle === 'auditory' ? 'Auditory Learner' :
                           personalizedSettings.userDNA.learningStyle === 'kinesthetic' ? 'Hands-on Learner' : 'Reading/Writing'}
                        </span>
                      </div>
                    )}
                    
                    {personalizedSettings.userDNA?.focusDuration && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Focus Duration</span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                          {personalizedSettings.userDNA.focusDuration === 'short' ? 'Short bursts (15-30min)' :
                           personalizedSettings.userDNA.focusDuration === 'medium' ? 'Medium sessions (30-60min)' :
                           personalizedSettings.userDNA.focusDuration === 'long' ? 'Long sessions (1-2hrs)' : 'Extended focus (2+hrs)'}
                        </span>
                      </div>
                    )}
                    
                    {personalizedSettings.userDNA?.revisionNeeds && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Revision Needs</span>
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                          {personalizedSettings.userDNA.revisionNeeds === 'rarely' ? 'Rarely needs review' :
                           personalizedSettings.userDNA.revisionNeeds === 'occasionally' ? 'Occasional review' :
                           personalizedSettings.userDNA.revisionNeeds === 'regularly' ? 'Regular review needed' :
                           personalizedSettings.userDNA.revisionNeeds === 'frequently' ? 'Frequent review needed' : 'Always needs review'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Learning Plan */}
                <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Your Learning Plan
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">📅 Weekly Schedule</h4>
                      <ul className="space-y-2">
                        {personalizedSettings.learningPlan.weeklySchedule.map((item, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">💡 Study Tips</h4>
                      <ul className="space-y-2">
                        {personalizedSettings.learningPlan.studyTips.slice(0, 3).map((tip, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <Sparkles className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-400">How We Personalize Your Learning</h2>
              
              <div className="space-y-6">
                {/* Pace Explanation */}
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-purple-400">Learning Pace Adjustments</h3>
                  
                  <div className="space-y-4">
                    {personalizedSettings.pace === 'slowPaced' && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Turtle className="w-5 h-5 text-blue-400" />
                          <div>
                            <h4 className="font-semibold">For Slow Learners</h4>
                            <p className="text-sm text-gray-400">We adjust your course to include:</p>
                          </div>
                        </div>
                        <ul className="space-y-2 pl-8">
                          <li className="flex items-center space-x-2">
                            <Repeat className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300">More repetition of concepts</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Layers className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300">Extra examples and practice</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Timer className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300">Longer lesson durations</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <RefreshCw className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300">Frequent revision sessions</span>
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    {personalizedSettings.pace === 'fastPaced' && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Rabbit className="w-5 h-5 text-yellow-400" />
                          <div>
                            <h4 className="font-semibold">For Fast Learners</h4>
                            <p className="text-sm text-gray-400">We accelerate your course with:</p>
                          </div>
                        </div>
                        <ul className="space-y-2 pl-8">
                          <li className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300">Advanced challenges</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300">Bonus materials</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300">Faster progression</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300">Expert-level projects</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Difficulty Adjustments */}
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">Difficulty Adjustments</h3>
                  
                  <div className="space-y-3">
                    {personalizedSettings.learningPlan.difficultyAdjustments.map((adjustment, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Target className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{adjustment}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Match Score Explanation */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">DNA Match Score: {personalizedSettings.dnaMatchScore}%</h3>
                  <p className="text-gray-300">
                    This score represents how well this course matches your learning DNA. 
                    A higher score means the course content, pace, and teaching style are 
                    better aligned with your natural learning preferences.
                  </p>
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
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Personalized Enrollment</h3>
              <p className="text-gray-400">This course will be tailored to your learning DNA</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                <span className="text-gray-400">Course Access</span>
                <span className="text-green-400 font-bold">Lifetime</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                <span className="text-gray-400">Personalization</span>
                <span className="text-purple-400 font-bold">AI-Driven</span>
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
                Enroll with Personalization
              </motion.button>
              
              <button
                onClick={() => setShowEnrollmentModal(false)}
                className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all"
              >
                Maybe Later
              </button>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-4">
              🧬 DNA-based personalization • 🔒 100% secure • 💯 Free forever
            </p>
          </motion.div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => router.push('/dashboard/learning/recommendations')}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Recommendations
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