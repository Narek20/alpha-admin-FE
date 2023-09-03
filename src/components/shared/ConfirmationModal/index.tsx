import { FC } from 'react'
import { Box, Typography, IconButton, Button, Modal } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import useOnEnter from '@utils/hooks/useOnEnter'

import styles from './styles.module.scss'

interface IProps {
  isEdit?: boolean
  isComplete?: boolean
  text: string
  btnText: string
  onClose: () => void
  onConfirm?: () => void
}

const ConfirmationModal: FC<IProps> = ({
  text,
  btnText,
  isComplete,
  isEdit,
  onClose,
  onConfirm,
}) => {
  useOnEnter(() => onConfirm && onConfirm())

  return (
    <Modal className={styles.modal} open onClose={onClose}>
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
