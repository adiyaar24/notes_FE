// services/authService.ts
import axios from 'axios'

interface AuthResponse {
  _id: string
  email: string
  token: string
}

export const loginService = async (
  email: string,
  password: string,
): Promise<AuthResponse | null> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
      {
        email,
        password,
      },
    )
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    return null
  }
}

export const registerService = async (
  email: string,
  password: string,
): Promise<AuthResponse | null> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
      {
        email,
        password,
      },
    )
    return response.data
  } catch (error) {
    console.error('Registration failed:', error)
    return null
  }
}
