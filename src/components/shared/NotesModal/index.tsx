import { FC, useState, useContext } from 'react'
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Modal,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { createNotes, removeNotes, updateNotes } from 'services/notes.service'
import { INotes } from 'types/notes.types'
import { useToast } from 'contexts/toast.context'
import { NotesContext } from 'contexts/notes.context'

import styles from './styles.module.scss'

interface IProps {
  isEdit: boolean
  isAdd?: boolean
  open: boolean
  onClose: () => void
  noteData?: INotes
}

const NotesModal: FC<IProps> = ({ open, isAdd, isEdit, onClose, noteData }) => {
  const [title, setTitle] = useState(noteData?.title || '')
  const [note, setNote] = useState(noteData?.note || '')

  const { showToast } = useToast()
  const { notes, setNotes } = useContext(NotesContext)

  const handleConfirm = async () => {
    if (isEdit && noteData) {
      const data = await updateNotes({ ...noteData, title, note })

      if (data.success) {
        showToast('success', data.message)

        setNotes(
          notes.map((noteData) =>
            noteData.id === data.data.id ? data.data : noteData
          )
        )
      }
    } else if (isAdd) {
      const data = await createNotes({ title, note })

      if (data.success) {
        showToast('success', data.message)

        setNotes([data.data, ...notes])
      }
    } else if (noteData?.id) {
      const data = await removeNotes(noteData?.id)

      if (data.success) {
        showToast('success', data.message)

        setNotes(notes.filter(({ id }) => id !== noteData.id))
      }
    }

    onClose()
  }

  const modalContent = (isEdit: boolean): JSX.Element => {
    if (isEdit || isAdd) {
      return (
        <Box className={styles.editContainer}>
          <TextField
            className={styles.editTitle}
            defaultValue={noteData?.title}
            onChange={(evt) => setTitle(evt.target.value)}
            label="Վերնագիր"
            variant="outlined"
          />
          <TextField
            className={styles.editNote}
            defaultValue={noteData?.note}
            onChange={(evt) => setNote(evt.target.value)}
            label="Նշում"
            multiline
            maxRows={5}
            variant="outlined"
          />
        </Box>
      )
    }

    return <></>
  }

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.header}>
          <Typography className={styles.title}>Հեռացնել նշումը</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        {modalContent(isEdit)}
        <Box className={styles.actions}>
          <Button
            className={styles.removeBtn}
            onClick={handleConfirm}
            color={isEdit && !isAdd ? 'primary' : isAdd ? 'success' : 'error'}
          >
            {isEdit && !isAdd ? 'Հեռացնել' : isAdd ? 'Ավելացնել' : 'Հեռացնել'}
          </Button>
          <Button className={styles.cancelBtn} color="inherit">
            Չեղարկել
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default NotesModal
