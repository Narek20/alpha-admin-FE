import { FC, useState, useContext } from 'react'
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DriverEditModal from '../DriverEditModal'
import { useToast } from 'contexts/toast.context'
import { removeDriver } from 'services/drivers.service'
import { DriversContext } from 'contexts/driver.context'
import ConfirmationModal from '@shared/ConfirmationModal'
import { DriverStatus } from 'types/driver.types'

import styles from './styles.module.scss'

interface IProps {
  id: string
  fullName: string
  phone: string
  direction: string
  status: DriverStatus
}

const DriverCard: FC<IProps> = ({ id, fullName, phone, status, direction }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isRemove, setIsRemove] = useState(false)

  const theme = useTheme()
  const { drivers, setDrivers } = useContext(DriversContext)

  const { showToast } = useToast()
  const isTablet = useMediaQuery(theme.breakpoints.down(1000))

  const handleRemove = async () => {
    const data = await removeDriver(id)

    if (data.success) {
      showToast('success', data.message)
      setDrivers(drivers.filter((driver) => driver.id !== id))
    }
  }

  return (
    <Box className={styles.driverCard}>
      <Box className={styles.driverInfo}>
        <AccountCircleIcon
          sx={{ height: isTablet ? 100 : 40, width: isTablet ? 100 : 40 }}
        />
        <Box className={styles.info}>
          <Typography className={styles.label}>Անունը։</Typography>
          <Typography>{fullName}</Typography>
        </Box>
        <Box className={styles.info}>
          <Typography className={styles.label}>Հեռախոսը։</Typography>
          <Typography>{phone}</Typography>
        </Box>
        <Box className={styles.info}>
          <Typography className={styles.label}>Ուղղությունը։</Typography>
          <Typography>{direction}</Typography>
        </Box>
      </Box>
      <Box className={styles.actions}>
        <Typography
          className={status === DriverStatus.FREE ? styles.free : styles.busy}
        >
          {status}
        </Typography>
        <Box className={styles.btns}>
        <IconButton className={styles.edit} onClick={() => setIsEdit(true)}>
          <BorderColorOutlinedIcon sx={{ color: '#067b00' }} />
        </IconButton>
        <IconButton className={styles.remove} onClick={() => setIsRemove(true)}>
          <DeleteOutlineOutlinedIcon sx={{ color: '#f96666' }} />
        </IconButton>
        </Box>
      </Box>
      <DriverEditModal
        open={isEdit}
        onClose={() => setIsEdit(false)}
        diver={{ id, fullName, phone, direction, status }}
      />
      <ConfirmationModal
        open={isRemove}
        text="Առաքչի հեռացում"
        onConfirm={handleRemove}
        btnText="Հեռացնել"
        onClose={() => setIsRemove(false)}
      />
    </Box>
  )
}

export default DriverCard
