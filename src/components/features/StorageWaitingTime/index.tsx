import { Box } from '@mui/material'
import LineChart from '@features/LineChart'
import WaitingTimeInformation from '@features/WaitingTimeInformation'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Example1 Chart',
      data: [12, 34, 45, 66, 0, 100],
      fill: false,
      borderColor: '#3A0078',
      tension: 0.5,
    },
    {
      label: 'Example2 Chart',
      data: [100, 80, 60, 40, 20, 0],
      fill: false,
      borderColor: '#067B00',
      tension: 0.5,
    },
    {
      label: 'Example3 Chart',
      data: [1, 100, 12, 13, 20, 60],
      fill: false,
      borderColor: '#FF773C',
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

const StorageWaitingTime = () => {
  return (
    <Box className={styles.storageWaitingTime}>
      <SectionHeader title="Պահեստի Սպասելաժամը" />
      <Box className={styles.information}>
        <WaitingTimeInformation
          todaysTime="0 րոպե"
          lastWeekTime="40 րոպե"
          yesterdaysTime="20 րոպե"
        />
        <LineChart data={data} options={options} />
      </Box>
    </Box>
  )
}

export default StorageWaitingTime
