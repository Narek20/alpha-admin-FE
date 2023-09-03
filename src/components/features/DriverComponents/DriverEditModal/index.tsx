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
import { updateDriver } from 'services/drivers.service'
import { DriverKeys, IDriver } from 'types/driver.types'

import styles from './styles.module.scss'

interface IProps {
  onClose: () => void
  diver: IDriver
}

const DriverEditModal: FC<IProps> = ({ diver, onClose }) => {
  const [driverData, setDriverData] = useState<IDriver>(diver)

  const { drivers, setDrivers } = useContext(DriversContext)
  const { showToast } = useToast()

  const handleChange = (key: DriverKeys, value: string) => {
    setDriverData({ ...driverData, [key]: value })
  }

  const handleAdd = async () => {
    const data = await updateDriver(driverData)

    if (data.success) {
      showToast('success', data.message)
      setDrivers(
        drivers.map((driver) =>
          driver.id === data.data.id ? data.data : driver,
        ),
      )
      onClose()
    }
  }

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box>
          <Box className={styles.header}>
            <Typography className={styles.title}>Փոփոխել</Typography>
            <IconButton onClick={onClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Box className={styles.content}>
            <TextField
              label="Անուն Ազգանուն"
              value={driverData.fullName}
              onChange={(evt) =>
                handleChange(DriverKeys.FULL_NAME, evt.target.value)
              }
            />
            <TextField
              label="Հեռախոս"
              value={driverData.phone}
              onChange={(evt) =>
                handleChange(DriverKeys.PHONE, evt.target.value)
              }
            />
            <TextField
              label="Ուղությունը"
              value={driverData.direction}
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
              Պահպանել
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

export default DriverEditModal
