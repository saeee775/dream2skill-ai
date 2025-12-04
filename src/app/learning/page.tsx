// apps/web/src/app/learning/page.tsx
'use client'
import { motion } from 'framer-motion'
import { Play, Lock, Users, Star, Download, Clock, Zap, Target, Brain, Code, TrendingUp, Heart, Smartphone, Globe, Wifi } from 'lucide-react'
import Link from 'next/link'

export default function LearningPage() {
  const categories = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Digital & Tech Skills',
      description: 'Coding, AI, Web Development, Mobile Apps, Digital Marketing',
      color: 'from-blue-500 to-cyan-500',
      lessons: 120
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Business & Entrepreneurship',
      description: 'Startups, E-commerce, Finance, Marketing, Management',
      color: 'from-green-500 to-emerald-500',
      lessons: 85
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI & Future Technologies',
      description: 'Machine Learning, ChatGPT, Automation, Data Science',
      color: 'from-purple-500 to-pink-500',
      lessons: 65
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Opportunities',
      description: 'Remote Work, Freelancing, International Jobs, Export Business',
      color: 'from-orange-500 to-red-500',
      lessons: 45
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile & App Development',
      description: 'Android, iOS, Flutter, React Native, App Publishing',
      color: 'from-indigo-500 to-blue-500',
      lessons: 70
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Healthcare & Wellness',
      description: 'Telemedicine, Health Tech, Nutrition, Mental Wellness',
      color: 'from-pink-500 to-rose-500',
      lessons: 55
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: 'Digital Literacy',
      description: 'Internet Basics, Online Safety, Social Media, Digital Banking',
      color: 'from-cyan-500 to-blue-500',
      lessons: 40
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Career Development',
      description: 'Resume Building, Interviews, Career Growth, Leadership',
      color: 'from-yellow-500 to-orange-500',
      lessons: 60
    }
  ]

  const trendingSkills = [
    {
      name: 'AI Prompt Engineering',
      demand: 'Very High',
      avgSalary: '₹8-15L',
      growth: '300%'
    },
    {
      name: 'Full Stack Development',
      demand: 'High', 
      avgSalary: '₹6-12L',
      growth: '45%'
    },
    {
      name: 'Digital Marketing',
      demand: 'High',
      avgSalary: '₹4-8L', 
      growth: '35%'
    },
    {
      name: 'Data Science',
      demand: 'Very High',
      avgSalary: '₹7-14L',
      growth: '50%'
    }
  ]

  const sampleLessons = [
    {
      id: 1,
      title: 'AI Chatbot Development',
      category: 'AI & Tech',
      duration: '12 min',
      language: 'Hindi/English',
      level: 'Beginner',
      locked: false,
      instructor: 'Dr. Priya Sharma',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Web Development Basics',
      category: 'Coding',
      duration: '15 min',
      language: 'Hindi',
      level: 'Beginner', 
      locked: true,
      instructor: 'Rahul Kumar',
      rating: 4.6
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      category: 'Business',
      duration: '10 min',
      language: 'Tamil/English',
      level: 'Intermediate',
      locked: true,
      instructor: 'Anita Desai',
      rating: 4.9
    },
    {
      id: 4,
      title: 'Mobile App with Flutter',
      category: 'App Development',
      duration: '18 min',
      language: 'English',
      level: 'Intermediate',
      locked: true,
      instructor: 'Kiran Patel',
      rating: 4.7
    },
    {
      id: 5,
      title: 'Data Analysis with Python',
      category: 'Data Science',
      duration: '14 min',
      language: 'Hindi',
      level: 'Intermediate',
      locked: true,
      instructor: 'Dr. Amit Verma',
      rating: 4.8
    },
    {
      id: 6,
      title: 'E-commerce Business Setup',
      category: 'Entrepreneurship',
      duration: '16 min',
      language: 'Marathi',
      level: 'Beginner',
      locked: true,
      instructor: 'Neha Singh',
      rating: 4.5
    },
    {
      id: 7,
      title: 'Remote Work Success',
      category: 'Career',
      duration: '8 min',
      language: 'English',
      level: 'Beginner',
      locked: true,
      instructor: 'Rajesh Mehta',
      rating: 4.7
    },
    {
      id: 8,
      title: 'Health Tech Basics',
      category: 'Healthcare',
      duration: '11 min',
      language: 'Bengali',
      level: 'Beginner',
      locked: true,
      instructor: 'Dr. Sunita Reddy',
      rating: 4.9
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DREAM2SKILL
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/login" 
                className="text-gray-300 hover:text-white font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/auth/register"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Future Skills
            </span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              For Everyone
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Master AI, coding, digital skills and emerging technologies. 
            Access world-class education regardless of your location or background.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/auth/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Start Learning Free
              </motion.button>
            </Link>
            <Link href="/demo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-cyan-500/30 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500/10 transition-all"
              >
                Watch Platform Demo
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Course Glimpse Section */}
      <section className="py-16 px-6 bg-gray-800/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-center mb-4"
          >
            Get a <span className="text-green-400">Glimpse</span> of Our Courses
          </motion.h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Preview our most popular lessons. Unlock full access when you create your free account.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 group relative hover:border-blue-500/30 transition-all duration-300"
              >
                {lesson.locked && (
                  <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Sign Up to Unlock</p>
                    </div>
                  </div>
                )}
                
                {/* Lesson Thumbnail */}
                <div className="w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  {lesson.locked ? (
                    <Lock className="w-8 h-8 text-gray-400" />
                  ) : (
                    <div className="text-center">
                      <Play className="w-8 h-8 text-white mx-auto mb-2" />
                      <span className="text-white text-sm font-medium">Preview Available</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lesson.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      lesson.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {lesson.level}
                    </span>
                  </div>
                </div>
                
                {/* Lesson Info */}
                <h3 className="font-bold text-white mb-2 line-clamp-2">{lesson.title}</h3>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{lesson.category}</span>
                  <span>{lesson.duration}</span>
                </div>
                
                {/* Instructor & Rating */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-cyan-400">{lesson.language}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-gray-300">{lesson.rating}</span>
                  </div>
                </div>
                
                {/* Instructor */}
                <div className="text-xs text-gray-500 mt-2">by {lesson.instructor}</div>
              </motion.div>
            ))}
          </div>

          {/* View All CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <Link href="/auth/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Unlock All 500+ Lessons
              </motion.button>
            </Link>
            <p className="text-gray-400 text-sm mt-4">
              Free forever • No credit card required
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-center mb-4"
          >
            Explore <span className="text-green-400">500+</span> Skills
          </motion.h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From AI programming to digital business, master the skills that shape the future
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group hover:border-blue-500/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{category.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{category.description}</p>
                <div className="text-xs text-cyan-400">{category.lessons} lessons</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Skills */}
      <section className="py-16 px-6 bg-gray-800/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-center mb-12"
          >
            <span className="text-yellow-400">High-Demand</span> Skills
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {trendingSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-white text-lg">{skill.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    skill.demand === 'Very High' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {skill.demand} Demand
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Avg Salary</div>
                    <div className="text-green-400 font-semibold">{skill.avgSalary}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Growth</div>
                    <div className="text-cyan-400 font-semibold">{skill.growth}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Your <span className="text-cyan-400">Future</span> Starts Here
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Whether you're in a metro city or remote village, access the same world-class education
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black rounded-xl text-lg hover:shadow-2xl transition-all"
              >
                Start Your Journey
              </motion.button>
            </Link>
            <p className="text-gray-400 text-sm">
              Free forever • 10+ languages • Offline available
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}