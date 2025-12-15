'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Brain, User, Sparkles, MessageCircle, ChevronRight } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AITutorModalProps {
  isOpen: boolean
  onClose: () => void
  lessonTitle: string
}

export default function AITutorModal({ 
  isOpen, 
  onClose, 
  lessonTitle
}: AITutorModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Namaste! 👋 I'm your AI Tutor for "${lessonTitle}".\n\nI can help explain smartphone basics like touch gestures, buttons, charging, and apps. What would you like to know?`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Generate AI response based on keywords
  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    // Button questions
    if (lowerQuestion.includes('button') || lowerQuestion.includes('power') || lowerQuestion.includes('volume')) {
      return `**Smartphone Buttons:**\n\n📱 **Power Button** - Usually on the side:\n• Press once: Wake/lock screen\n• Press & hold: Turn phone on/off\n• Double press: Open camera (on some phones)\n\n🔊 **Volume Buttons** - Next to power button:\n• Volume Up/Down: Adjust sound\n• Press both: Take screenshot\n\nSome phones have a **Bixby/Assistant** button or use gestures instead of home buttons.`
    }
    
    // Touch/gesture questions
    if (lowerQuestion.includes('touch') || lowerQuestion.includes('gesture') || lowerQuestion.includes('swipe')) {
      return `**Touch Gestures:**\n\n👉 **Tap** - Light touch to select\n🎯 **Double Tap** - Zoom in/out in photos\n↕️ **Swipe Up/Down** - Scroll content\n⬅️➡️ **Swipe Left/Right** - Switch pages\n🤏 **Pinch** - Spread to zoom in, pinch to zoom out\n⏱️ **Long Press** - Hold for options\n\n💡 **Pro Tip:** Use clean, dry fingers for best response. Wet or greasy fingers might not work well.`
    }
    
    // Screen questions
    if (lowerQuestion.includes('screen') || lowerQuestion.includes('touchscreen') || lowerQuestion.includes('display')) {
      return `**Touchscreen Basics:**\n\n📺 **Screen Areas:**\n• Top: Status bar (time, battery)\n• Middle: Main content area\n• Bottom: Navigation gestures\n\n🔔 **Notifications:** Swipe down from top\n⚙️ **Quick Settings:** Swipe down twice or from top-right\n🏠 **Go Home:** Swipe up from bottom edge\n📱 **Switch Apps:** Swipe up and hold, then swipe left/right\n\n🛡️ **Protect your screen:** Use a screen protector!`
    }
    
    // Battery/charging questions
    if (lowerQuestion.includes('charge') || lowerQuestion.includes('battery') || lowerQuestion.includes('port')) {
      return `**Charging & Battery:**\n\n🔌 **Charging Port:** Usually at bottom (USB-C or Lightning)\n⚡ **Fast Charging:** Works with original charger\n🔋 **Battery Care:**\n• Charge when below 20%\n• Unplug around 80-90%\n• Avoid overnight charging\n• Don't use while charging\n\n📱 **Battery Saver Mode:** Turns on automatically at 20% or can be enabled manually.`
    }
    
    // App questions
    if (lowerQuestion.includes('app') || lowerQuestion.includes('application') || lowerQuestion.includes('icon')) {
      return `**Using Apps:**\n\n📲 **App Icons:** Colorful squares on home screen\n🎯 **Open App:** Tap icon once\n❌ **Close App:** Swipe up from bottom, then swipe app away\n➕ **Install Apps:**\n• Android: Google Play Store (colorful triangle)\n• iPhone: App Store (blue 'A')\n\n📱 **Essential Apps to Start:**\n1. **Phone** - Make calls\n2. **Messages** - Send texts\n3. **Camera** - Take photos\n4. **Gallery** - View photos\n5. **Settings** - Adjust phone options`
    }
    
    // General questions
    if (lowerQuestion.includes('what') && lowerQuestion.includes('learn')) {
      return `**In this lesson you'll learn:**\n\n✅ **Phone Parts:** Buttons, ports, screen\n✅ **Navigation:** Touch gestures, swiping\n✅ **Basics:** Turning on/off, charging\n✅ **Apps:** Opening, closing, installing\n✅ **Daily Use:** Making calls, taking photos\n\nIs there any specific part you'd like me to explain more?`
    }
    
    if (lowerQuestion.includes('hi') || lowerQuestion.includes('hello') || lowerQuestion.includes('namaste')) {
      return `Namaste! 🙏\n\nI'm your AI Tutor for **${lessonTitle}**.\n\nYou can ask me about:\n• Smartphone buttons and functions\n• Touchscreen gestures\n• Charging and battery care\n• Using apps\n• Any confusion you have!\n\nWhat's on your mind?`
    }
    
    if (lowerQuestion.includes('help') || lowerQuestion.includes('confus') || lowerQuestion.includes('dont understand')) {
      return `No worries! Let me help you understand.\n\n📚 **Learning Tips:**\n1. Go step by step - master one thing at a time\n2. Practice each gesture 5-10 times\n3. Don't rush - it's normal to take time\n4. Ask specific questions (like "how do I...?")\n\nWhich part is confusing? Tell me exactly what you're trying to do.`
    }
    
    // Default response
    return `Thanks for your question! Regarding **${question}**:\n\nFrom this lesson on smartphone basics, remember these key points:\n1. **Touch gently** - no need to press hard\n2. **Each button has one main function**\n3. **Charge daily** but don't overcharge\n4. **Practice makes perfect** with new gestures\n\nCould you tell me more about what specifically you'd like to know? This helps me give you better guidance!`
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI thinking (800-1200ms)
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))

    // Generate and add AI response
    const aiResponse = generateAIResponse(input)
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, aiMessage])
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Quick suggestions - when clicked, they should send immediately
  const quickQuestions = [
    "What are the main buttons?",
    "How do I use the touchscreen?",
    "Where is the charging port?",
    "How to open apps?",
    "Explain smartphone gestures",
    "How to take a screenshot?"
  ]

  const handleQuickQuestion = async (question: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 600))

    // Generate and add AI response
    const aiResponse = generateAIResponse(question)
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, aiMessage])
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">AI Tutor</h3>
                  <p className="text-sm text-gray-400 flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Helping with: {lessonTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30'
                      : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.role === 'assistant' ? (
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                      <span className="text-sm text-gray-400 ml-2">AI Tutor is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-400">Quick questions:</span>
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  disabled={isLoading}
                  className="px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-sm text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border hover:border-purple-500/30"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10 bg-gray-900/50">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about smartphone basics..."
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-sm"
                  disabled={isLoading}
                />
                <Sparkles className="absolute right-4 top-3.5 w-4 h-4 text-purple-400" />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center min-w-[80px]"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Ask anything about this lesson. Responses are AI-simulated for learning.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}