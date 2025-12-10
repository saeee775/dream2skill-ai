// apps/web/scripts/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Dream2Skill AI database...')
  
  // Create sample courses (matching your frontend courses)
  const courses = [
    {
      title: 'Mobile-First Digital Literacy',
      description: 'Master smartphone basics, internet safety, and essential apps for daily life. Learn to use UPI, WhatsApp, and government services on your mobile.',
      shortDescription: 'Smartphone basics & internet safety',
      category: 'FOUNDATIONAL_SKILLS',
      difficulty: 'BEGINNER',
      estimatedDuration: 180, // 3 hours
      tags: ['mobile', 'digital', 'safety', 'basics'],
      language: 'HINDI',
      isFree: true,
      thumbnailUrl: '/images/courses/digital-literacy.jpg'
    },
    {
      title: 'Basic Computer Skills',
      description: 'Learn computer operations from scratch - typing, file management, email, and basic software usage for rural job opportunities.',
      shortDescription: 'Computer operations for beginners',
      category: 'FOUNDATIONAL_SKILLS',
      difficulty: 'BEGINNER',
      estimatedDuration: 240, // 4 hours
      tags: ['computer', 'typing', 'files', 'email'],
      language: 'HINDI',
      isFree: true,
      thumbnailUrl: '/images/courses/computer-skills.jpg'
    },
    // Add more courses matching your 20+ courses list
  ]
  
  for (const courseData of courses) {
    await prisma.course.upsert({
      where: { title: courseData.title },
      update: {},
      create: {
        ...courseData,
        modules: {
          create: [
            {
              title: 'Module 1: Getting Started',
              order: 1,
              duration: 45,
              lessons: {
                create: [
                  {
                    title: 'Lesson 1: Introduction to Digital World',
                    order: 1,
                    duration: 3,
                    contentType: 'VIDEO',
                    offlineAvailable: true,
                    downloadSize: 15.5
                  },
                  {
                    title: 'Lesson 2: Understanding Your Device',
                    order: 2,
                    duration: 3,
                    contentType: 'INTERACTIVE',
                    offlineAvailable: true,
                    downloadSize: 8.2
                  }
                ]
              }
            }
          ]
        }
      }
    })
  }
  
  console.log(`✅ Created ${courses.length} courses`)
  
  // Create a test user
  const passwordHash = await bcrypt.hash('password123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@dream2skill.com' },
    update: {},
    create: {
      email: 'test@dream2skill.com',
      phone: '+911234567890',
      passwordHash,
      fullName: 'Ramesh Kumar',
      village: 'Sikanderpur',
      district: 'Patna',
      state: 'Bihar',
      educationLevel: 'HIGH_SCHOOL',
      preferredLanguage: 'HINDI'
    }
  })
  
  console.log('✅ Created test user:', testUser.email)
  
  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })