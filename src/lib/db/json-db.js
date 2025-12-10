// This is a SIMPLE database - just for testing
const users = []
const courses = []

class SimpleDB {
  static createUser(userData) {
    const user = {
      id: 'user_' + Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    users.push(user)
    return user
  }

  static getUsers() {
    return users
  }
}

module.exports = SimpleDB