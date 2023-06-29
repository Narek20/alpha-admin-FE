import { FC } from 'react'
import { Box } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

import styles from './styles.module.scss'

Chart.register(...registerables)

interface IProps {}

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

const LineChart: FC<IProps> = () => {
  return (
    <Box className={styles.chart}>
      <Line data={data} options={options} />
    </Box>
  )
}

export default LineChart
