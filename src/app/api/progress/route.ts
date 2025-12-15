// apps/web/app/api/progress/route.ts
import { NextRequest, NextResponse } from 'next/server'
import JSONDatabase from '@/lib/db/json-db'
import { authMiddleware } from '@/lib/auth'

// Get user's learning progress
async function handler(req: NextRequest & { user: any }) {
  try {
    const userId = req.user.id

    const [enrollments, progressRecords, certificates] = await Promise.all([
      // Active enrollments
      JSONDatabase.getEnrollments(userId, false),
      // Progress records
      JSONDatabase.getProgress(userId),
      // Certificates earned
      JSONDatabase.getCertificates(userId)
    ])

    // Get courses data for enrollments
    const courses = await JSONDatabase.getCourses()
    const enrollmentsWithCourses = enrollments.map((enrollment: any) => ({
      ...enrollment,
      course: courses.find((course: any) => course.id === enrollment.courseId)
    }))

    const certificatesWithCourses = certificates.map((cert: any) => ({
      ...cert,
      course: courses.find((course: any) => course.id === cert.courseId)
    }))

    // Calculate overall progress
    const totalTimeSpent = progressRecords.reduce((sum, progress) => sum + (progress.timeSpent || 0), 0)
    const completedLessons = progressRecords.filter(p => p.isCompleted).length

    const stats = {
      activeCourses: enrollments.length,
      completedLessons,
      certificatesEarned: certificates.length,
      totalLearningTime: Math.floor(totalTimeSpent / 3600), // in hours
      streak: calculateLearningStreak(userId) // Would implement streak calculation
    }

    return NextResponse.json({
      success: true,
      data: {
        stats,
        enrollments: enrollmentsWithCourses,
        certificates: certificatesWithCourses
      }
    })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

async function calculateLearningStreak(userId: string): Promise<number> {
  // Implement streak calculation logic
  return 7 // Placeholder
}

export const GET = authMiddleware(handler)