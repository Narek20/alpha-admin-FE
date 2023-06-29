import { FC, useState } from 'react'
import { Box, Button } from '@mui/material'
import LineChart from '@features/LineChart'
import FinanceTabs from '@features/FinanceTabs'
import FinanceInformation from '@features/FinanceInformation'
import SectionHeader from '@shared/SectionTitle'
import { Durations, PurchaseTypes } from 'types/Finances/types'

import styles from './styles.module.scss'

interface IProps {}

const FinanceStatistics: FC<IProps> = () => {
  const [purchaseType, setPurchaseType] = useState<PurchaseTypes>(
    PurchaseTypes.ORDERED
  )
  const [duration, setDuration] = useState<Durations>(Durations.DAY)

  return (
    <Box className={styles.statistics}>
      <SectionHeader title="Ֆինանսական Ստատիստիկա" />
      <FinanceTabs
        purchaseType={purchaseType}
        duration={duration}
        onDurationChange={setDuration}
        onPurchaseTypeChange={setPurchaseType}
      />
      <Box className={styles.information}>
        <FinanceInformation
          amount={12}
          duration={duration}
          totalPrice={923849}
          amountDifference={12}
          priceDifference={-1012321}
        />
        <LineChart />
      </Box>
    </Box>
  )
}

export default FinanceStatistics
