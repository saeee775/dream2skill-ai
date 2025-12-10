// apps/web/app/api/progress/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '@/lib/auth'

const prisma = new PrismaClient()

// Get user's learning progress
async function handler(req: NextRequest & { user: any }) {
  try {
    const userId = req.user.id
    
    const [enrollments, completedLessons, certificates] = await Promise.all([
      // Active enrollments
      prisma.enrollment.findMany({
        where: { userId, isCompleted: false },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              category: true,
              thumbnailUrl: true
            }
          }
        },
        orderBy: { lastAccessed: 'desc' }
      }),
      
      // Completed lessons count
      prisma.progress.count({
        where: { userId, isCompleted: true }
      }),
      
      // Certificates earned
      prisma.certificate.findMany({
        where: { userId },
        include: {
          course: {
            select: {
              title: true,
              category: true
            }
          }
        }
      })
    ])
    
    // Calculate overall progress
    const totalTimeSpent = await prisma.progress.aggregate({
      where: { userId },
      _sum: { timeSpent: true }
    })
    
    const stats = {
      activeCourses: enrollments.length,
      completedLessons,
      certificatesEarned: certificates.length,
      totalLearningTime: Math.floor((totalTimeSpent._sum.timeSpent || 0) / 3600), // in hours
      streak: calculateLearningStreak(userId) // Would implement streak calculation
    }
    
    return NextResponse.json({
      success: true,
      data: {
        stats,
        enrollments,
        certificates
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

// apps/web/app/api/enroll/[courseId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const handler = authMiddleware(async (req: NextRequest & { user: any }) => {
      const userId = req.user.id
      const courseId = params.courseId
      
      // Check if already enrolled
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        }
      })
      
      if (existingEnrollment) {
        return NextResponse.json({
          success: true,
          data: existingEnrollment,
          message: 'Already enrolled'
        })
      }
      
      // Create enrollment
      const enrollment = await prisma.enrollment.create({
        data: {
          userId,
          courseId,
          progressPercentage: 0
        },
        include: {
          course: {
            include: {
              modules: {
                include: {
                  lessons: true
                }
              }
            }
          }
        }
      })
      
      // Update course enrollment count
      await prisma.course.update({
        where: { id: courseId },
        data: {
          totalEnrollments: { increment: 1 }
        }
      })
      
      return NextResponse.json({
        success: true,
        data: enrollment
      }, { status: 201 })
    })
    
    return handler(request, {} as any)
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}