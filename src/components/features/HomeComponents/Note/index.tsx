import { FC, useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import NotesModal from '@shared/NotesModal'

import styles from './styles.module.scss'

interface IProps {
  title: string
  date: string
  note: string
}

const Note: FC<IProps> = ({ title, date, note }) => {
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
      <Typography className={styles.title}>{title}</Typography>
      <Typography className={styles.date}>{date}</Typography>
      <Typography className={styles.note}>{note}</Typography>
      <Box className={styles.actions}>
        <IconButton className={styles.edit} onClick={handleEdit}>
          <BorderColorOutlinedIcon sx={{ color: '#067b00' }} />
        </IconButton>
        <IconButton className={styles.remove} onClick={handleRemove}>
          <DeleteOutlineOutlinedIcon sx={{ color: '#f96666' }} />
        </IconButton>
      </Box>
      <NotesModal
        open={isOpen}
        isEdit={isEdit}
        onClose={() => setIsOpen(false)}
        title={title}
        note={note}
      />
    </Box>
  )
}

export default Note
