// apps/web/lib/auth.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'dream2skill-secret-key-change-in-prod'

export interface RegisterInput {
  email?: string
  phone?: string
  password: string
  fullName: string
  village: string
  district: string
  state: string
  educationLevel: string
  preferredLanguage: string
}

export interface LoginInput {
  emailOrPhone: string
  password: string
}

export class AuthService {
  // Register new user (rural-friendly)
  static async register(data: RegisterInput) {
    // Validate at least one contact method
    if (!data.email && !data.phone) {
      throw new Error('Email or phone number is required')
    }

    // Check if user already exists
    if (data.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: data.email }
      })
      if (existingEmail) throw new Error('Email already registered')
    }

    if (data.phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone: data.phone }
      })
      if (existingPhone) throw new Error('Phone number already registered')
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        passwordHash,
        fullName: data.fullName,
        village: data.village,
        district: data.district,
        state: data.state,
        educationLevel: data.educationLevel as any,
        preferredLanguage: data.preferredLanguage as any
      }
    })

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        phone: user.phone 
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    )

    // Remove password hash from response
    const { passwordHash: _, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      token
    }
  }

  // Login with email or phone
  static async login(data: LoginInput) {
    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.emailOrPhone },
          { phone: data.emailOrPhone }
        ]
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (!user.passwordHash) {
      throw new Error('Invalid credentials')
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash)
    if (!isValidPassword) {
      throw new Error('Invalid password')
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        phone: user.phone 
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    )

    // Remove password hash from response
    const { passwordHash, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      token
    }
  }

  // Verify JWT token
  static async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      
      // Fetch fresh user data
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          phone: true,
          fullName: true,
          village: true,
          district: true,
          state: true,
          educationLevel: true,
          preferredLanguage: true,
          createdAt: true,
          updatedAt: true
        }
      })

      if (!user) {
        throw new Error('User not found')
      }

      return user
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}

// Middleware for API routes
export function authMiddleware(handler: Function) {
  return async (req: any, res: any) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')
      
      if (!token) {
        return res.status(401).json({ error: 'Authentication required' })
      }

      const user = await AuthService.verifyToken(token)
      req.user = user
      
      return handler(req, res)
    } catch (error: any) {
      return res.status(401).json({ error: error.message })
    }
  }
}