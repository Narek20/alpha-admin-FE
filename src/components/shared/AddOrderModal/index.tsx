import { FC, useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Modal,
  TextField,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { OrderTableColumns, OrderTableKeys } from '@utils/order/constants'
import { OrderTableKeysType } from 'types/order.types'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const OrderAddModal: FC<IProps> = ({ open, onClose }) => {
  const [orderData, setOrderData] = useState<{
    [key: string]: string | number
  } | null>(null)

  const handleChange = (key: OrderTableKeysType, value: string) => {
    setOrderData({ ...orderData, [key]: value })
  }

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.header}>
          <Typography className={styles.title}>Ավելացնել պատվեր</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box className={styles.content}>
          {OrderTableKeys.slice(1).map((key, index) => (
            <TextField
              key={key}
              label={OrderTableColumns[index]}
              style={{display: index === 0 ? 'none' : 'flex'}}
              className={styles.input}
              value={orderData?.[key]}
              onChange={(evt) => handleChange(key, evt.target.value)}
            />
          ))}
        </Box>
        <Box className={styles.actions}>
          <Button className={styles.addBtn} color={'success'}>
            Ավելացնել
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

export default OrderAddModal
