// apps/web/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api'

export const api = {
  async register(data: any) {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  },

  async login(data: any) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  },

  async getCourses(params?: any) {
    const query = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE}/courses?${query}`)
    return response.json()
  },

  async analyzeDNA(answers: any) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE}/dna/analyze`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ answers })
    })
    return response.json()
  },

  async enroll(courseId: string) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE}/enroll/${courseId}`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    })
    return response.json()
  }
}