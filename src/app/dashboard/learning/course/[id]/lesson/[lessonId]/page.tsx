// apps/web/src/app/dashboard/learning/course/[id]/lesson/[lessonId]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Play, Pause, Volume2, Maximize, 
  CheckCircle, Download, BookOpen, MessageCircle,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [notes, setNotes] = useState('')

  const courseId = params.id as string
  const lessonId = params.lessonId as string

  const lesson = {
    id: lessonId,
    title: 'Introduction to Smartphones',
    description: 'Learn basic smartphone components and navigation',
    duration: '15:00',
    type: 'video',
    content: 'This lesson covers the fundamental components of a smartphone, including the touchscreen, buttons, ports, and basic navigation gestures.',
    transcript: 'Welcome to your first lesson on smartphone basics. In this lesson, we will explore the different parts of a smartphone and learn how to navigate the interface...',
    nextLesson: '2',
    prevLesson: null
  }

  useEffect(() => {
    // In production: Fetch lesson data and user progress
    const savedProgress = localStorage.getItem(`lesson_${lessonId}_progress`)
    if (savedProgress) {
      setProgress(parseFloat(savedProgress))
    }

    const savedNotes = localStorage.getItem(`lesson_${lessonId}_notes`)
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, [lessonId])

  const handlePlayPause = () => {
    setPlaying(!playing)
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setProgress(value)
    localStorage.setItem(`lesson_${lessonId}_progress`, value.toString())
  }

  const handleComplete = () => {
    setCompleted(true)
    // In production: Mark lesson as complete in backend
    localStorage.setItem(`lesson_${lessonId}_completed`, 'true')
  }

  const handleSaveNotes = () => {
    localStorage.setItem(`lesson_${lessonId}_notes`, notes)
    alert('Notes saved successfully!')
  }

  const handleNextLesson = () => {
    if (lesson.nextLesson) {
      router.push(`/dashboard/learning/course/${courseId}/lesson/${lesson.nextLesson}`)
    }
  }

  const handlePrevLesson = () => {
    if (lesson.prevLesson) {
      router.push(`/dashboard/learning/course/${courseId}/lesson/${lesson.prevLesson}`)
    } else {
      router.push(`/dashboard/learning/course/${courseId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push(`/dashboard/learning/course/${courseId}`)}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Course
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Download
            </button>
            {completed ? (
              <div className="flex items-center text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                Completed
              </div>
            ) : (
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors"
              >
                Mark Complete
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player & Content */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl overflow-hidden mb-6">
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center relative">
                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayPause}
                  className="absolute z-10 w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center"
                >
                  {playing ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </motion.button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={handleProgressChange}
                      className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                    <span className="text-sm text-gray-300">
                      {Math.floor((progress / 100) * 15)}:00 / {lesson.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Content */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                  <p className="text-gray-400">{lesson.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">{lesson.duration}</div>
                  <div className="text-sm text-gray-500">Duration</div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6">{lesson.content}</p>
                
                <div className="bg-gray-800/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-400">Key Takeaways</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Understand smartphone components and their functions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Master basic navigation gestures and touch controls</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Learn to access and use essential smartphone features</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevLesson}
                className={`flex items-center px-6 py-3 rounded-xl transition-all ${lesson.prevLesson ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-900/50 cursor-not-allowed'}`}
                disabled={!lesson.prevLesson}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous Lesson
              </button>

              <button
                onClick={handleNextLesson}
                className={`flex items-center px-6 py-3 rounded-xl transition-all ${lesson.nextLesson ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {lesson.nextLesson ? (
                  <>
                    Next Lesson
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  'Finish Course'
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notes */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                My Notes
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type your notes here..."
                className="w-full h-48 bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-gray-300 resize-none focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSaveNotes}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Save Notes
              </button>
            </div>

            {/* Transcript */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-green-400">Transcript</h3>
              <div className="bg-gray-900/30 rounded-xl p-4 max-h-64 overflow-y-auto">
                <p className="text-gray-300 text-sm leading-relaxed">{lesson.transcript}</p>
              </div>
            </div>

            {/* AI Tutor Chat */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-purple-400 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                AI Tutor
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Have questions about this lesson? Ask your AI tutor!
              </p>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-medium hover:shadow-lg transition-all">
                Ask a Question
              </button>
            </div>

            {/* Lesson Progress */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Lesson Progress</span>
                    <span className="text-yellow-400">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Time Spent</span>
                    <span className="text-green-400">{Math.floor((progress / 100) * 15)}:00 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}