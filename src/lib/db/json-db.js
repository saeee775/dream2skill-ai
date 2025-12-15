// Persistent JSON database using file system
const fs = require('fs').promises
const path = require('path')

const DB_PATH = path.join(process.cwd(), 'data', 'database.json')

class JSONDatabase {
  static async loadDatabase() {
    try {
      const data = await fs.readFile(DB_PATH, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      // If file doesn't exist, return default structure
      return {
        users: [],
        courses: [],
        enrollments: [],
        progress: [],
        certificates: [],
        dnaProfiles: [],
        stats: {
          totalUsers: 0,
          totalCourses: 0,
          totalEnrollments: 0,
          totalCertificates: 0
        }
      }
    }
  }

  static async saveDatabase(data) {
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error saving database:', error)
      throw error
    }
  }

  static async createUser(userData) {
    const db = await this.loadDatabase()
    const user = {
      id: 'user_' + Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    db.users.push(user)
    db.stats.totalUsers = db.users.length
    await this.saveDatabase(db)
    return user
  }

  static async getUsers() {
    const db = await this.loadDatabase()
    return db.users
  }

  static async findUser(query) {
    const db = await this.loadDatabase()
    return db.users.find(user => 
      user.id === query || 
      user.email === query || 
      user.phone === query
    )
  }

  static async saveUser(userId, userData) {
    const db = await this.loadDatabase()
    const userIndex = db.users.findIndex(user => user.id === userId)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    db.users[userIndex] = { ...db.users[userIndex], ...userData }
    await this.saveDatabase(db)
    return db.users[userIndex]
  }

  static async verifyPassword(emailOrPhone, password) {
    const user = await this.findUser(emailOrPhone)
    if (user && user.password === password) {
      return user
    }
    return null
  }

  static async getEnrollments(userId, includeCompleted = false) {
    const db = await this.loadDatabase()
    return db.enrollments.filter(enrollment => 
      enrollment.userId === userId && 
      (includeCompleted || !enrollment.isCompleted)
    )
  }

  static async getProgress(userId) {
    const db = await this.loadDatabase()
    return db.progress.filter(progress => progress.userId === userId)
  }

  static async getCertificates(userId) {
    const db = await this.loadDatabase()
    return db.certificates.filter(cert => cert.userId === userId)
  }

  static async getCourses() {
    const db = await this.loadDatabase()
    return db.courses
  }

  static async findCourse(courseId) {
    const db = await this.loadDatabase()
    return db.courses.find(course => course.id === courseId)
  }

  static async createEnrollment(enrollmentData) {
    const db = await this.loadDatabase()
    const enrollment = {
      id: 'enrollment_' + Date.now(),
      ...enrollmentData,
      createdAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString()
    }
    db.enrollments.push(enrollment)
    db.stats.totalEnrollments = db.enrollments.length
    await this.saveDatabase(db)
    return enrollment
  }

  static async findEnrollment(userId, courseId) {
    const db = await this.loadDatabase()
    return db.enrollments.find(enrollment => 
      enrollment.userId === userId && enrollment.courseId === courseId
    )
  }

  static async updateCourse(courseId, updateData) {
    const db = await this.loadDatabase()
    const courseIndex = db.courses.findIndex(course => course.id === courseId)
    if (courseIndex === -1) {
      throw new Error('Course not found')
    }
    db.courses[courseIndex] = { ...db.courses[courseIndex], ...updateData }
    await this.saveDatabase(db)
    return db.courses[courseIndex]
  }
}

module.exports = JSONDatabase