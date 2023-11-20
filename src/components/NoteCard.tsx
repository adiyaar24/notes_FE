// components/NoteCard.tsx
import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
  IconButton,
  Flex,
  HStack,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import NoteInterface from '@/types/note'
import Overlay from '@/components/Overlay'
import { useNoteContext } from '@/context/NoteContext'

interface NoteCardProps {
  note: NoteInterface
  onEditNote: (editedNote: NoteInterface) => void
}

const brandColors = ['#FFCF7D', '#FFA67F', '#BF9EFE', '#05D9FF', '#E9F09B']

const getRandomBrandColor = () => {
  const randomIndex = Math.floor(Math.random() * brandColors.length)
  return brandColors[randomIndex]
}

const NoteCard: FC<NoteCardProps> = ({ note, onEditNote }) => {
  const { deleteNote } = useNoteContext()
  const [isEditing, setEditing] = useState(false)
  const [editedNote, setEditedNote] = useState({ ...note })
  const [cardBackgroundColor, setCardBackgroundColor] = useState<string>('')


  const handleEditClick = () => {
    setEditedNote({ ...note })
    setEditing(true)
  }

  const handleSaveClick = () => {
    onEditNote(editedNote)
    setEditing(false)
  }

  const handleCancelClick = () => {
    setEditing(false)
  }

  const handleDeleteClick = async () => {
    await deleteNote(note._id)
  }

  // Dynamically set the modal size based on screen width breakpoints
  const modalSize = useBreakpointValue({
    base: 'xs',
    sm: 'md',
    md: 'lg',
    lg: 'xl',
  })

  useEffect(() => {
    const randomColor = getRandomBrandColor()
    setCardBackgroundColor(randomColor)
  }, [])

  return (
    <Box
      bg={cardBackgroundColor}
      p={4}
      rounded="3xl"
      shadow="md"
      minH="full"
      noOfLines={1}
    >
      <Box position="relative">
        <Text fontSize="xl" fontWeight="bold" mb={6} h="32px" overflow="hidden">
          {note.title}
        </Text>
      </Box>
      <Text
        color="black.600"
        fontWeight={450}
        mb={4}
        h="144px"
        overflow="hidden"
        noOfLines={6}
      >
        {note.content}
      </Text>
      <Box
        pt={4}
        display="flex"
        justifyContent="space-between"
        alignContent={'center'}
      >
        <Text fontSize="sm" color="black.400" mt={2}>
          {/* Document Id {note._id} */}
        </Text>
     
         <IconButton
          isRound={true}
          variant="solid"
          bg="black"
          _hover={{ bg: 'blackAlpha.800' }}
          color="white"
          aria-label=""
          fontSize="20px"
          icon={<EditIcon />}
          onClick={handleEditClick}
        />
      </Box>

      <Modal
        closeOnOverlayClick={false}
        size={modalSize}
        isOpen={isEditing}
        onClose={handleCancelClick}
      >
        {Overlay()}
        <ModalOverlay />
        <ModalContent rounded="3xl">
          <ModalCloseButton zIndex="100" />
          <ModalBody>
            <FormControl>
              <Editable
                defaultValue={editedNote.title}
                fontSize="2xl"
                fontWeight="bold"
                textAlign={'center'}
                mr={6}
                mb={4}
                onChange={(value) =>
                  setEditedNote((prevNote) => ({ ...prevNote, title: value }))
                }
                placeholder="Title"
              >
                <EditablePreview w="full" h="full" />
                <EditableInput />
              </Editable>
            </FormControl>
            <FormControl mt={4} my={2}>
              <Editable
                defaultValue={editedNote.content}
                h={{ base: '20rem', md: '24rem', lg: '30rem' }}
                px={1}
                pt={1}
                overflowY="auto"
                fontSize="lg"
                onChange={(value) =>
                  setEditedNote((prevNote) => ({ ...prevNote, content: value }))
                }
                placeholder="Start Writing..."
              >
                {/* Add the border style based on the isEditing state */}
                <EditablePreview w="full" h="full" />
                <EditableTextarea
                  h={{ base: '19rem', md: '23rem', lg: '29rem' }}
                  overflowY="auto"
                />
              </Editable>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex justify="space-between" align="flex-end" p={4} w="full">
              {/* Delete Icon Button */}
              <IconButton
                isRound={true}
                variant="solid"
                bg="red.500"
                _hover={{ bg: 'red.600' }}
                color="white"
                aria-label="Delete"
                fontSize="20px"
                icon={<DeleteIcon />}
                onClick={handleDeleteClick}
              />
              <Spacer />
              <HStack spacing={2}>
                <Button
                  bg="black"
                  color="white"
                  _hover={{ bg: 'blackAlpha.800' }}
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
                <Button onClick={handleCancelClick}>Cancel</Button>
              </HStack>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default NoteCard
