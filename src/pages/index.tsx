import React, { FC, useState } from 'react'
import {
  Box,
  Flex,
  IconButton,
  Heading,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import NoteList from '@/components/NoteList'
import NewNoteModal from '@/components/NewNoteModal'
import { useNoteContext } from '@/context/NoteContext'
import NoteInterface from '@/types/note'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'

const Home: FC = () => {
  const [isAdding, setAdding] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const { notes, addNote, editNote } = useNoteContext()
  const router = useRouter()
  const { token, logout, user } = useAuth()

  const handleAddNoteClick = () => {
    setNewNote({ title: '', content: '' })
    setAdding(true)
  }

  const handleSaveNewNoteClick = async () => {
    await addNote(newNote.title, newNote.content)
    setAdding(false)
  }

  const handleCancelNewNoteClick = () => {
    setAdding(false)
  }

  const handleEditNote = (editedNote: NoteInterface) => {
    editNote(editedNote)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }))
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }))
  }

  const handleLogout = () => {
    logout() // Call the logout function
    // You can also redirect the user to the login page if needed
    // router.push('/login');
  }

  React.useEffect(() => {
    if (!token) {
      router.push('/login') // Redirect to login if not authenticated
    }
  }, [token, router])

  return (
    <Box pt={{ base: 1, sm: 8, md: 4 }}>
      <Flex align="center">
        <IconButton
          isRound={true}
          m={4}
          size="lg"
          variant="solid"
          bg="black"
          _hover={{ bg: 'blackAlpha.800' }}
          color="white"
          aria-label="Done"
          fontSize="22px"
          icon={<AddIcon />}
          onClick={handleAddNoteClick}
        />
        <Heading size={'2xl'} ml={'12'}>
          Notes
        </Heading>
        <Menu>
          <Avatar
            as={MenuButton}
            ml="auto"
            mr={4}
            name={user?.username}
            src="https://bit.ly/broken-link"
          />
          <MenuList>
            <MenuItem>
              <Text fontSize="lg">Welcome, {user?.username}!</Text>
            </MenuItem>
            <MenuItem onClick={handleLogout} color="red.500">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box p={{ base: 3, sm: 4, md: 8, lg: 14 }} mt={{ base: 4, sm: 2 }}>
        <NoteList notes={notes} onEditNote={handleEditNote} />
      </Box>

      <NewNoteModal
        isOpen={isAdding}
        onClose={handleCancelNewNoteClick}
        onSave={handleSaveNewNoteClick}
        onInputChange={handleInputChange}
        onContentChange={handleContentChange}
        newNote={newNote}
      />
    </Box>
  )
}

export default Home
