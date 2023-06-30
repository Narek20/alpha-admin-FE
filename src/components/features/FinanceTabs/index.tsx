import { FC } from 'react'
import { Box, Button } from '@mui/material'
import { Durations, PurchaseTypes } from 'types/finances.types'

import styles from './styles.module.scss'

interface IProps {
  purchaseType: PurchaseTypes
  duration: Durations
  onPurchaseTypeChange: (type: PurchaseTypes) => void
  onDurationChange: (duration: Durations) => void
}

const FinanceTabs: FC<IProps> = ({
  purchaseType,
  duration,
  onPurchaseTypeChange,
  onDurationChange,
}) => {
  return (
    <Box className={styles.tabs}>
      <Box className={styles.purchaseTypes}>
        <Button
          className={
            purchaseType === PurchaseTypes.ORDERED
              ? styles.selectedChartBtn
              : styles.chartBtn
          }
          onClick={() => onPurchaseTypeChange(PurchaseTypes.ORDERED)}
        >
          Պատվիրած
        </Button>
        <Button
          className={
            purchaseType === PurchaseTypes.REDEEMED
              ? styles.selectedChartBtn
              : styles.chartBtn
          }
          onClick={() => onPurchaseTypeChange(PurchaseTypes.REDEEMED)}
        >
          Հատուցած
        </Button>
      </Box>
      <Box className={styles.durations}>
        <Button
          className={
            duration === Durations.DAY
              ? styles.selectedChartBtn
              : styles.chartBtn
          }
          onClick={() => onDurationChange(Durations.DAY)}
        >
          Այսօր
        </Button>
        <Button
          className={
            duration === Durations.WEEK
              ? styles.selectedChartBtn
              : styles.chartBtn
          }
          onClick={() => onDurationChange(Durations.WEEK)}
        >
          Մեկ շաբաթում
        </Button>
        <Button
          className={
            duration === Durations.MONTH
              ? styles.selectedChartBtn
              : styles.chartBtn
          }
          onClick={() => onDurationChange(Durations.MONTH)}
        >
          Մեկ ամսում
        </Button>
        <Button
          className={
            duration === Durations.YEAR
              ? styles.selectedChartBtn
              : styles.chartBtn
          }
          onClick={() => onDurationChange(Durations.YEAR)}
        >
          Մեկ տարում
        </Button>
      </Box>
    </Box>
  )
}

export default FinanceTabs
