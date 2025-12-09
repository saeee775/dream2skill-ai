// apps/web/src/app/dashboard/learning/page.tsx - UPDATED VERSION
'use client'
import { motion } from 'framer-motion'
import { 
  Brain, Heart, Zap, Mic, CheckCircle, BarChart3,
  Sparkles, Rocket, ArrowLeft, Star, Target, Clock,
  BookOpen, Users, TrendingUp, Award
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface DNAAnswer {
  questionId: string;
  answer: string;
  timestamp: Date;
}

export default function LearningDashboard() {
  const { user, login } = useAuth()
  const router = useRouter()
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [learnerDNA, setLearnerDNA] = useState<Record<string, string>>({})
  const [dnaAnswers, setDnaAnswers] = useState<DNAAnswer[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [analysisTime, setAnalysisTime] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showSkipOption, setShowSkipOption] = useState(false)

  // Voice analysis states
  const [voiceAnalysis, setVoiceAnalysis] = useState({
    recorded: false,
    analyzing: false,
    tone: '',
    pace: '',
    confidence: 0,
    sentiment: ''
  })

  // Timer effect for analysis
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (onboardingStep === 2 && currentQuestion > 0) {
      timer = setInterval(() => {
        setAnalysisTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [onboardingStep, currentQuestion]);

  // Auto-show skip option after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onboardingStep === 2 && currentQuestion > 0) {
        setShowSkipOption(true);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [onboardingStep, currentQuestion]);

  // Check if user already has DNA data
  useEffect(() => {
    const savedDNA = localStorage.getItem('user_dna_answers');
    const savedUser = localStorage.getItem('dream2skill_user');
    
    if (savedDNA && savedUser) {
      try {
        const dnaData = JSON.parse(savedDNA);
        const userData = JSON.parse(savedUser);
        
        if (userData.completed_dna) {
          // Redirect to recommendations if DNA is already completed
          router.push('/dashboard/learning/recommendations');
        } else if (Object.keys(dnaData).length > 0) {
          // Restore DNA progress
          setLearnerDNA(dnaData);
          const answeredQuestions = Object.keys(dnaData).length;
          setCurrentQuestion(answeredQuestions);
          
          // Calculate which step to show
          if (answeredQuestions === 15) {
            setOnboardingStep(3); // Go to voice analysis
          } else {
            setOnboardingStep(2); // Continue with questions
          }
        }
      } catch (error) {
        console.error('Error parsing saved DNA data:', error);
      }
    }
  }, [router]);

  // Comprehensive Question Bank with enhanced options
  const dnaQuestions = [
    {
      id: 'learningStyle',
      category: 'Cognitive Patterns',
      question: 'When learning something new, what helps you understand best?',
      options: [
        { id: 'visual', text: 'Diagrams, charts, and visual demonstrations', icon: '👀', description: 'You learn best by seeing information' },
        { id: 'auditory', text: 'Listening to explanations and discussions', icon: '👂', description: 'You learn best by hearing information' },
        { id: 'kinesthetic', text: 'Hands-on practice and physical activities', icon: '🛠️', description: 'You learn best by doing activities' },
        { id: 'reading', text: 'Reading materials and taking detailed notes', icon: '📚', description: 'You learn best through reading and writing' }
      ]
    },
    {
      id: 'informationProcessing',
      category: 'Cognitive Patterns',
      question: 'How do you prefer to receive new information?',
      options: [
        { id: 'sequential', text: 'Step-by-step, in a logical order', icon: '🔢', description: 'You prefer structured, linear learning' },
        { id: 'global', text: 'Big picture first, then details', icon: '🌍', description: 'You prefer understanding concepts first' },
        { id: 'analytical', text: 'Breaking things down into components', icon: '🔍', description: 'You analyze each part thoroughly' },
        { id: 'intuitive', text: 'Through examples and patterns', icon: '💡', description: 'You learn through examples and connections' }
      ]
    },
    {
      id: 'memoryRetention',
      category: 'Cognitive Patterns',
      question: 'What helps you remember information best?',
      options: [
        { id: 'repetition', text: 'Repeating and practicing multiple times', icon: '🔄', description: 'Repetition strengthens your memory' },
        { id: 'association', text: 'Connecting to things I already know', icon: '🔗', description: 'You create mental connections' },
        { id: 'story', text: 'Through stories and real-life examples', icon: '📖', description: 'Narratives help you retain information' },
        { id: 'teaching', text: 'Explaining it to someone else', icon: '👨‍🏫', description: 'Teaching reinforces your understanding' }
      ]
    },
    {
      id: 'problemSolving',
      category: 'Cognitive Patterns',
      question: 'When facing a difficult problem, your approach is:',
      options: [
        { id: 'systematic', text: 'Follow a step-by-step method', icon: '📋', description: 'You use systematic approaches' },
        { id: 'creative', text: 'Try different creative approaches', icon: '🎨', description: 'You think outside the box' },
        { id: 'collaborative', text: 'Discuss with others for ideas', icon: '👥', description: 'You value team problem-solving' },
        { id: 'research', text: 'Look for similar solved problems', icon: '🔎', description: 'You research before solving' }
      ]
    },
    {
      id: 'motivationType',
      category: 'Emotional & Behavioral',
      question: 'What motivates you to learn most?',
      options: [
        { id: 'achievement', text: 'Achieving goals and getting results', icon: '🏆', description: 'Goal completion drives you' },
        { id: 'curiosity', text: 'Satisfying curiosity and learning new things', icon: '❓', description: 'Natural curiosity motivates you' },
        { id: 'social', text: 'Connecting with others and community', icon: '👥', description: 'Social interaction inspires you' },
        { id: 'practical', text: 'Solving real-world problems', icon: '🔧', description: 'Practical applications motivate you' }
      ]
    },
    {
      id: 'stressResponse',
      category: 'Emotional & Behavioral',
      question: 'When learning gets challenging, you tend to:',
      options: [
        { id: 'persist', text: 'Keep trying with determination', icon: '💪', description: 'You persist through challenges' },
        { id: 'pause', text: 'Take a break and come back later', icon: '⏸️', description: 'You take strategic breaks' },
        { id: 'research', text: 'Look for additional resources', icon: '🔍', description: 'You seek more information' },
        { id: 'discuss', text: 'Talk to someone about it', icon: '💬', description: 'You discuss challenges with others' }
      ]
    },
    {
      id: 'confidenceLevel',
      category: 'Emotional & Behavioral',
      question: 'How confident do you feel about learning new technologies?',
      options: [
        { id: 'very', text: 'Very confident - I learn quickly', icon: '🚀', description: 'High confidence in tech learning' },
        { id: 'moderate', text: 'Moderately confident with guidance', icon: '👍', description: 'Confident with some support' },
        { id: 'cautious', text: 'Cautious - need clear instructions', icon: '🧭', description: 'Prefer clear guidance' },
        { id: 'nervous', text: 'A bit nervous but willing to try', icon: '😅', description: 'Nervous but open to learning' }
      ]
    },
    {
      id: 'socialLearning',
      category: 'Emotional & Behavioral',
      question: 'How do you feel about learning with others?',
      options: [
        { id: 'prefer_group', text: 'I learn best in groups', icon: '👥', description: 'Group learning is most effective' },
        { id: 'mix', text: 'Mix of solo and group learning', icon: '⚖️', description: 'You enjoy both approaches' },
        { id: 'prefer_solo', text: 'I prefer learning alone', icon: '🧘', description: 'Independent learning works best' },
        { id: 'mentor', text: 'I like one-on-one guidance', icon: '👨‍🏫', description: 'Personal guidance is preferred' }
      ]
    },
    {
      id: 'studyEnvironment',
      category: 'Environmental & Physical',
      question: 'What is your ideal learning environment?',
      options: [
        { id: 'quiet', text: 'Quiet and private space', icon: '🤫', description: 'Silence helps you concentrate' },
        { id: 'background', text: 'Some background noise is okay', icon: '🎵', description: 'You can focus with some noise' },
        { id: 'active', text: 'Active environment with people', icon: '🏢', description: 'You thrive in active settings' },
        { id: 'outdoor', text: 'Outdoor or natural setting', icon: '🌳', description: 'Nature enhances your learning' }
      ]
    },
    {
      id: 'energyPatterns',
      category: 'Environmental & Physical',
      question: 'When do you have the most energy for learning?',
      options: [
        { id: 'morning', text: 'Early morning', icon: '🌅', description: 'Most productive in mornings' },
        { id: 'afternoon', text: 'Afternoon', icon: '🌞', description: 'Peak energy in afternoons' },
        { id: 'evening', text: 'Evening', icon: '🌇', description: 'Evenings are your prime time' },
        { id: 'night', text: 'Late night', icon: '🌙', description: 'Most focused at night' }
      ]
    },
    {
      id: 'focusDuration',
      category: 'Environmental & Physical',
      question: 'How long can you typically focus on one task?',
      options: [
        { id: 'short', text: '15-30 minutes', icon: '⏱️', description: 'Short, focused bursts work best' },
        { id: 'medium', text: '30-60 minutes', icon: '🕐', description: 'Medium-length sessions are ideal' },
        { id: 'long', text: '1-2 hours', icon: '🕑', description: 'You can focus for extended periods' },
        { id: 'extended', text: 'More than 2 hours', icon: '🕒', description: 'Deep focus for long durations' }
      ]
    },
    {
      id: 'techComfort',
      category: 'Technical & Access',
      question: 'How comfortable are you with technology?',
      options: [
        { id: 'expert', text: 'Very comfortable - I explore new tech easily', icon: '💻', description: 'Tech-savvy and confident' },
        { id: 'comfortable', text: 'Comfortable with guidance', icon: '📱', description: 'Comfortable with some help' },
        { id: 'basic', text: 'Basic user - need clear instructions', icon: '🔤', description: 'Prefer clear, simple instructions' },
        { id: 'learning', text: 'Still learning - patient guidance needed', icon: '🎓', description: 'Learning with support' }
      ]
    },
    {
      id: 'deviceUsage',
      category: 'Technical & Access',
      question: 'What device do you use most for learning?',
      options: [
        { id: 'smartphone', text: 'Smartphone', icon: '📱', description: 'Primary device is smartphone' },
        { id: 'tablet', text: 'Tablet', icon: '📟', description: 'Tablet is your main device' },
        { id: 'laptop', text: 'Laptop/Computer', icon: '💻', description: 'Computer is preferred' },
        { id: 'multiple', text: 'Multiple devices', icon: '🔀', description: 'Use various devices' }
      ]
    },
    {
      id: 'internetStability',
      category: 'Technical & Access',
      question: 'How stable is your internet connection?',
      options: [
        { id: 'excellent', text: 'Excellent - always available', icon: '⚡', description: 'Reliable high-speed internet' },
        { id: 'good', text: 'Good - occasional drops', icon: '👍', description: 'Generally good with some issues' },
        { id: 'unstable', text: 'Unstable - frequent interruptions', icon: '📶', description: 'Inconsistent connection' },
        { id: 'limited', text: 'Limited - need offline options', icon: '📴', description: 'Requires offline capabilities' }
      ]
    },
    {
      id: 'offlineNeeds',
      category: 'Technical & Access',
      question: 'How important is offline learning for you?',
      options: [
        { id: 'critical', text: 'Critical - I need full offline access', icon: '📥', description: 'Offline access is essential' },
        { id: 'important', text: 'Important for travel/backup', icon: '🎒', description: 'Offline is important backup' },
        { id: 'sometimes', text: 'Sometimes useful', icon: '🔄', description: 'Occasionally need offline' },
        { id: 'rarely', text: 'Rarely need offline', icon: '🌐', description: 'Almost always online' }
      ]
    }
  ]

  const handleDNAAnswer = (questionId: string, answerId: string) => {
    const newAnswers = {
      ...learnerDNA,
      [questionId]: answerId
    }
    
    setLearnerDNA(newAnswers)
    
    // Save progress to localStorage
    localStorage.setItem('user_dna_answers', JSON.stringify(newAnswers))
    
    // Track the answer
    setDnaAnswers(prev => [...prev, {
      questionId,
      answer: answerId,
      timestamp: new Date()
    }])

    if (currentQuestion < dnaQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      analyzeCompleteDNA()
      setOnboardingStep(3)
    }
  }

  const skipToNext = () => {
    if (currentQuestion < dnaQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      analyzeCompleteDNA()
      setOnboardingStep(3)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    } else {
      setOnboardingStep(1)
    }
  }

  const analyzeCompleteDNA = () => {
    setIsAnalyzing(true)
    
    // Analyze DNA answers
    const strengths = []
    const challenges = []
    const recommendations = []

    if (learnerDNA.learningStyle === 'visual') {
      strengths.push('Strong visual processing')
      recommendations.push('Content will include more diagrams, charts, and visual demonstrations')
    }
    if (learnerDNA.informationProcessing === 'global') {
      strengths.push('Big-picture thinking')
      recommendations.push('Lessons will start with overviews before diving into details')
    }
    if (learnerDNA.problemSolving === 'creative') {
      strengths.push('Creative problem-solving')
      recommendations.push('You\'ll get creative challenges and open-ended projects')
    }
    if (learnerDNA.memoryRetention === 'association') {
      strengths.push('Excellent pattern recognition')
      recommendations.push('Content will connect new information to what you already know')
    }

    if (learnerDNA.techComfort === 'learning') {
      challenges.push('May need tech support initially')
      recommendations.push('Extra guidance will be provided for technical aspects')
    }
    if (learnerDNA.focusDuration === 'short') {
      challenges.push('Benefits from micro-learning')
      recommendations.push('Lessons will be broken into 15-20 minute segments')
    }
    if (learnerDNA.confidenceLevel === 'nervous') {
      challenges.push('Needs encouragement and small wins')
      recommendations.push('You\'ll receive frequent positive reinforcement')
    }
    if (learnerDNA.internetStability === 'limited' || learnerDNA.offlineNeeds === 'critical') {
      recommendations.push('All lessons will be available for offline download')
    }

    setLearnerDNA(prev => ({
      ...prev,
      cognitiveStrengths: strengths,
      learningChallenges: challenges,
      recommendations: recommendations,
      analysisCompleted: new Date().toISOString()
    }))

    setTimeout(() => {
      setIsAnalyzing(false)
    }, 2000)
  }

  const simulateVoiceAnalysis = () => {
    setVoiceAnalysis(prev => ({ ...prev, analyzing: true }))
    
    setTimeout(() => {
      // Determine voice analysis based on DNA
      let tone = 'neutral'
      let pace = 'moderate'
      let confidence = 70
      let sentiment = 'positive'

      if (learnerDNA.confidenceLevel === 'very') {
        confidence = 90
        tone = 'confident'
      } else if (learnerDNA.confidenceLevel === 'nervous') {
        confidence = 50
        tone = 'gentle'
      }

      if (learnerDNA.energyPatterns === 'morning') {
        pace = 'energetic'
      } else if (learnerDNA.energyPatterns === 'night') {
        pace = 'relaxed'
      }

      if (learnerDNA.motivationType === 'achievement') {
        sentiment = 'motivational'
      } else if (learnerDNA.motivationType === 'social') {
        sentiment = 'friendly'
      }

      setVoiceAnalysis({
        recorded: true,
        analyzing: false,
        tone,
        pace,
        confidence,
        sentiment
      })
    }, 4000)
  }

  const handleCompleteDNA = () => {
    // Save final DNA analysis
    localStorage.setItem('user_dna_answers', JSON.stringify({
      ...learnerDNA,
      voiceAnalysis: voiceAnalysis,
      completedAt: new Date().toISOString()
    }))
    
    // Update user to mark DNA as completed
    const updatedUser = {
      ...user!,
      completed_dna: true,
      dna_completed_at: new Date().toISOString()
    }
    
    login(updatedUser)
    localStorage.setItem('dream2skill_user', JSON.stringify(updatedUser))
    
    // Redirect to personalized course recommendations
    router.push('/dashboard/learning/recommendations')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Onboarding Step 1: AI Learner DNA Introduction
  if (onboardingStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 text-white flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8"
          >
            <Brain className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 px-4">
            Welcome to Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Learner DNA
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            I'm about to create your unique learning fingerprint by analyzing your cognitive patterns, 
            emotional responses, and behavioral cues. This makes every lesson adapt to you in real-time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 max-w-4xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/10">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base text-blue-400">Cognitive Analysis</h3>
              <p className="text-gray-400 text-xs md:text-sm">Learning style, memory patterns, problem-solving approach</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/10">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              </div>
              <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base text-green-400">Emotional Intelligence</h3>
              <p className="text-gray-400 text-xs md:text-sm">Motivation triggers, stress responses, confidence levels</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/10">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              </div>
              <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base text-purple-400">Behavioral Patterns</h3>
              <p className="text-gray-400 text-xs md:text-sm">Focus duration, environmental preferences, social learning</p>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4 px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOnboardingStep(2)}
              className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl text-base md:text-lg hover:shadow-2xl transition-all w-full max-w-xs"
            >
              Begin DNA Analysis
            </motion.button>
            
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 md:px-8 md:py-4 bg-gray-800/50 text-gray-300 font-medium rounded-2xl text-base md:text-lg hover:bg-gray-800 transition-all w-full max-w-xs"
            >
              Skip for Now
            </button>
          </div>

          <div className="mt-6 md:mt-8 space-y-2 px-4">
            <p className="text-gray-500 text-xs md:text-sm">
              ⏱️ Takes 5-7 minutes • 🔒 100% private and secure • 🎯 Real-time adaptation
            </p>
            <div className="flex items-center justify-center space-x-4 text-gray-500 text-xs">
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                <span>50K+ learners analyzed</span>
              </div>
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1" />
                <span>95% accuracy rate</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // Onboarding Step 2: Interactive DNA Questions
  if (onboardingStep === 2 && currentQuestion < dnaQuestions.length) {
    const question = dnaQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / dnaQuestions.length) * 100
    
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with progress */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goBack}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="hidden md:inline">Back</span>
              </button>
              
              <div className="text-center flex-1">
                <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-1">
                  <span>AI Learner DNA Analysis</span>
                  <span>Question {currentQuestion + 1} of {dnaQuestions.length}</span>
                </div>
                <div className="w-full md:w-96 h-2 bg-gray-700 rounded-full mx-auto">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{question.category}</div>
              </div>
              
              <div className="text-right">
                <div className="text-xs text-gray-500">Time: {formatTime(analysisTime)}</div>
              </div>
            </div>
            
            {showSkipOption && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mb-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-sm text-yellow-300">Taking too long?</span>
                  </div>
                  <button
                    onClick={skipToNext}
                    className="text-xs px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors"
                  >
                    Skip Question
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Question */}
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs md:text-sm mb-4">
              {question.category}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 leading-tight px-4">
              {question.question}
            </h1>
            <p className="text-gray-400 text-base md:text-lg px-4">
              Select the option that best describes you
            </p>
          </motion.div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto">
            {question.options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleDNAAnswer(question.id, option.id)}
                className={`p-4 md:p-6 rounded-2xl border-2 text-left transition-all duration-300 group ${
                  learnerDNA[question.id] === option.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 bg-gray-800/50 hover:border-blue-500 hover:bg-blue-500/10'
                }`}
              >
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="text-xl md:text-2xl flex-shrink-0">{option.icon}</div>
                  <div className="flex-1">
                    <div className={`font-medium mb-1 md:mb-2 transition-colors ${
                      learnerDNA[question.id] === option.id
                        ? 'text-blue-400'
                        : 'text-white group-hover:text-blue-400'
                    }`}>
                      {option.text}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">
                      {option.description}
                    </div>
                  </div>
                  {learnerDNA[question.id] === option.id && (
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400 flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation and Tips */}
          <div className="mt-8 md:mt-12 text-center space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-2 text-gray-500">
                <Target className="w-4 h-4" />
                <span className="text-sm">Your answers personalize your learning</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">{dnaQuestions.length - currentQuestion - 1} questions remaining</span>
              </div>
            </div>
            
            <p className="text-gray-500 text-xs md:text-sm px-4">
              ⚡ Quick tip: Answer honestly for the best personalized experience
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Onboarding Step 3: Voice & Behavioral Analysis
  if (onboardingStep === 3) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setOnboardingStep(2)
                  setCurrentQuestion(dnaQuestions.length - 1)
                }}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Questions</span>
              </button>
              <div className="text-sm text-gray-400">
                Step 3 of 4
              </div>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-gradient-to-r from-green-500 to-cyan-600 rounded-full w-3/4"></div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6"
            >
              <Mic className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4">
              Voice & Behavioral Analysis
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-4">
              Let me analyze your voice to understand your emotional state and communication style.
              This helps me adapt my teaching to match your natural rhythm.
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-4 md:p-8 mb-6 md:mb-8">
            <div className="text-center">
              {!voiceAnalysis.recorded ? (
                <div>
                  <motion.div
                    animate={voiceAnalysis.analyzing ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: voiceAnalysis.analyzing ? Infinity : 0, duration: 2 }}
                    className="w-24 h-24 md:w-32 md:h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-500/30"
                  >
                    {voiceAnalysis.analyzing ? (
                      <div className="text-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <span className="text-green-400 text-sm md:text-base">Analyzing...</span>
                      </div>
                    ) : (
                      <Mic className="w-10 h-10 md:w-12 md:h-12 text-green-400" />
                    )}
                  </motion.div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-green-400">
                    {voiceAnalysis.analyzing ? 'Analyzing Your Voice Patterns' : 'Record Your Voice Sample'}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 md:mb-6 max-w-md mx-auto px-4 text-sm md:text-base">
                    {voiceAnalysis.analyzing 
                      ? 'I\'m analyzing speech patterns, tone, pace, and emotional cues to personalize your learning experience...'
                      : 'Read the sentence below in your natural voice. This helps me adapt my teaching style to match yours perfectly.'
                    }
                  </p>

                  {!voiceAnalysis.analyzing && (
                    <>
                      <div className="bg-gray-800/50 rounded-xl p-4 md:p-6 mb-6 max-w-md mx-auto">
                        <p className="text-base md:text-lg font-medium mb-2">Please read this aloud:</p>
                        <p className="text-gray-300 text-lg md:text-xl italic">
                          "I'm excited to start learning new skills that will help me achieve my goals and make a positive impact in my community."
                        </p>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={simulateVoiceAnalysis}
                          className="px-6 py-3 md:px-8 md:py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-base md:text-lg transition-all w-full max-w-xs"
                        >
                          Start Recording
                        </motion.button>
                        
                        <button
                          onClick={() => {
                            setVoiceAnalysis({
                              recorded: true,
                              analyzing: false,
                              tone: 'neutral',
                              pace: 'moderate',
                              confidence: 70,
                              sentiment: 'positive'
                            })
                          }}
                          className="px-6 py-3 md:px-8 md:py-4 bg-gray-800/50 text-gray-300 font-medium rounded-xl text-base md:text-lg hover:bg-gray-800 transition-all w-full max-w-xs"
                        >
                          Skip Voice Analysis
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="w-20 h-20 md:w-24 md:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-500/30"
                  >
                    <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-400" />
                  </motion.div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-green-400">
                    Voice Analysis Complete!
                  </h3>
                  
                  <p className="text-gray-300 mb-6 max-w-md mx-auto px-4 text-sm md:text-base">
                    Based on your voice patterns, I've identified optimal teaching parameters for your learning style.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 max-w-2xl mx-auto">
                    <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                      <div className="text-green-400 font-semibold mb-1 md:mb-2 text-sm">Tone Analysis</div>
                      <div className="text-white text-base md:text-lg">{voiceAnalysis.tone}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                      <div className="text-blue-400 font-semibold mb-1 md:mb-2 text-sm">Speech Pace</div>
                      <div className="text-white text-base md:text-lg">{voiceAnalysis.pace}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                      <div className="text-purple-400 font-semibold mb-1 md:mb-2 text-sm">Confidence Level</div>
                      <div className="text-white text-base md:text-lg">{voiceAnalysis.confidence}%</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                      <div className="text-yellow-400 font-semibold mb-1 md:mb-2 text-sm">Sentiment</div>
                      <div className="text-white text-base md:text-lg">{voiceAnalysis.sentiment}</div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOnboardingStep(4)}
                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl text-base md:text-lg hover:shadow-xl transition-all w-full max-w-xs"
                  >
                    See Your Complete DNA Profile
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Benefits of voice analysis */}
          <div className="bg-gray-800/30 rounded-2xl p-4 md:p-6">
            <h4 className="font-bold text-blue-400 mb-3 md:mb-4 text-lg">Why Voice Analysis Matters:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold mb-1">Personalized Pace</h5>
                  <p className="text-gray-400 text-sm">Adjusts teaching speed to match your natural rhythm</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold mb-1">Emotional Adaptation</h5>
                  <p className="text-gray-400 text-sm">Recognizes stress or excitement to adjust approach</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Brain className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold mb-1">Optimal Engagement</h5>
                  <p className="text-gray-400 text-sm">Matches tone to keep you engaged and motivated</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold mb-1">Confidence Building</h5>
                  <p className="text-gray-400 text-sm">Provides encouragement at the right moments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Onboarding Step 4: DNA Results & Personalization
  if (onboardingStep === 4) {
    const strengths = (learnerDNA as any).cognitiveStrengths || []
    const challenges = (learnerDNA as any).learningChallenges || []
    const recommendations = (learnerDNA as any).recommendations || []
    
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setOnboardingStep(3)}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back</span>
              </button>
              <div className="text-sm text-gray-400">
                Step 4 of 4
              </div>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-full"></div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8"
            >
              <Brain className="w-10 h-10 md:w-16 md:h-16 text-white" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black mb-4 md:mb-6 px-4">
              Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Learner DNA
              </span>{' '}
              is Ready! 🧬
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Based on deep analysis of your cognitive patterns, emotional responses, and behavioral cues, 
              I've created your unique learning fingerprint.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs md:text-sm">
                {dnaAnswers.length} Questions Analyzed
              </span>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs md:text-sm">
                Voice Pattern Matched
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs md:text-sm">
                Real-time Adaptation
              </span>
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs md:text-sm">
                {formatTime(analysisTime)} Analysis Time
              </span>
            </div>
          </motion.div>

          {/* DNA Profile Cards */}
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
            {/* Cognitive Profile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-400 flex items-center">
                <Brain className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                Cognitive Profile
              </h2>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="font-semibold text-cyan-400 mb-2 text-sm md:text-base">Primary Learning Style</h3>
                  <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                    <div className="text-base md:text-lg font-medium">
                      {dnaQuestions.find(q => q.id === 'learningStyle')?.options
                        .find(o => o.id === learnerDNA.learningStyle)?.text || 'Not specified'}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Content will be optimized for your visual learning preferences
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-green-400 mb-2 text-sm md:text-base">Primary Motivation</h3>
                  <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                    <div className="text-base md:text-lg font-medium">
                      {dnaQuestions.find(q => q.id === 'motivationType')?.options
                        .find(o => o.id === learnerDNA.motivationType)?.text || 'Not specified'}
                    </div>
                  </div>
                </div>
                
                {strengths.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-purple-400 mb-2 text-sm md:text-base">Cognitive Strengths</h3>
                    <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                      <ul className="space-y-2">
                        {strengths.map((strength: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Sparkles className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Personalization Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-2xl p-4 md:p-6 lg:p-8"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-green-400 flex items-center">
                <Zap className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                AI Personalization Plan
              </h2>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="font-semibold text-yellow-400 mb-2 text-sm md:text-base">Real-time Adaptations</h3>
                  <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Content tailored to your <strong>{learnerDNA.learningStyle || 'unique'}</strong> learning style</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Pace adjustment based on your <strong>{learnerDNA.focusDuration || 'optimal'}</strong> focus duration</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Voice tone matching your <strong>{voiceAnalysis.tone || 'natural'}</strong> communication style</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Offline options for <strong>{learnerDNA.internetStability || 'your'}</strong> internet needs</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2 text-sm md:text-base">Engagement Strategy</h3>
                  <div className="bg-gray-800/50 rounded-xl p-3 md:p-4">
                    <p className="text-gray-300">
                      I'll monitor your engagement patterns and adjust content delivery in real-time 
                      to maintain optimal learning flow and motivation based on your behavioral cues.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recommendations & Next Steps */}
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-purple-400">Personalized Recommendations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {recommendations.slice(0, 4).map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 bg-gray-800/30 rounded-xl p-3 md:p-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{rec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Challenges & Support */}
          {challenges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-yellow-400">Support Plan</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {challenges.map((challenge: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 bg-gray-800/30 rounded-xl p-3 md:p-4">
                    <Target className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{challenge.replace('May need', 'We\'ll provide').replace('Needs', 'We\'ll offer').replace('Benefits from', 'We\'ll include')}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Promise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4 md:p-6 lg:p-8 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-400">
              🤖 Your AI Learning Companion is Ready
            </h3>
            <p className="text-gray-300 text-base md:text-lg mb-6 max-w-2xl mx-auto">
              From this moment, every lesson, every explanation, and every interaction will be 
              tailored to your unique learning DNA. I'll evolve with you as you grow.
            </p>
            
            <div className="space-y-3 md:space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCompleteDNA}
                className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl text-base md:text-lg hover:shadow-2xl transition-all w-full max-w-xs"
              >
                See Your Personalized Course Recommendations
              </motion.button>
              
              <p className="text-gray-500 text-sm">
                🎯 Based on {dnaAnswers.length} data points • ⚡ Real-time adaptation • 🔄 Continuous improvement
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            <div className="bg-gray-800/30 rounded-xl p-3 md:p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">{dnaAnswers.length}</div>
              <div className="text-xs md:text-sm text-gray-400">Questions Analyzed</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-3 md:p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">{strengths.length}</div>
              <div className="text-xs md:text-sm text-gray-400">Identified Strengths</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-3 md:p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">{formatTime(analysisTime)}</div>
              <div className="text-xs md:text-sm text-gray-400">Analysis Time</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-3 md:p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">100%</div>
              <div className="text-xs md:text-sm text-gray-400">Personalized</div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Loading state
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 md:w-20 md:h-20 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
        ></motion.div>
        <p className="text-lg md:text-xl">Analyzing your learning DNA...</p>
        <p className="text-gray-400 text-sm mt-2">This will just take a moment</p>
        
        {isAnalyzing && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="mt-6 w-64 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"
          ></motion.div>
        )}
      </div>
    </div>
  )
}