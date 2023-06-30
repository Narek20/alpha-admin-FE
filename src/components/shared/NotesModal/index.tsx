import { FC } from 'react'
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Modal,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import styles from './styles.module.scss'

interface IProps {
  isEdit: boolean
  isAdd?: boolean
  open: boolean
  onClose: () => void
  title?: string
  note?: string
}

const NotesModal: FC<IProps> = ({
  open,
  isAdd,
  isEdit,
  onClose,
  title,
  note,
}) => {
  const modalContent = (isEdit: boolean): JSX.Element => {
    if (isEdit || isAdd) {
      return (
        <Box className={styles.editContainer}>
          <TextField
            className={styles.editTitle}
            defaultValue={title}
            label="Վերնագիր"
            variant="outlined"
          />
          <TextField
            className={styles.editNote}
            defaultValue={note}
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
