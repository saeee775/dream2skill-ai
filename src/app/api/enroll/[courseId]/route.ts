// apps/web/app/api/enroll/[courseId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import JSONDatabase from '@/lib/db/json-db'
import { authMiddleware } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params

    const handler = authMiddleware(async (req: NextRequest & { user: any }) => {
      const userId = req.user.id

      // Check if already enrolled
      const existingEnrollment = await JSONDatabase.findEnrollment(userId, courseId)

      if (existingEnrollment) {
        return NextResponse.json({
          success: true,
          data: existingEnrollment,
          message: 'Already enrolled'
        })
      }

      // Create enrollment
      const enrollment = await JSONDatabase.createEnrollment({
        userId,
        courseId,
        progressPercentage: 0
      })

      // Update course enrollment count
      const course = await JSONDatabase.findCourse(courseId)
      if (course) {
        await JSONDatabase.updateCourse(courseId, {
          totalEnrollments: (course.totalEnrollments || 0) + 1
        })
      }

      // Get enrollment with course data
      const enrollmentWithCourse = {
        ...enrollment,
        course: course
      }

      return NextResponse.json({
        success: true,
        data: enrollmentWithCourse
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