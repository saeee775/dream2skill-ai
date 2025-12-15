'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, Briefcase, MapPin, DollarSign, Clock, 
  TrendingUp, Users, Award, Star, CheckCircle,
  ExternalLink, Download, Share2, Filter, Search,
  Brain, Zap, Shield, Heart, ArrowRight, BookOpen,
  MessageCircle, Calendar, Building, GraduationCap,
  Smartphone, Leaf, Car, Store, Wifi, HeartPulse
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: 'full-time' | 'part-time' | 'contract' | 'remote'
  experience: string
  skills: string[]
  matchScore: number
  description: string
  postedDate: string
  applyLink: string
  category: string[]
  localOpportunity: boolean
  ruralFriendly: boolean
  governmentScheme: boolean
}

interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced'
  demand: 'high' | 'medium' | 'low'
}

interface MarketTrend {
  skill: string
  demand: number
  avgSalary: string
  growth: string
  employers: string[]
}

export default function CareerOraclePage() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [userSkills, setUserSkills] = useState<Skill[]>([])
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    jobType: 'all',
    location: 'all',
    experience: 'all',
    minSalary: '0',
    remoteOnly: false
  })

  // Simulate user skills from DNA and completed courses
  useEffect(() => {
    const loadUserProfile = () => {
      // Get user DNA from localStorage
      const dnaData = localStorage.getItem('user_dna_answers')
      const userDNA = dnaData ? JSON.parse(dnaData) : {}
      
      // Get enrolled courses
      const enrolledCourses = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('enrollment_')) {
          enrolledCourses.push(key.replace('enrollment_', ''))
        }
      }

      // Generate skills based on DNA and courses
      const skills: Skill[] = []
      
      // Digital skills from DNA
      if (userDNA?.learningStyle === 'visual' || userDNA?.learningStyle === 'reading') {
        skills.push({ name: 'Digital Content Creation', level: 'intermediate', demand: 'high' })
      }
      if (userDNA?.motivationType === 'practical' || userDNA?.motivationType === 'achievement') {
        skills.push({ name: 'Problem Solving', level: 'intermediate', demand: 'high' })
      }
      if (userDNA?.learningSpeed === 'fast' || userDNA?.learningSpeed === 'average') {
        skills.push({ name: 'Quick Learning', level: 'advanced', demand: 'high' })
      }
      
      // Skills from courses
      if (enrolledCourses.includes('mobile-digital-literacy')) {
        skills.push({ name: 'Smartphone Navigation', level: 'intermediate', demand: 'high' })
        skills.push({ name: 'Digital Payments', level: 'beginner', demand: 'high' })
      }
      if (enrolledCourses.includes('smart-farming')) {
        skills.push({ name: 'Precision Agriculture', level: 'beginner', demand: 'medium' })
        skills.push({ name: 'IoT Device Operation', level: 'beginner', demand: 'high' })
      }
      if (enrolledCourses.includes('e-commerce')) {
        skills.push({ name: 'Online Business Setup', level: 'beginner', demand: 'high' })
        skills.push({ name: 'Digital Marketing', level: 'beginner', demand: 'high' })
      }
      if (enrolledCourses.includes('digital-health')) {
        skills.push({ name: 'Health App Usage', level: 'intermediate', demand: 'medium' })
        skills.push({ name: 'Telemedicine Assistance', level: 'beginner', demand: 'high' })
      }

      // Default essential skills
      skills.push(
        { name: 'Communication', level: 'intermediate', demand: 'high' },
        { name: 'Adaptability', level: 'intermediate', demand: 'high' },
        { name: 'Local Language Proficiency', level: 'advanced', demand: 'high' }
      )

      setUserSkills(skills)
    }

    loadUserProfile()
  }, [])

  // Load jobs and market trends
  useEffect(() => {
    const loadCareerData = async () => {
      setLoading(true)

      // Simulated job data for rural India
      const jobData: Job[] = [
        {
          id: '1',
          title: 'Digital Literacy Trainer',
          company: 'Digital India Initiative',
          location: 'Local Community Center',
          salary: '₹8,000 - ₹15,000/month',
          type: 'part-time',
          experience: '0-1 years',
          skills: ['Smartphone Navigation', 'Digital Payments', 'Communication', 'Teaching'],
          matchScore: 92,
          description: 'Train rural community members in basic smartphone usage, digital payments, and internet safety. Government-supported position with flexible hours.',
          postedDate: '2024-03-15',
          applyLink: '#',
          category: ['education', 'technology', 'community'],
          localOpportunity: true,
          ruralFriendly: true,
          governmentScheme: true
        },
        {
          id: '2',
          title: 'Agri-Tech Field Assistant',
          company: 'KrishiTech Solutions',
          location: 'Agricultural Fields',
          salary: '₹10,000 - ₹18,000/month',
          type: 'full-time',
          experience: '0-2 years',
          skills: ['Precision Agriculture', 'IoT Device Operation', 'Problem Solving', 'Agriculture Knowledge'],
          matchScore: 88,
          description: 'Assist farmers with modern agricultural technology, IoT sensors, and data collection. Hands-on role with training provided.',
          postedDate: '2024-03-10',
          applyLink: '#',
          category: ['agriculture', 'technology', 'fieldwork'],
          localOpportunity: true,
          ruralFriendly: true,
          governmentScheme: false
        },
        {
          id: '3',
          title: 'Telemedicine Coordinator',
          company: 'Rural Health Connect',
          location: 'Primary Health Center',
          salary: '₹9,000 - ₹16,000/month',
          type: 'full-time',
          experience: '0-1 years',
          skills: ['Health App Usage', 'Telemedicine Assistance', 'Communication', 'Patient Coordination'],
          matchScore: 85,
          description: 'Coordinate telemedicine sessions between patients and doctors, manage health apps, and assist with digital health records.',
          postedDate: '2024-03-12',
          applyLink: '#',
          category: ['healthcare', 'technology', 'community'],
          localOpportunity: true,
          ruralFriendly: true,
          governmentScheme: true
        },
        {
          id: '4',
          title: 'E-commerce Store Manager',
          company: 'Local Crafts Online',
          location: 'Work from Home',
          salary: '₹7,000 - ₹12,000/month + commission',
          type: 'remote',
          experience: '0-1 years',
          skills: ['Online Business Setup', 'Digital Marketing', 'Customer Service', 'Product Photography'],
          matchScore: 82,
          description: 'Manage online store for local handicrafts, handle customer inquiries, process orders, and coordinate with artisans.',
          postedDate: '2024-03-14',
          applyLink: '#',
          category: ['ecommerce', 'marketing', 'remote'],
          localOpportunity: true,
          ruralFriendly: true,
          governmentScheme: false
        },
        {
          id: '5',
          title: 'EV Repair Technician',
          company: 'Green Mobility Solutions',
          location: 'District Service Center',
          salary: '₹12,000 - ₹20,000/month',
          type: 'full-time',
          experience: '0-2 years',
          skills: ['Electric Vehicle Maintenance', 'Battery Management', 'Technical Skills', 'Safety Protocols'],
          matchScore: 78,
          description: 'Trained in electric vehicle repair and maintenance. Government-certified training provided. Growing field with good career prospects.',
          postedDate: '2024-03-08',
          applyLink: '#',
          category: ['automotive', 'technical', 'green'],
          localOpportunity: true,
          ruralFriendly: true,
          governmentScheme: true
        },
        {
          id: '6',
          title: 'Renewable Energy Installer',
          company: 'Solar Power Pvt Ltd',
          location: 'Multiple Villages',
          salary: '₹9,000 - ₹17,000/month',
          type: 'contract',
          experience: '0-1 years',
          skills: ['Solar Panel Installation', 'Electrical Basics', 'Safety Standards', 'Technical Measurements'],
          matchScore: 75,
          description: 'Install and maintain solar panels in rural households. Training provided. Travel to nearby villages required.',
          postedDate: '2024-03-05',
          applyLink: '#',
          category: ['energy', 'technical', 'fieldwork'],
          localOpportunity: true,
          ruralFriendly: true,
          governmentScheme: true
        }
      ]

      // Market trends data
      const trends: MarketTrend[] = [
        {
          skill: 'Digital Payments',
          demand: 95,
          avgSalary: '₹10,000 - ₹18,000',
          growth: 'Very High',
          employers: ['Banks', 'Payment Apps', 'Local Businesses']
        },
        {
          skill: 'Agri-Tech Operation',
          demand: 88,
          avgSalary: '₹12,000 - ₹22,000',
          growth: 'High',
          employers: ['Agri-Tech Companies', 'Government Schemes', 'Farm Cooperatives']
        },
        {
          skill: 'Telemedicine Assistance',
          demand: 85,
          avgSalary: '₹9,000 - ₹16,000',
          growth: 'Very High',
          employers: ['Hospitals', 'Health NGOs', 'Government Health Centers']
        },
        {
          skill: 'E-commerce Management',
          demand: 82,
          avgSalary: '₹8,000 - ₹15,000',
          growth: 'High',
          employers: ['Online Marketplaces', 'Local Businesses', 'Handicraft Exporters']
        },
        {
          skill: 'EV Repair',
          demand: 78,
          avgSalary: '₹15,000 - ₹25,000',
          growth: 'High',
          employers: ['EV Manufacturers', 'Service Centers', 'Government Training Centers']
        },
        {
          skill: 'Solar Installation',
          demand: 80,
          avgSalary: '₹11,000 - ₹20,000',
          growth: 'High',
          employers: ['Solar Companies', 'Government Projects', 'Energy Cooperatives']
        }
      ]

      setJobs(jobData)
      setFilteredJobs(jobData)
      setMarketTrends(trends)
      
      // Select first job by default
      if (jobData.length > 0) {
        setSelectedJob(jobData[0])
      }
      
      setLoading(false)
    }

    loadCareerData()
  }, [])

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = [...jobs]
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    // Job type filter
    if (filters.jobType !== 'all') {
      filtered = filtered.filter(job => job.type === filters.jobType)
    }
    
    // Remote only filter
    if (filters.remoteOnly) {
      filtered = filtered.filter(job => job.type === 'remote')
    }
    
    // Salary filter
    if (filters.minSalary !== '0') {
      const minSalary = parseInt(filters.minSalary)
      filtered = filtered.filter(job => {
        const salaryMatch = job.salary.match(/₹(\d+,\d+|\d+)/)
        if (salaryMatch) {
          const salaryNum = parseInt(salaryMatch[1].replace(',', ''))
          return salaryNum >= minSalary
        }
        return true
      })
    }
    
    setFilteredJobs(filtered)
  }, [jobs, searchTerm, filters])

  const handleApplyJob = (job: Job) => {
    alert(`Applying for ${job.title} at ${job.company}`)
    // In production: Redirect to application page
  }

  const handleSaveJob = (job: Job) => {
    const savedJobs = JSON.parse(localStorage.getItem('saved_jobs') || '[]')
    if (!savedJobs.find((j: Job) => j.id === job.id)) {
      savedJobs.push(job)
      localStorage.setItem('saved_jobs', JSON.stringify(savedJobs))
      alert('Job saved successfully!')
    } else {
      alert('Job already saved')
    }
  }

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500'
    if (score >= 80) return 'from-blue-500 to-cyan-500'
    if (score >= 70) return 'from-yellow-500 to-amber-500'
    return 'from-gray-500 to-gray-600'
  }

  const getJobTypeColor = (type: string) => {
    switch(type) {
      case 'full-time': return 'bg-green-500/20 text-green-400'
      case 'part-time': return 'bg-blue-500/20 text-blue-400'
      case 'contract': return 'bg-purple-500/20 text-purple-400'
      case 'remote': return 'bg-cyan-500/20 text-cyan-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Analyzing job opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Career Oracle
                    </span>
                  </h1>
                  <p className="text-gray-400">AI-powered job matching for rural India</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-bold">{filteredJobs.length} Jobs</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-bold">92% Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Job List */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search jobs, skills, or companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </button>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({...filters, jobType: 'all'})}
                  className={`px-4 py-2 rounded-lg ${filters.jobType === 'all' ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
                >
                  All Jobs
                </button>
                <button
                  onClick={() => setFilters({...filters, jobType: 'full-time'})}
                  className={`px-4 py-2 rounded-lg ${filters.jobType === 'full-time' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
                >
                  Full-time
                </button>
                <button
                  onClick={() => setFilters({...filters, jobType: 'part-time'})}
                  className={`px-4 py-2 rounded-lg ${filters.jobType === 'part-time' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
                >
                  Part-time
                </button>
                <button
                  onClick={() => setFilters({...filters, jobType: 'remote'})}
                  className={`px-4 py-2 rounded-lg ${filters.jobType === 'remote' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
                >
                  Remote
                </button>
                <button
                  onClick={() => setFilters({...filters, ruralFriendly: true})}
                  className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg hover:bg-gradient-to-r hover:from-green-500/30 hover:to-emerald-500/30"
                >
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-400" />
                    <span>Rural Friendly</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Job List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border rounded-2xl p-6 cursor-pointer transition-all ${
                    selectedJob?.id === job.id
                      ? 'border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10'
                      : 'border-gray-700 hover:border-purple-500/30'
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getMatchColor(job.matchScore)}`}></div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        {job.governmentScheme && (
                          <span className="px-2 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                            Govt Scheme
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2" />
                          {job.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {job.experience}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 4).map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
                            +{job.skills.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs ${getJobTypeColor(job.type)}`}>
                          {job.type.replace('-', ' ').toUpperCase()}
                        </span>
                        {job.localOpportunity && (
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 rounded-full text-xs">
                            Local Opportunity
                          </span>
                        )}
                        {job.ruralFriendly && (
                          <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-full text-xs">
                            Rural Friendly
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Match Score & Actions */}
                    <div className="flex flex-col items-end space-y-4">
                      <div className="text-center">
                        <div className={`text-3xl font-black bg-gradient-to-r ${getMatchColor(job.matchScore)} bg-clip-text text-transparent`}>
                          {job.matchScore}%
                        </div>
                        <div className="text-sm text-gray-400">AI Match</div>
                        <div className="w-24 h-1 bg-gray-700 rounded-full mt-1">
                          <div 
                            className={`h-1 rounded-full bg-gradient-to-r ${getMatchColor(job.matchScore)}`}
                            style={{ width: `${job.matchScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSaveJob(job)
                          }}
                          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleApplyJob(job)
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                  <p className="text-gray-400">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Job Details & User Profile */}
          <div className="space-y-6">
            {/* Selected Job Details */}
            {selectedJob && (
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                    <div className={`text-4xl font-black bg-gradient-to-r ${getMatchColor(selectedJob.matchScore)} bg-clip-text text-transparent`}>
                      {selectedJob.matchScore}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Company</div>
                      <div className="font-bold flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        {selectedJob.company}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Location</div>
                      <div className="font-bold flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedJob.location}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Salary</div>
                      <div className="font-bold flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {selectedJob.salary}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Experience</div>
                      <div className="font-bold flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        {selectedJob.experience}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold mb-2 text-lg">Job Description</h4>
                    <p className="text-gray-300">{selectedJob.description}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-lg">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, index) => (
                        <span key={index} className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApplyJob(selectedJob)}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Apply Now
                    </button>
                    <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* User Skills Profile */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-400" />
                Your Skills Profile
              </h3>
              
              <div className="space-y-4">
                {userSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-xl">
                    <div>
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm text-gray-400">Level: {skill.level}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      skill.demand === 'high' ? 'bg-green-500/20 text-green-400' :
                      skill.demand === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {skill.demand} demand
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-bold text-blue-400">AI Recommendation</div>
                    <div className="text-sm text-gray-300">Complete 2 more courses to reach 95% job match</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Trends */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Market Trends
              </h3>
              
              <div className="space-y-4">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="p-4 bg-gray-800/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold">{trend.skill}</div>
                      <div className="text-green-400 font-bold">{trend.demand}% demand</div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div>Avg Salary: {trend.avgSalary}</div>
                      <div>Growth: {trend.growth}</div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-1">Top Employers:</div>
                      <div className="flex flex-wrap gap-2">
                        {trend.employers.map((employer, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-700/50 rounded text-xs">
                            {employer}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-green-400" />
              <div>
                <h4 className="font-bold text-lg">Government Schemes</h4>
                <p className="text-sm text-gray-400">Verified opportunities with subsidies</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Many jobs come with government training and financial support for rural candidates.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <div>
                <h4 className="font-bold text-lg">Skill Gaps</h4>
                <p className="text-sm text-gray-400">Targeted learning recommendations</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Complete recommended courses to increase your job match score by 15-25%.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="w-8 h-8 text-purple-400" />
              <div>
                <h4 className="font-bold text-lg">Career Guidance</h4>
                <p className="text-sm text-gray-400">Personalized career path</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              AI suggests the best career path based on your skills, location, and market demand.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}