import { NextRequest, NextResponse } from 'next/server'
import JSONDatabase from '@/lib/db/json-db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dream2skill_secret_2024'

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    
    console.log('Registering user:', userData.email || userData.phone)
    
    // Validate required fields
    const required = ['fullName', 'village', 'district', 'state', 'password']
    for (const field of required) {
      if (!userData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Check if email or phone provided
    if (!userData.email && !userData.phone) {
      return NextResponse.json(
        { success: false, error: 'Email or phone number is required' },
        { status: 400 }
      )
    }
    
    // Create user
    const user = await JSONDatabase.createUser(userData)
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '30d' }
    )
    
    return NextResponse.json({
      success: true,
      data: { user, token }
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}