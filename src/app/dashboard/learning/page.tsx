// apps/web/src/app/dashboard/learning/page.tsx - REPLACE EXISTING CONTENT
'use client'
import { motion } from 'framer-motion'
import { 
  Brain, Heart, Zap, Mic, CheckCircle, BarChart3,
  Sparkles, Rocket
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function LearningDashboard() {
  const { user, login } = useAuth()
  const router = useRouter()
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [learnerDNA, setLearnerDNA] = useState({
    learningStyle: '',
    informationProcessing: '',
    memoryRetention: '',
    problemSolving: '',
    motivationType: '',
    stressResponse: '',
    confidenceLevel: '',
    socialLearning: '',
    studyEnvironment: '',
    energyPatterns: '',
    focusDuration: '',
    techComfort: '',
    deviceUsage: '',
    internetStability: '',
    offlineNeeds: ''
  })

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [voiceAnalysis, setVoiceAnalysis] = useState({
    recorded: false,
    analyzing: false,
    tone: '',
    pace: '',
    confidence: 0
  })

  // Comprehensive Question Bank
  const dnaQuestions = [
    {
      id: 'learningStyle',
      category: 'Cognitive Patterns',
      question: 'When learning something new, what helps you understand best?',
      options: [
        { id: 'visual', text: 'Diagrams, charts, and visual demonstrations', icon: '👀' },
        { id: 'auditory', text: 'Listening to explanations and discussions', icon: '👂' },
        { id: 'kinesthetic', text: 'Hands-on practice and physical activities', icon: '🛠️' },
        { id: 'reading', text: 'Reading materials and taking detailed notes', icon: '📚' }
      ]
    },
    {
      id: 'informationProcessing',
      category: 'Cognitive Patterns',
      question: 'How do you prefer to receive new information?',
      options: [
        { id: 'sequential', text: 'Step-by-step, in a logical order', icon: '🔢' },
        { id: 'global', text: 'Big picture first, then details', icon: '🌍' },
        { id: 'analytical', text: 'Breaking things down into components', icon: '🔍' },
        { id: 'intuitive', text: 'Through examples and patterns', icon: '💡' }
      ]
    },
    {
      id: 'memoryRetention',
      category: 'Cognitive Patterns',
      question: 'What helps you remember information best?',
      options: [
        { id: 'repetition', text: 'Repeating and practicing multiple times', icon: '🔄' },
        { id: 'association', text: 'Connecting to things I already know', icon: '🔗' },
        { id: 'story', text: 'Through stories and real-life examples', icon: '📖' },
        { id: 'teaching', text: 'Explaining it to someone else', icon: '👨‍🏫' }
      ]
    },
    {
      id: 'problemSolving',
      category: 'Cognitive Patterns',
      question: 'When facing a difficult problem, your approach is:',
      options: [
        { id: 'systematic', text: 'Follow a step-by-step method', icon: '📋' },
        { id: 'creative', text: 'Try different creative approaches', icon: '🎨' },
        { id: 'collaborative', text: 'Discuss with others for ideas', icon: '👥' },
        { id: 'research', text: 'Look for similar solved problems', icon: '🔎' }
      ]
    },
    {
      id: 'motivationType',
      category: 'Emotional & Behavioral',
      question: 'What motivates you to learn most?',
      options: [
        { id: 'achievement', text: 'Achieving goals and getting results', icon: '🏆' },
        { id: 'curiosity', text: 'Satisfying curiosity and learning new things', icon: '❓' },
        { id: 'social', text: 'Connecting with others and community', icon: '👥' },
        { id: 'practical', text: 'Solving real-world problems', icon: '🔧' }
      ]
    },
    {
      id: 'stressResponse',
      category: 'Emotional & Behavioral',
      question: 'When learning gets challenging, you tend to:',
      options: [
        { id: 'persist', text: 'Keep trying with determination', icon: '💪' },
        { id: 'pause', text: 'Take a break and come back later', icon: '⏸️' },
        { id: 'research', text: 'Look for additional resources', icon: '🔍' },
        { id: 'discuss', text: 'Talk to someone about it', icon: '💬' }
      ]
    },
    {
      id: 'confidenceLevel',
      category: 'Emotional & Behavioral',
      question: 'How confident do you feel about learning new technologies?',
      options: [
        { id: 'very', text: 'Very confident - I learn quickly', icon: '🚀' },
        { id: 'moderate', text: 'Moderately confident with guidance', icon: '👍' },
        { id: 'cautious', text: 'Cautious - need clear instructions', icon: '🧭' },
        { id: 'nervous', text: 'A bit nervous but willing to try', icon: '😅' }
      ]
    },
    {
      id: 'socialLearning',
      category: 'Emotional & Behavioral',
      question: 'How do you feel about learning with others?',
      options: [
        { id: 'prefer_group', text: 'I learn best in groups', icon: '👥' },
        { id: 'mix', text: 'Mix of solo and group learning', icon: '⚖️' },
        { id: 'prefer_solo', text: 'I prefer learning alone', icon: '🧘' },
        { id: 'mentor', text: 'I like one-on-one guidance', icon: '👨‍🏫' }
      ]
    },
    {
      id: 'studyEnvironment',
      category: 'Environmental & Physical',
      question: 'What is your ideal learning environment?',
      options: [
        { id: 'quiet', text: 'Quiet and private space', icon: '🤫' },
        { id: 'background', text: 'Some background noise is okay', icon: '🎵' },
        { id: 'active', text: 'Active environment with people', icon: '🏢' },
        { id: 'outdoor', text: 'Outdoor or natural setting', icon: '🌳' }
      ]
    },
    {
      id: 'energyPatterns',
      category: 'Environmental & Physical',
      question: 'When do you have the most energy for learning?',
      options: [
        { id: 'morning', text: 'Early morning', icon: '🌅' },
        { id: 'afternoon', text: 'Afternoon', icon: '🌞' },
        { id: 'evening', text: 'Evening', icon: '🌇' },
        { id: 'night', text: 'Late night', icon: '🌙' }
      ]
    },
    {
      id: 'focusDuration',
      category: 'Environmental & Physical',
      question: 'How long can you typically focus on one task?',
      options: [
        { id: 'short', text: '15-30 minutes', icon: '⏱️' },
        { id: 'medium', text: '30-60 minutes', icon: '🕐' },
        { id: 'long', text: '1-2 hours', icon: '🕑' },
        { id: 'extended', text: 'More than 2 hours', icon: '🕒' }
      ]
    },
    {
      id: 'techComfort',
      category: 'Technical & Access',
      question: 'How comfortable are you with technology?',
      options: [
        { id: 'expert', text: 'Very comfortable - I explore new tech easily', icon: '💻' },
        { id: 'comfortable', text: 'Comfortable with guidance', icon: '📱' },
        { id: 'basic', text: 'Basic user - need clear instructions', icon: '🔤' },
        { id: 'learning', text: 'Still learning - patient guidance needed', icon: '🎓' }
      ]
    },
    {
      id: 'deviceUsage',
      category: 'Technical & Access',
      question: 'What device do you use most for learning?',
      options: [
        { id: 'smartphone', text: 'Smartphone', icon: '📱' },
        { id: 'tablet', text: 'Tablet', icon: '📟' },
        { id: 'laptop', text: 'Laptop/Computer', icon: '💻' },
        { id: 'multiple', text: 'Multiple devices', icon: '🔀' }
      ]
    },
    {
      id: 'internetStability',
      category: 'Technical & Access',
      question: 'How stable is your internet connection?',
      options: [
        { id: 'excellent', text: 'Excellent - always available', icon: '⚡' },
        { id: 'good', text: 'Good - occasional drops', icon: '👍' },
        { id: 'unstable', text: 'Unstable - frequent interruptions', icon: '📶' },
        { id: 'limited', text: 'Limited - need offline options', icon: '📴' }
      ]
    },
    {
      id: 'offlineNeeds',
      category: 'Technical & Access',
      question: 'How important is offline learning for you?',
      options: [
        { id: 'critical', text: 'Critical - I need full offline access', icon: '📥' },
        { id: 'important', text: 'Important for travel/backup', icon: '🎒' },
        { id: 'sometimes', text: 'Sometimes useful', icon: '🔄' },
        { id: 'rarely', text: 'Rarely need offline', icon: '🌐' }
      ]
    }
  ]

  const handleDNAAnswer = (questionId: string, answerId: string) => {
    setLearnerDNA(prev => ({
      ...prev,
      [questionId]: answerId
    }))

    if (currentQuestion < dnaQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      analyzeCompleteDNA()
      setOnboardingStep(3)
    }
  }

  const analyzeCompleteDNA = () => {
    const strengths = []
    const challenges = []

    if (learnerDNA.learningStyle === 'visual') strengths.push('Strong visual processing')
    if (learnerDNA.informationProcessing === 'global') strengths.push('Big-picture thinking')
    if (learnerDNA.problemSolving === 'creative') strengths.push('Creative problem-solving')
    if (learnerDNA.memoryRetention === 'association') strengths.push('Excellent pattern recognition')

    if (learnerDNA.techComfort === 'learning') challenges.push('May need tech support initially')
    if (learnerDNA.focusDuration === 'short') challenges.push('Benefits from micro-learning')
    if (learnerDNA.confidenceLevel === 'nervous') challenges.push('Needs encouragement and small wins')

    setLearnerDNA(prev => ({
      ...prev,
      cognitiveStrengths: strengths,
      learningChallenges: challenges
    }))
  }

  const simulateVoiceAnalysis = () => {
    setVoiceAnalysis(prev => ({ ...prev, analyzing: true }))
    
    setTimeout(() => {
      setVoiceAnalysis({
        recorded: true,
        analyzing: false,
        tone: 'enthusiastic',
        pace: 'moderate',
        confidence: 75
      })
    }, 4000)
  }

  const handleCompleteDNA = () => {
    // Save DNA answers to localStorage
    localStorage.setItem('user_dna_answers', JSON.stringify(learnerDNA));
    
    // Update user to mark DNA as completed
    const updatedUser = {
      ...user!,
      completed_dna: true
    };
    
    login(updatedUser);
    
    // Redirect to personalized course recommendations
    router.push('/dashboard/learning/recommendations');
  }

  // Onboarding Step 1: AI Learner DNA Introduction
  if (onboardingStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900 text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8"
          >
            <Brain className="w-16 h-16 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Welcome to Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Learner DNA
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            I'm about to create your unique learning fingerprint by analyzing your cognitive patterns, 
            emotional responses, and behavioral cues. This makes every lesson adapt to you in real-time.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-bold mb-2 text-blue-400">Cognitive Analysis</h3>
              <p className="text-gray-400 text-sm">Learning style, memory patterns, problem-solving approach</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-bold mb-2 text-green-400">Emotional Intelligence</h3>
              <p className="text-gray-400 text-sm">Motivation triggers, stress responses, confidence levels</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-bold mb-2 text-purple-400">Behavioral Patterns</h3>
              <p className="text-gray-400 text-sm">Focus duration, environmental preferences, social learning</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOnboardingStep(2)}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl text-lg hover:shadow-2xl transition-all mb-4"
          >
            Begin DNA Analysis
          </motion.button>

          <p className="text-gray-500 text-sm">
            Takes 5-7 minutes • 100% private and secure • Real-time adaptation
          </p>
        </motion.div>
      </div>
    )
  }

  // Onboarding Step 2: Interactive DNA Questions
  if (onboardingStep === 2 && currentQuestion < dnaQuestions.length) {
    const question = dnaQuestions[currentQuestion]
    
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="text-center mb-8">
            <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-4">
              <div 
                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / dnaQuestions.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>AI Learner DNA Analysis</span>
              <span>Question {currentQuestion + 1} of {dnaQuestions.length}</span>
            </div>
            <div className="text-xs text-gray-500">{question.category}</div>
          </div>

          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
              {question.question}
            </h1>
            <p className="text-gray-400 text-lg">
              This helps me understand your natural learning preferences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {question.options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleDNAAnswer(question.id, option.id)}
                className="p-6 rounded-2xl border-2 border-gray-600 bg-gray-800/50 text-left hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl flex-shrink-0">{option.icon}</div>
                  <div>
                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      {option.text}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Your answers are building your unique learning fingerprint...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Onboarding Step 3: Voice & Behavioral Analysis
  if (onboardingStep === 3) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4">
              Voice & Behavioral Analysis
            </h1>
            <p className="text-gray-300 text-lg">
              Let me analyze your voice to understand your emotional state and communication style
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8 mb-8">
            <div className="text-center">
              {!voiceAnalysis.recorded ? (
                <div>
                  <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-500/30">
                    {voiceAnalysis.analyzing ? (
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <span className="text-green-400 text-sm">Analyzing...</span>
                      </div>
                    ) : (
                      <Mic className="w-12 h-12 text-green-400" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-green-400">
                    {voiceAnalysis.analyzing ? 'Analyzing Your Voice Patterns' : 'Record Your Voice Sample'}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 max-w-md mx-auto">
                    {voiceAnalysis.analyzing 
                      ? 'I\'m analyzing speech patterns, tone, pace, and emotional cues...'
                      : 'Read the sentence below in your natural voice. This helps me adapt my teaching style to match yours.'
                    }
                  </p>

                  {!voiceAnalysis.analyzing && (
                    <div className="bg-gray-800/50 rounded-xl p-6 mb-6 max-w-md mx-auto">
                      <p className="text-lg font-medium mb-2">Please read this aloud:</p>
                      <p className="text-gray-300 text-xl italic">
                        "I'm excited to start learning new skills that will help me achieve my goals and make a positive impact."
                      </p>
                    </div>
                  )}

                  {!voiceAnalysis.analyzing && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={simulateVoiceAnalysis}
                      className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-lg transition-all"
                    >
                      Start Recording
                    </motion.button>
                  )}
                </div>
              ) : (
                <div>
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-500/30">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-green-400">
                    Voice Analysis Complete!
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-green-400 font-semibold mb-2">Tone</div>
                      <div className="text-white">{voiceAnalysis.tone}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-blue-400 font-semibold mb-2">Speech Pace</div>
                      <div className="text-white">{voiceAnalysis.pace}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-purple-400 font-semibold mb-2">Confidence</div>
                      <div className="text-white">{voiceAnalysis.confidence}%</div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setOnboardingStep(4)}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl text-lg hover:shadow-xl transition-all"
                  >
                    See Your Complete DNA Profile
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Onboarding Step 4: DNA Results & Personalization
  if (onboardingStep === 4) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-28 h-28 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8"
            >
              <Brain className="w-16 h-16 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Learner DNA
              </span>{' '}
              is Ready! 🧬
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Based on deep analysis of your cognitive patterns, emotional responses, and behavioral cues, 
              I've created your unique learning fingerprint.
            </p>
          </motion.div>

          {/* DNA Profile Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Cognitive Profile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center">
                <Brain className="w-6 h-6 mr-3" />
                Cognitive Profile
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-cyan-400 mb-2">Learning Style</h3>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-lg font-medium">
                      {dnaQuestions.find(q => q.id === 'learningStyle')?.options
                        .find(o => o.id === learnerDNA.learningStyle)?.text}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-green-400 mb-2">Primary Motivation</h3>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="text-lg font-medium">
                      {dnaQuestions.find(q => q.id === 'motivationType')?.options
                        .find(o => o.id === learnerDNA.motivationType)?.text}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-purple-400 mb-2">Cognitive Strengths</h3>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <ul className="space-y-2">
                      {(learnerDNA as any).cognitiveStrengths?.map((strength: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Personalization Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-green-400 flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                AI Personalization Plan
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-yellow-400 mb-2">Real-time Adaptations</h3>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Content tailored to your {learnerDNA.learningStyle} learning style</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Pace adjustment based on your {learnerDNA.focusDuration} focus duration</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Voice tone matching your emotional state</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Offline options for {learnerDNA.internetStability} internet</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">Engagement Strategy</h3>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <p className="text-gray-300">
                      I'll monitor your engagement patterns and adjust content delivery in real-time 
                      to maintain optimal learning flow and motivation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* AI Promise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-400">
              🤖 Your AI Learning Companion is Ready
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              From this moment, every lesson, every explanation, and every interaction will be 
              tailored to your unique learning DNA. I'll evolve with you as you grow.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCompleteDNA}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl text-lg hover:shadow-2xl transition-all"
            >
              See Your Personalized Course Recommendations
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Analyzing your learning DNA...</p>
      </div>
    </div>
  )
}