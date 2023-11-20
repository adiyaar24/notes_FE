// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { loginService, registerService } from '@/services/authService'
import axios, { AxiosInstance } from 'axios'

interface AuthContextProps {
  children: ReactNode
}

interface User {
  _id: string
  username: string
}

interface AuthContextValue {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => void
  api: AxiosInstance // Include the configured Axios instance in the context
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const { user, token, login, register, logout } = context

  const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '', // Use token from context
    },
  })

  api.interceptors.request.use(
    (config) => {
      // Add the bearer token to the request headers if available
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle unauthorized or expired token
      if (error.response?.status === 401) {
        logout()
        // Redirect to log in or handle as needed
      }
      return Promise.reject(error)
    },
  )

  return {
    user,
    token,
    login,
    register,
    logout,
    api,
  }
}

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  })
  useEffect(() => {
    // Check for token and user on app mount
    const storedToken = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')

    if (storedToken && storedUsername) {
      // TODO: Validate the token on the server if necessary
      setToken(storedToken)
      setUser({ _id: '', username: storedUsername })
    }
  }, [])

  const login = async (username: string, password: string) => {
    const authResponse = await loginService(username, password)

    if (authResponse) {
      const {      
        token: receivedToken,
      } = authResponse

      // Store the token and username in local storage
      localStorage.setItem('token', receivedToken)
      

    
      setToken(receivedToken)
    }
  }

  const register = async (username: string, password: string) => {
    const authResponse = await registerService(username, password)

    if (authResponse) {
      const {
        _id,
        email: receivedUsername,
        token: receivedToken,
      } = authResponse

      // Store the token and username in local storage
      localStorage.setItem('token', receivedToken)
      localStorage.setItem('username', receivedUsername)

      setUser({ _id, username: receivedUsername })
      setToken(receivedToken)
    }
  }

  const logout = () => {
    // Clear user and token state
    setUser(null)
    setToken(null)

    // Clear the token and username from local storage
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, api }}>
      {children}
    </AuthContext.Provider>
  )
}
