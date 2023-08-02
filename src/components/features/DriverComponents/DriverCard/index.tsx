import { FC } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { DriverStatus } from 'types/driver.types'

import styles from './styles.module.scss'

interface IProps {
  fullName: string
  phone: string
  direction: string
  status: DriverStatus
}

const DriverCard: FC<IProps> = ({ fullName, phone, status, direction }) => {
  
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down(1000))

  return (
    <Box className={styles.driverCard}>
      <Box className={styles.driverInfo}>
        <AccountCircleIcon sx={{ height: isTablet ? 100 : 40, width: isTablet ? 100 : 40 }} />
        <Typography>Անունը։ {fullName}</Typography>
        <Typography>Հեռախոսը։ {phone}</Typography>
        <Typography>Ուղղությունը։ {direction}</Typography>
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
