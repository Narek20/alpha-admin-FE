import { FC } from 'react'
import { Box } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { Chart, registerables, ChartOptions, ChartData } from 'chart.js'

import styles from './styles.module.scss'

Chart.register(...registerables)

interface IProps {
  data: ChartData<'line'>
  options: ChartOptions<'line'>
}

const LineChart: FC<IProps> = ({ data, options }) => {
  return (
    <Box className={styles.chart}>
      <Line data={data} options={options} />
    </Box>
  )
}

export default LineChart
