import { FC, useContext, useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Modal,
  TextField,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useToast } from 'contexts/toast.context'
import { DriversContext } from 'contexts/driver.context'
import { createDriver } from 'services/drivers.service'
import { DriverKeys, ICreateDriver } from 'types/driver.types'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const DriverAddModal: FC<IProps> = ({ open, onClose }) => {
  const [driverData, setDriverData] = useState<ICreateDriver>({
    fullName: '',
    phone: '',
    direction: '',
  })

  const { drivers, setDrivers } = useContext(DriversContext)
  const { showToast } = useToast()

  const handleChange = (key: DriverKeys, value: string) => {
    setDriverData({ ...driverData, [key]: value })
  }

  const handleAdd = async () => {
    const data = await createDriver(driverData)

    if (data.success) {
      showToast('success', data.message)
      setDrivers([data.data, ...drivers])
      onClose()
    }
  }

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box>
          <Box className={styles.header}>
            <Typography className={styles.title}>Ավելացնել Առաքիչ</Typography>
            <IconButton onClick={onClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Box className={styles.content}>
            <TextField
              label="Անուն Ազգանուն"
              onChange={(evt) =>
                handleChange(DriverKeys.FULL_NAME, evt.target.value)
              }
            />
            <TextField
              label="Հեռախոս"
              onChange={(evt) =>
                handleChange(DriverKeys.PHONE, evt.target.value)
              }
            />
            <TextField
              label="Ուղությունը"
              onChange={(evt) =>
                handleChange(DriverKeys.DIRECTION, evt.target.value)
              }
            />
          </Box>
          <Box className={styles.actions}>
            <Button
              className={styles.addBtn}
              color={'success'}
              onClick={handleAdd}
            >
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
      </Box>
    </Modal>
  )
}

export default DriverAddModal
