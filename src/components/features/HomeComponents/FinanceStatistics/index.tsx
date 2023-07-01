import { useState } from 'react'
import { Box } from '@mui/material'
import LineChart from '@shared/LineChart'
import SectionHeader from '@shared/SectionTitle'
import FinanceTabs from '../FinanceTabs'
import FinanceInformation from '../FinanceInformation'
import { Durations, PurchaseTypes } from 'types/finances.types'

import styles from './styles.module.scss'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Example1 Chart',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.5,
    },
    {
      label: 'Example2 Chart',
      data: [1, 100, 12, 13, 20, 60],
      fill: false,
      borderColor: '#FBE8C4',
      tension: 0.5,
    },
  ],
}

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const FinanceStatistics = () => {
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
        <LineChart data={data} options={options} />
      </Box>
    </Box>
  )
}

export default FinanceStatistics
