import { useState, useContext } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import Note from '../Note'
import NotesModal from '@shared/NotesModal'
import SectionHeader from '@shared/SectionTitle'
import { NotesContext } from 'contexts/notes.context'

import styles from './styles.module.scss'

const Notes = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { notes } = useContext(NotesContext)

  return (
    <Box className={styles.notes}>
      <SectionHeader title="Նշումներ" />
      <Box className={styles.notesContainer}>
        {notes.map((note) => (
          <Note key={note.title + note.note} noteData={note} />
        ))}
      </Box>
      <Box className={styles.actions}>
        <IconButton className={styles.addNote} onClick={() => setIsOpen(true)}>
          <AddOutlinedIcon />
          <Typography className={styles.addText}>Ավելացնել</Typography>
        </IconButton>
      </Box>
      {isOpen && (
        <NotesModal
          isEdit={false}
          isAdd={true}
          onClose={() => setIsOpen(false)}
        />
      )}
    </Box>
  )
}

export default Notes
