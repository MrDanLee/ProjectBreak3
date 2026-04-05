import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

const API = 'http://localhost:3000'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user') || null)

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    localStorage.setItem('user', data.user.email)
    setUser(data.user.email)
  }

  const logout = async () => {
    await fetch(`${API}/api/logout`, { credentials: 'include' })
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
