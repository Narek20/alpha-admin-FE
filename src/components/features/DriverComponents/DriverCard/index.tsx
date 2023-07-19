import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { DriverStatus } from 'types/driver.types'

import styles from './styles.module.scss'

interface IProps {
  fullName: string
  phone: string
  status: DriverStatus
}

const DriverCard: FC<IProps> = ({ fullName, phone, status }) => {
  return (
    <Box className={styles.driverCard}>
      <Box className={styles.driverInfo}>
        <AccountCircleIcon sx={{ height: 40, width: 40 }} />
        <Box className={styles.info}>
          <Typography>{fullName}</Typography>
          <Typography>{phone}</Typography>
        </Box>
      </Box>
      <Typography
        className={status === DriverStatus.FREE ? styles.free : styles.busy}
      >
        {status}
      </Typography>
    </Box>
  )
}

export default DriverCard
