import { FC, useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import NotesModal from '@shared/NotesModal'
import { INotes } from 'types/notes.types'

import styles from './styles.module.scss'

interface IProps {
  noteData: INotes
}

const Note: FC<IProps> = ({ noteData }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleEdit = () => {
    setIsOpen(true)
    setIsEdit(true)
  }

  const handleRemove = () => {
    setIsOpen(true)
    setIsEdit(false)
  }

  return (
    <Box className={styles.noteContainer}>
      <Typography className={styles.title}>{noteData.title}</Typography>
      <Typography className={styles.date}>{noteData.date}</Typography>
      <Typography className={styles.note}>{noteData.note}</Typography>
      <Box className={styles.actions}>
        <IconButton className={styles.edit} onClick={handleEdit}>
          <BorderColorOutlinedIcon sx={{ color: '#067b00' }} />
        </IconButton>
        <IconButton className={styles.remove} onClick={handleRemove}>
          <DeleteOutlineOutlinedIcon sx={{ color: '#f96666' }} />
        </IconButton>
      </Box>
      {isOpen && (
        <NotesModal
          isEdit={isEdit}
          onClose={() => setIsOpen(false)}
          noteData={noteData}
        />
      )}
    </Box>
  )
}

export default Note
