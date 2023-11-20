import React from 'react'
import { Grid, GridItem, Text, Image } from '@chakra-ui/react'
import NoteCard from './NoteCard'
import NoteInterface from '@/types/note'

interface NoteListProps {
 notes: NoteInterface[]
 onEditNote: (editedNote: NoteInterface) => void
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEditNote }) => {
 if (notes.length === 0) {
    return (
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
         <GridItem colSpan={1}>
          <Text fontSize="4xl" fontWeight="bold" mx='auto'>
            It's empty out here ! Let's get started!
          </Text>
          <Image 
          height={100}
          align='Center'
          mx='auto'
          src="https://img.freepik.com/premium-vector/education-authorship-concept-creative-color-illustration-opening-book-with-bookmark-bird-feather-inscription-white-background_117177-810.jpg?w=2000" alt="Get Started" />
        </GridItem>
      </Grid>
    )
 }

 return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      gap={6}
    >
      {notes.map((note) => (
        <GridItem key={note._id} colSpan={1}>
          <NoteCard note={note} onEditNote={onEditNote} />
        </GridItem>
      ))}
    </Grid>
 )
}

export default NoteList
