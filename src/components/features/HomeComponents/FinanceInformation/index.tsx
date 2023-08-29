import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import {
  durations,
  durationsByColors,
  pastDurations,
  pastDurationsByColors,
} from '@utils/finances/constants'
import { Durations } from 'types/finances.types'
import { priceFormatter } from '@utils/priceFormatter'

import styles from './styles.module.scss'

interface IProps {
  amount: number
  duration: Durations
  totalPrice: number
  priceDifference: number
  amountDifference: number
}

const FinanceInformation: FC<IProps> = ({
  amount,
  duration,
  totalPrice,
  priceDifference,
  amountDifference,
}) => {
  return (
    <Box className={styles.financeInformation}>
      <Typography className={styles.duration}>
        Ամփոփումը {durations[duration]}
      </Typography>
      <Box className={styles.information}>
        <Box>
          <Box className={styles.infoContainer}>
            <Typography className={styles.infoTitle}>Քանակը</Typography>
            <Typography className={styles.totalInfo}>{amount} հատ</Typography>
          </Box>
          <Box className={styles.infoContainer}>
            <Typography
              className={
                amountDifference >= 0
                  ? styles.difference
                  : styles.negativeDifference
              }
            >
              {amountDifference > 0 && '+'}
              {amountDifference} հատ
            </Typography>
            <Typography className={styles.differenceTitle}>
              {pastDurations[duration]}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box className={styles.infoContainer}>
            <Typography className={styles.infoTitle}>Գումարը</Typography>
            <Typography className={styles.totalInfo}>
              {priceFormatter(totalPrice)} ֏
            </Typography>
          </Box>
          <Box className={styles.infoContainer}>
            <Typography
              className={
                priceDifference >= 0
                  ? styles.difference
                  : styles.negativeDifference
              }
            >
              {priceDifference > 0 && '+'}
              {priceFormatter(priceDifference)} ֏
            </Typography>
            <Typography className={styles.differenceTitle}>
              Երեկվանից
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={styles.colorContainers}>
        <Box className={styles.colorContainer}>
          <Box className={styles.firstColor}></Box>
          <Typography className={styles.colorTitle}>
            {durationsByColors[duration]}
          </Typography>
        </Box>
        <Box className={styles.colorContainer}>
          <Box className={styles.secondColor}></Box>
          <Typography className={styles.colorTitle}>
            {pastDurationsByColors[duration]}
          </Typography>
        </Box>
      </Box>
      <Typography className={styles.refreshed}>Թարմացված է 20:43</Typography>
    </Box>
  )
}

export default FinanceInformation
