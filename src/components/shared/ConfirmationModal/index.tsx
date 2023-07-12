import { FC } from 'react'
import { Box, Typography, IconButton, Button, Modal } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import styles from './styles.module.scss'

interface IProps {
  isEdit?: boolean
  isComplete?: boolean
  text: string
  btnText: string
  open: boolean
  onClose: () => void
  onConfirm?: () => void
}

const ConfirmationModal: FC<IProps> = ({
  open,
  text,
  btnText,
  isComplete,
  isEdit,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.header}>
          <Typography className={styles.title}>{text}</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box className={styles.actions}>
          <Button
            className={styles.removeBtn}
            color={
              isEdit && !isComplete
                ? 'primary'
                : isComplete
                ? 'success'
                : 'error'
            }
            onClick={onConfirm}
          >
            {btnText}
          </Button>
          <Button
            className={styles.cancelBtn}
            color="inherit"
            onClick={onClose}
          >
            Չեղարկել
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmationModal
