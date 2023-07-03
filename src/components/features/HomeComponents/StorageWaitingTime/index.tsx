import { Box } from '@mui/material'
import Chart from '@shared/Chart'
import SectionHeader from '@shared/SectionTitle'
import WaitingTimeInformation from '../WaitingTimeInformation'

import styles from './styles.module.scss'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      name: 'Example1 Chart',
      data: [12, 34, 45, 66, 0, 100],
    },
    {
      name: 'Example2 Chart',
      data: [100, 80, 60, 40, 20, 0],
    },
    {
      name: 'Example3 Chart',
      data: [1, 100, 12, 13, 20, 60],
    },
  ],
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
        <Chart
          series={data.datasets}
          colors={['#3A0078', '#067B00', '#FF773C']}
          labels={data.labels}
          type="line"
        />
      </Box>
    </Box>
  )
}

export default StorageWaitingTime
