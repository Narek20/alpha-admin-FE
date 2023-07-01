import { useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import Note from '../Note'
import NotesModal from '@shared/NotesModal'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

const notes = [
  {
    title: 'Ապուշ',
    date: '12.24.2022',
    note: 'Այսօր ես ապուշ եմ',
  },
  {
    title: 'Եզ',
    date: '06.24.2023',
    note: 'Այսօր ես եզ եմ',
  },
  {
    title: 'Ուղտ',
    date: '06.24.2023',
    note: 'Այսօր ես ապուշ եմ',
  },
  {
    title: 'Տապոռ',
    date: '06.27.2023',
    note: 'Այսօր ես տապոռ եմ',
  },
  {
    title: 'Անասուն',
    date: '06.29.2023',
    note: 'Այսօր ես անասուն եմ',
  },
]

const Notes = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box className={styles.notes}>
      <SectionHeader title="Նշումներ" />
      <Box className={styles.notesContainer}>
        {notes.map((note) => (
          <Note key={note.title + note.note} {...note} />
        ))}
      </Box>
      <Box className={styles.actions}>
        <IconButton className={styles.addNote} onClick={() => setIsOpen(true)}>
          <AddOutlinedIcon />
          <Typography className={styles.addText}>Ավելացնել</Typography>
        </IconButton>
      </Box>
      <NotesModal
        open={isOpen}
        isEdit={false}
        isAdd={true}
        onClose={() => setIsOpen(false)}
      />
    </Box>
  )
}

export default Notes
