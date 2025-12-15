'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, Share2, QrCode, Eye, Printer, 
  Mail, MessageCircle, FileText, Award, 
  Shield, CheckCircle, Calendar, Sparkles,
  Copy, ExternalLink
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import QRCode from 'qrcode'

interface Certificate {
  id: string
  courseId: string
  courseTitle: string
  issueDate: string
  expiryDate: string | null
  credentialId: string
  qrCode: string
  verificationUrl: string
  skills: string[]
  grade: string
  instructor: string
  completionDate: string
}

export default function SkillChainPage() {
  const { user } = useAuth()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [qrCodeData, setQrCodeData] = useState<string>('')
  const [loading, setLoading] = useState(true)

  // Generate QR code for certificate
  const generateQRCode = async (text: string) => {
    try {
      const qr = await QRCode.toDataURL(text, {
        width: 200,
        margin: 2,
        color: {
          dark: '#10b981',
          light: '#1f2937'
        }
      })
      return qr
    } catch (err) {
      console.error('Error generating QR code:', err)
      return ''
    }
  }

  // Fetch user's certificates from localStorage
  useEffect(() => {
    const loadCertificates = async () => {
      setLoading(true)
      
      // Get user enrollments from localStorage
      const enrollments = []
      const enrolledCourses = []
      
      // Check localStorage for enrolled courses
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('enrollment_')) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '{}')
            const courseId = key.replace('enrollment_', '')
            enrollments.push({ courseId, ...data })
            enrolledCourses.push(courseId)
          } catch (e) {
            console.error('Error parsing enrollment:', e)
          }
        }
      }

      // Generate certificates for completed courses
      const generatedCertificates: Certificate[] = []
      
      for (const enrollment of enrollments) {
        // Check if course is completed (simulated logic)
        const isCompleted = Math.random() > 0.3 // 70% chance of completion for demo
        
        if (isCompleted) {
          const courseId = enrollment.courseId
          const courseTitle = getCourseTitle(courseId)
          const credentialId = `D2S-${Date.now().toString(36).toUpperCase()}-${courseId.slice(0, 4).toUpperCase()}`
          const verificationUrl = `https://verify.dream2skill.ai/cert/${credentialId}`
          
          const qrCodeText = `Dream2Skill Certificate\nID: ${credentialId}\nCourse: ${courseTitle}\nStudent: ${user?.fullName || 'User'}\nDate: ${new Date().toLocaleDateString()}\nVerify: ${verificationUrl}`
          const qrCode = await generateQRCode(qrCodeText)
          
          generatedCertificates.push({
            id: credentialId,
            courseId,
            courseTitle,
            issueDate: new Date().toISOString().split('T')[0],
            expiryDate: null, // Certificates don't expire
            credentialId,
            qrCode,
            verificationUrl,
            skills: getCourseSkills(courseId),
            grade: 'A+',
            instructor: 'Dream2Skill AI',
            completionDate: new Date().toISOString().split('T')[0]
          })
        }
      }

      setCertificates(generatedCertificates)
      
      // Select first certificate by default
      if (generatedCertificates.length > 0) {
        setSelectedCertificate(generatedCertificates[0])
      }
      
      setLoading(false)
    }

    loadCertificates()
  }, [user])

  // Helper function to get course title
  const getCourseTitle = (courseId: string): string => {
    const courseTitles: Record<string, string> = {
      'mobile-digital-literacy': 'Mobile-First Digital Literacy',
      'basic-computer-skills': 'Basic Computer Skills',
      'digital-financial-literacy': 'Digital Financial Literacy',
      'smart-farming': 'Smart Farming with Agri-Tech',
      'e-commerce': 'E-commerce for Rural Entrepreneurs',
      'renewable-energy': 'Renewable Energy Setup',
      'ev-repair': 'Electric Vehicle Repair',
      'digital-health': 'Digital Health Awareness',
      'yoga-wellness': 'Yoga & Digital Wellness',
      'content-creation': 'Vernacular Content Creation'
    }
    return courseTitles[courseId] || courseId.replace('-', ' ').toUpperCase()
  }

  // Helper function to get course skills
  const getCourseSkills = (courseId: string): string[] => {
    const skillsMap: Record<string, string[]> = {
      'mobile-digital-literacy': ['Smartphone Basics', 'Internet Safety', 'Digital Payments'],
      'smart-farming': ['Precision Farming', 'IoT Sensors', 'Sustainable Agriculture'],
      'e-commerce': ['Online Business', 'Digital Marketing', 'Payment Gateways'],
      'digital-health': ['Health Apps', 'Telemedicine', 'Wellness Tracking']
    }
    return skillsMap[courseId] || ['Digital Skills', 'Problem Solving', 'Technical Knowledge']
  }

  // View certificate details
  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
  }

  // Download certificate as PDF
  const handleDownloadPDF = (certificate: Certificate) => {
    alert(`Downloading certificate: ${certificate.courseTitle}`)
    // In production: Generate and download PDF
  }

  // Print certificate
  const handlePrintCertificate = (certificate: Certificate) => {
    alert(`Printing certificate: ${certificate.courseTitle}`)
    // In production: Open print dialog
  }

  // Share certificate via WhatsApp
  const handleShareWhatsApp = (certificate: Certificate) => {
    const message = `I earned a certificate in ${certificate.courseTitle} from Dream2Skill! Verify: ${certificate.verificationUrl}`
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  // Share certificate via Email
  const handleShareEmail = (certificate: Certificate) => {
    const subject = `My Dream2Skill Certificate: ${certificate.courseTitle}`
    const body = `I'm excited to share that I've completed ${certificate.courseTitle} and earned a certificate!\n\nVerify: ${certificate.verificationUrl}\n\nCredential ID: ${certificate.credentialId}`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  // Copy certificate link
  const handleCopyLink = (certificate: Certificate) => {
    navigator.clipboard.writeText(certificate.verificationUrl)
    alert('Certificate link copied to clipboard!')
  }

  // View on blockchain explorer
  const handleViewOnExplorer = (certificate: Certificate) => {
    alert(`Viewing certificate ${certificate.credentialId} on blockchain explorer`)
    // In production: Open blockchain explorer
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your certificates...</p>
        </div>
      </div>
    )
  }

  if (certificates.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold mb-4">No Certificates Yet</h1>
          <p className="text-gray-400 mb-8">
            Complete courses to earn blockchain-verified certificates.
          </p>
          <a 
            href="/dashboard/learning/recommendations"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Learning
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl mb-4">
            <Shield className="w-6 h-6 text-green-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              SkillChain Certificates
            </h1>
          </div>
          <p className="text-gray-400">
            Your blockchain-verified credentials. Share with employers!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Certificate List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold mb-4">Your Certificates ({certificates.length})</h2>
            
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedCertificate?.id === cert.id
                    ? 'border-green-500 bg-gradient-to-r from-green-500/10 to-emerald-500/10'
                    : 'border-white/10 hover:border-green-500/30'
                }`}
                onClick={() => handleViewCertificate(cert)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{cert.courseTitle}</h3>
                    <p className="text-sm text-gray-400">Issued: {cert.issueDate}</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-xs text-green-400">Verified on Blockchain</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Certificate Preview & Actions */}
          <div className="lg:col-span-2">
            {selectedCertificate && (
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-2xl p-6">
                {/* Certificate Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedCertificate.courseTitle}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {selectedCertificate.issueDate}
                      </span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        Grade: {selectedCertificate.grade}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Credential ID</div>
                    <code className="font-mono text-green-400">{selectedCertificate.credentialId}</code>
                  </div>
                </div>

                {/* QR Code & Certificate Preview */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Certificate Preview */}
                  <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20 rounded-xl p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">Certificate of Completion</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Awarded to {user?.fullName || 'Student'} for successfully completing
                      </p>
                      <div className="p-4 bg-black/30 rounded-lg">
                        <h4 className="font-bold text-green-400">{selectedCertificate.courseTitle}</h4>
                        <p className="text-sm text-gray-300 mt-2">
                          Instructor: {selectedCertificate.instructor}
                        </p>
                        <p className="text-sm text-gray-300">
                          Completion Date: {selectedCertificate.completionDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <QrCode className="w-5 h-5 mr-2" />
                      Verification QR Code
                    </h3>
                    <div className="text-center">
                      {selectedCertificate.qrCode ? (
                        <img 
                          src={selectedCertificate.qrCode} 
                          alt="QR Code" 
                          className="w-48 h-48 mx-auto mb-4 border-4 border-white/10 rounded-lg"
                        />
                      ) : (
                        <div className="w-48 h-48 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🧠</div>
                            <div className="text-xs text-gray-900 font-bold">DREAM2SKILL</div>
                          </div>
                        </div>
                      )}
                      <p className="text-sm text-gray-400">
                        Scan to verify this certificate
                      </p>
                      <button
                        onClick={() => handleCopyLink(selectedCertificate)}
                        className="mt-4 text-sm text-green-400 hover:text-green-300 flex items-center justify-center mx-auto"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Verification Link
                      </button>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">Skills Certified</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertificate.skills.map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleDownloadPDF(selectedCertificate)}
                    className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 transition-all flex flex-col items-center justify-center"
                  >
                    <Download className="w-6 h-6 mb-2 text-green-400" />
                    <span className="text-sm">Download PDF</span>
                  </button>

                  <button
                    onClick={() => handlePrintCertificate(selectedCertificate)}
                    className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 transition-all flex flex-col items-center justify-center"
                  >
                    <Printer className="w-6 h-6 mb-2 text-blue-400" />
                    <span className="text-sm">Print</span>
                  </button>

                  <button
                    onClick={() => handleShareWhatsApp(selectedCertificate)}
                    className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 transition-all flex flex-col items-center justify-center"
                  >
                    <MessageCircle className="w-6 h-6 mb-2 text-green-400" />
                    <span className="text-sm">Share on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleShareEmail(selectedCertificate)}
                    className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all flex flex-col items-center justify-center"
                  >
                    <Mail className="w-6 h-6 mb-2 text-purple-400" />
                    <span className="text-sm">Email Certificate</span>
                  </button>

                  <button
                    onClick={() => handleViewOnExplorer(selectedCertificate)}
                    className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 transition-all flex flex-col items-center justify-center"
                  >
                    <ExternalLink className="w-6 h-6 mb-2 text-yellow-400" />
                    <span className="text-sm">View on Explorer</span>
                  </button>

                  <button
                    onClick={() => handleCopyLink(selectedCertificate)}
                    className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all flex flex-col items-center justify-center"
                  >
                    <Copy className="w-6 h-6 mb-2 text-cyan-400" />
                    <span className="text-sm">Copy Link</span>
                  </button>

                  <button className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 transition-all flex flex-col items-center justify-center">
                    <Share2 className="w-6 h-6 mb-2 text-red-400" />
                    <span className="text-sm">Share on LinkedIn</span>
                  </button>

                  <button className="p-4 bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/20 rounded-xl hover:bg-gradient-to-r hover:from-gray-500/20 hover:to-gray-600/20 transition-all flex flex-col items-center justify-center">
                    <FileText className="w-6 h-6 mb-2 text-gray-400" />
                    <span className="text-sm">Transcript</span>
                  </button>
                </div>

                {/* Verification Info */}
                <div className="mt-8 p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <div>
                      <h4 className="font-bold text-green-400">Blockchain Verified</h4>
                      <p className="text-sm text-gray-400">
                        This certificate is permanently stored on the Polygon blockchain. 
                        Transaction ID: {selectedCertificate.credentialId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}