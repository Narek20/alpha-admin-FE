import { FC } from 'react'
import { Box, Typography, IconButton, Button, Modal } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import styles from './styles.module.scss'

interface IProps {
  isEdit: boolean
  isComplete: boolean
  open: boolean
  onClose: () => void
}

const OrdersModal: FC<IProps> = ({ open, isComplete, isEdit, onClose }) => {
  const modalTitle = () => {
    if (isEdit) {
      return 'Պահպանել փոփոխությունները'
    }

    if (isComplete) {
      return 'Ավարտել'
    }

    return 'Հեռացնել'
  }

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.header}>
          <Typography className={styles.title}>
            {modalTitle()} {!isEdit && 'պատվերը'}
          </Typography>
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
          >
            {modalTitle()}
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

export default OrdersModal
