import { FC } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Box } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  series: { data: number[]; name: string }[]
  labels: string[]
  colors: string[]
  height?: number
  fills?: {colors: string[]}
  type:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap'
}

const Chart: FC<IProps> = ({ series, labels, colors, type, height, fills }) => {
  const options = {
    chart: {
      type: type,
    },
    labels: [],
    stroke: {
      width: [4, 4, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: "20%"
      }
    },
    colors: colors,
    xaxis: {
      categories: labels,
    },
    yaxis: {},
    // fills: fills,
    grid: {
      row: {
        colors: ['#F4F3A9', '#F4F3A9', '#9CDAA6','#D7E7BC', '#F4F3A9']
      }
    },
  }

  return (
    <Box className={styles.chart}>
      <ReactApexChart height={height} options={options} series={series} />
    </Box>
  )
}

export default Chart
