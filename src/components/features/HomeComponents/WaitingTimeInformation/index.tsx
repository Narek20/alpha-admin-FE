import { FC } from 'react'
import { Box, Typography } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  todaysTime: string
  yesterdaysTime: string
  lastWeekTime: string
}

const WaitingTimeInformation: FC<IProps> = ({
  todaysTime,
  yesterdaysTime,
  lastWeekTime,
}) => {
  return (
    <Box className={styles.waitingTimeInformation}>
      <Typography className={styles.duration}>
        Սպասելաժամը 11:17-ի տվյալներով
      </Typography>
      <Box className={styles.waitingTimesContainer}>
        <Box className={styles.waitingTime}>
          <Box className={styles.todayColor}></Box>
          <Typography className={styles.todayTitle}>Այսօր</Typography>
        </Box>
        <Typography className={styles.time}>{todaysTime}</Typography>
      </Box>
      <Box className={styles.waitingTimesContainer}>
        <Box className={styles.waitingTime}>
          <Box className={styles.yesterdayColor}></Box>
          <Typography className={styles.yesterdayTitle}>Երեկ</Typography>
        </Box>
        <Typography className={styles.time}>{yesterdaysTime}</Typography>
      </Box>
      <Box className={styles.waitingTimesContainer}>
        <Box className={styles.waitingTime}>
          <Box className={styles.lastWeekColor}></Box>
          <Typography className={styles.lastWeekTitle}>Անցած շաբաթ</Typography>
        </Box>
        <Typography className={styles.time}>{lastWeekTime}</Typography>
      </Box>
      <Typography className={styles.refreshed}>Թարմացված է 20:43</Typography>
    </Box>
  )
}

export default WaitingTimeInformation
