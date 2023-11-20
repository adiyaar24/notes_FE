// src/context/NoteContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import axios, { AxiosResponse } from 'axios'
import NoteInterface from '@/types/note'
import { useAuth } from './AuthContext' // Import the useAuth hook
import { useRouter } from 'next/router' // Import the useRouter hook for redirection

interface NoteContextProps {
  children: ReactNode
}

interface NoteContextValue {
  notes: NoteInterface[]
  addNote: (title: string, content: string) => Promise<void>
  editNote: (editedNote: NoteInterface) => Promise<void>
  deleteNote: (noteId: string) => Promise<void>
  loading: boolean // Added loading state
}

const NoteContext = createContext<NoteContextValue | undefined>(undefined)

export const useNoteContext = () => {
  const context = useContext(NoteContext)
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteContextProvider')
  }
  return context
}

export const NoteContextProvider: React.FC<NoteContextProps> = ({
  children,
}) => {
  const [notes, setNotes] = useState<NoteInterface[]>([])
  const [loading, setLoading] = useState(false)
  const { token } = useAuth() // Get the authentication token
  const router = useRouter() // Initialize the router

  const fetchNotes = React.useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      const response: AxiosResponse<NoteInterface[]> = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      )

      const sortedNotes = response.data;

      setNotes(sortedNotes)
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setLoading(false)
    }
  }, [token, setNotes, setLoading])

  useEffect(() => {
    // Check for token on app mount
    const storedToken = localStorage.getItem('token')

    const fetchData = async () => {
      if (storedToken) {
        await fetchNotes()
      } else {
        // Handle the case where there is no token, e.g., redirect to log in
        // router.push('/login');
      }
    }

    fetchData().then((r) => console.log(r))

    // Note: Removed router from the dependency array
  }, [fetchNotes])

  // Updated useEffect for redirection when authenticated
  React.useEffect(() => {
    if (token) {
      router.push('/') // Redirect to home page if authenticated
    }
  }, [token, router])

  const addNote = async (title: string, content: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`,
        { title, content },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } },
      )

      if (response.status === 201) {
        await fetchNotes()
      } else {
        console.error(
          'Error adding note:',
          response.status,
          response.statusText,
        )
      }
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  const editNote = async (editedNote: NoteInterface) => {
    try {
      const { title, content } = editedNote // Extract title and content
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${editedNote._id}`,
        { title, content },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } },
      )

      if (response.status === 200) {
        await fetchNotes()
      } else {
        console.error(
          'Error editing note:',
          response.status,
          response.statusText,
        )
      }
    } catch (error) {
      console.error('Error editing note:', error)
    }
  }

  const deleteNote = async (noteId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${noteId}`,
        { headers: { Authorization: token ? `Bearer ${token}` : '' } },
      )

      if (response.status === 200 || response.status === 201) {
        await fetchNotes()
      } else {
        console.error(
          'Error deleting note:',
          response.status,
          response.statusText,
        )
      }
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, loading }}
    >
      {children}
    </NoteContext.Provider>
  )
}
