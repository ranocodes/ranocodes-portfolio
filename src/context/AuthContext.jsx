import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import db from '../../services/database'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('admin_session')
    if (stored) {
      try {
        const session = JSON.parse(stored)
        const dbUser = db.users.getById(session.userId)
        if (dbUser) {
          setUser({ ...dbUser, password: undefined })
        } else {
          localStorage.removeItem('admin_session')
        }
      } catch {
        localStorage.removeItem('admin_session')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    setError(null)
    try {
      const users = db.users.getAll()
      const foundUser = users.find(u => u.email === email)
      
      if (!foundUser) {
        throw new Error('Invalid email or password')
      }

      if (foundUser.password !== password) {
        throw new Error('Invalid email or password')
      }

      const session = {
        userId: foundUser.id,
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem('admin_session', JSON.stringify(session))
      
      setUser({ ...foundUser, password: undefined })
      return foundUser
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const register = useCallback(async (email, password, inviteCode = null) => {
    setError(null)
    try {
      const users = db.users.getAll()
      
      if (users.length > 0) {
        if (!inviteCode) {
          throw new Error('Invite code is required')
        }
        const validation = db.inviteCodes.validate(inviteCode)
        if (!validation.valid) {
          throw new Error(validation.reason)
        }
      }

      const existing = users.find(u => u.email === email)
      if (existing) {
        throw new Error('Email already registered')
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters')
      }

      const newUser = db.users.create({
        email,
        password,
        name: email.split('@')[0],
      })

      if (inviteCode) {
        db.inviteCodes.use(inviteCode, newUser.id)
      }

      const session = {
        userId: newUser.id,
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem('admin_session', JSON.stringify(session))
      
      setUser({ ...newUser, password: undefined })
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_session')
    setUser(null)
  }, [])

  const updateProfile = useCallback(async (updates) => {
    if (!user) return
    const updated = db.users.update(user.id, updates)
    if (updated) {
      setUser({ ...updated, password: undefined })
    }
    return updated
  }, [user])

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
