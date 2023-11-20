// src/components/NewNoteModal.tsx
import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react'
import Overlay from '@/components/Overlay'

interface NewNoteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  newNote: { title: string; content: string }
}

const NewNoteModal: React.FC<NewNoteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onInputChange,
  onContentChange,
  newNote,
}) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      {Overlay()}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={newNote.title}
              onChange={onInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Content</FormLabel>
            <Textarea
              name="content"
              rows={6}
              value={newNote.content}
              onChange={onContentChange}
              resize="vertical"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="black"
            mr={2}
            color="white"
            _hover={{ bg: 'blackAlpha.800' }}
            onClick={onSave}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NewNoteModal
