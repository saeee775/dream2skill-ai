import { NextResponse } from 'next/server'
import JSONDatabase from '@/lib/db/json-db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dream2skill_secret_2024'

export async function POST(request) {
  try {
    const { emailOrPhone, password } = await request.json()
    
    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { success: false, error: 'Email/phone and password are required' },
        { status: 400 }
      )
    }
    
    // Verify user and password
    const user = await JSONDatabase.verifyPassword(emailOrPhone, password)
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '30d' }
    )
    
    return NextResponse.json({
      success: true,
      data: { user, token }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}