'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, Send, Sparkles, Brain, 
  X, Maximize2, Minimize2, Bot, User,
  Loader2, ThumbsUp, ThumbsDown, BookOpen,
  Lightbulb, HelpCircle, Zap, Target
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  type: 'text' | 'hint' | 'explanation' | 'question'
}

interface TutorState {
  isOpen: boolean
  isMinimized: boolean
  isTyping: boolean
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your AI Tutor. I'm here to help you understand any concepts from your courses. What would you like to learn about?",
    sender: 'ai',
    timestamp: new Date(),
    type: 'text'
  }
]

// Pre-defined responses for demo
const aiResponses = [
  "Great question! Let me explain this concept step by step. First, understand that this is about...",
  "I can help with that! Here's a practical example to illustrate the concept...",
  "That's an interesting topic! Based on your learning style, I'll explain this visually...",
  "I notice you're a hands-on learner. Let me give you a practical exercise to understand this better...",
  "Based on your DNA analysis, you learn best through examples. Here are 3 real-world applications...",
  "Let me break this down into smaller parts for easier understanding. First, we need to look at...",
  "I can see you're struggling with this concept. Let me explain it differently using an analogy...",
  "Perfect timing! I was just about to share some advanced tips on this topic. Here's what you need to know..."
]

const suggestedQuestions = [
  "Can you explain this in simpler terms?",
  "Show me a practical example",
  "How does this apply to real life?",
  "What are the key points to remember?",
  "Can you give me a practice exercise?"
]

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [tutorState, setTutorState] = useState<TutorState>({
    isOpen: false,
    isMinimized: false,
    isTyping: false
  })
  const [promptsUsed, setPromptsUsed] = useState(0)
  const maxPrompts = 5 // Demo limit
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Load DNA data for personalized tutoring
  const [userDNA, setUserDNA] = useState<any>(null)

  useEffect(() => {
    // Load DNA data for personalization
    const dnaKeys = ['user_dna_answers', 'learnerDNA', 'dream2skill_dna_data']
    let dnaData = null
    
    for (const key of dnaKeys) {
      const data = localStorage.getItem(key)
      if (data) {
        try {
          const parsedData = JSON.parse(data)
          if (parsedData && typeof parsedData === 'object') {
            dnaData = parsedData
            break
          }
        } catch (e) {
          console.warn(`Invalid JSON in ${key}:`, e)
        }
      }
    }
    
    setUserDNA(dnaData)
  }, [])

  const getPersonalizedResponse = (userMessage: string): string => {
    // Personalized responses based on DNA
    let baseResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
    
    if (userDNA) {
      if (userDNA.learningStyle === 'visual') {
        baseResponse += " \n\n🎨 **Visual Tip:** I've included diagrams and visual examples in your learning materials."
      } else if (userDNA.learningStyle === 'auditory') {
        baseResponse += " \n\n🎧 **Audio Tip:** Listen to the audio explanations in the course for better understanding."
      } else if (userDNA.learningStyle === 'kinesthetic') {
        baseResponse += " \n\n🛠️ **Hands-on Tip:** Try the practical exercise I've added to your assignments."
      }
      
      if (userDNA.learningSpeed === 'slow' || userDNA.learningSpeed === 'very_slow') {
        baseResponse += " \n\n🐢 **Pace Tip:** Take your time with this. I've broken it down into smaller steps."
      } else if (userDNA.learningSpeed === 'fast' || userDNA.learningSpeed === 'very_fast') {
        baseResponse += " \n\n⚡ **Advanced Tip:** Check out the bonus materials for deeper insights."
      }
    }
    
    return baseResponse
  }

  const handleSendMessage = async () => {
    if (!input.trim() || promptsUsed >= maxPrompts) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setPromptsUsed(prev => prev + 1)
    
    // Show typing indicator
    setTutorState(prev => ({ ...prev, isTyping: true }))

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Add AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: getPersonalizedResponse(input),
      sender: 'ai',
      timestamp: new Date(),
      type: 'explanation'
    }
    
    setMessages(prev => [...prev, aiResponse])
    setTutorState(prev => ({ ...prev, isTyping: false }))
  }

  const handleQuickQuestion = (question: string) => {
    if (promptsUsed >= maxPrompts) return
    setInput(question)
  }

  const toggleTutor = () => {
    setTutorState(prev => ({ 
      ...prev, 
      isOpen: !prev.isOpen,
      isMinimized: false 
    }))
  }

  const toggleMinimize = () => {
    setTutorState(prev => ({ 
      ...prev, 
      isMinimized: !prev.isMinimized 
    }))
  }

  const resetChat = () => {
    setMessages(initialMessages)
    setPromptsUsed(0)
  }

  // Floating tutor button (when minimized or closed)
  if (!tutorState.isOpen || tutorState.isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTutor}
          className="relative"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          
          {/* Notification badge for new messages */}
          {messages.length > 1 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{messages.length - 1}</span>
            </div>
          )}
          
          {/* Pulse animation */}
          <motion.div
            className="absolute inset-0 border-2 border-purple-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.button>
      </div>
    )
  }

  // Full tutor interface
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-purple-500/20 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">AI Tutor</h3>
            <p className="text-xs text-purple-200">
              {userDNA?.learningStyle ? `Personalized for ${userDNA.learningStyle} learners` : 'Your Learning Assistant'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMinimize}
            className="p-2 text-gray-300 hover:text-white"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTutor}
            className="p-2 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Demo Limit Indicator */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-3 border-b border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-300">Demo Mode</span>
          </div>
          <div className="text-sm text-gray-300">
            {promptsUsed}/{maxPrompts} prompts used
          </div>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full mt-2">
          <div 
            className="h-2 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${(promptsUsed / maxPrompts) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'bg-gray-800 border border-purple-500/20'
              }`}>
                <div className="flex items-start space-x-2 mb-2">
                  {message.sender === 'ai' ? (
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-sm">
                      {message.sender === 'ai' ? 'AI Tutor' : 'You'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                
                <div className="whitespace-pre-wrap">{message.content}</div>
                
                {message.sender === 'ai' && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex space-x-2">
                    <button className="text-xs px-2 py-1 bg-gray-700/50 rounded-lg hover:bg-gray-700">
                      <ThumbsUp className="w-3 h-3 inline mr-1" /> Helpful
                    </button>
                    <button className="text-xs px-2 py-1 bg-gray-700/50 rounded-lg hover:bg-gray-700">
                      <ThumbsDown className="w-3 h-3 inline mr-1" /> Not helpful
                    </button>
                    <button className="text-xs px-2 py-1 bg-gray-700/50 rounded-lg hover:bg-gray-700">
                      <BookOpen className="w-3 h-3 inline mr-1" /> Learn more
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {tutorState.isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800 border border-purple-500/20 rounded-2xl p-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-gray-400">AI Tutor is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Prompt limit reached */}
        {promptsUsed >= maxPrompts && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-4"
          >
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="font-bold text-yellow-300">Demo Limit Reached</h4>
                <p className="text-sm text-gray-300">
                  You've used all {maxPrompts} demo prompts. In the full version, 
                  you'll get unlimited AI tutoring personalized to your learning DNA!
                </p>
                <button
                  onClick={resetChat}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                >
                  Reset Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Suggested questions */}
        {promptsUsed === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="text-xs text-gray-400 font-medium">Try asking:</div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm transition-colors text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4">
        {promptsUsed < maxPrompts ? (
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask your AI Tutor anything..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              disabled={tutorState.isTyping}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!input.trim() || tutorState.isTyping}
              className={`px-4 py-3 rounded-xl font-medium ${
                !input.trim() || tutorState.isTyping
                  ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg'
              }`}
            >
              {tutorState.isTyping ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        ) : (
          <div className="text-center p-4 bg-gray-800/50 rounded-xl">
            <p className="text-gray-300 mb-2">Demo prompts exhausted</p>
            <button
              onClick={resetChat}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Reset Demo
            </button>
          </div>
        )}
        
        {/* DNA Personalization Info */}
        {userDNA && (
          <div className="mt-3 text-xs text-gray-400 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Personalized for {userDNA.learningStyle || 'your'} learning style</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="w-3 h-3 text-green-400" />
              <span>{promptsUsed}/{maxPrompts}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}