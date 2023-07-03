import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import Chart from '@shared/Chart'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      name: 'Example1 Chart',
      data: [65, 59, 80, 81, 56, 55],
    },
    {
      name: 'Example2 Chart',
      data: [1, 100, 12, 13, 20, 60],
    },
  ],
  fill: {
    colors: ['#F44336', '#E91E63', '#9C27B0'],
  },
}

const TurnoverAnalytics = () => {
  const [turnoverType, seTurnoverType] = useState('')

  return (
    <Box className={styles.turnover}>
      <SectionHeader title="1. Շրջանառություն անալիտիկա" />
      <Typography className={styles.description}>
        Շրջանառությունը այն ժամանակահատվածն է, որի ընթացքում վաճառվում է
        պահեստում առկա ապրանքների միջին պաշարը: Որքան ցածր է շրջանառությունը
        օրերով, որքան քիչ ժամանակ է վաճառվում ապրանքների միջին մնացորդը, այնքան
        լավ է այս ցուցանիշը:
      </Typography>

      <Box className={styles.formulaBox}>
        <Typography className={styles.formula}>
          Շրջանառություն ըստ քանակի (օր) =
        </Typography>
        <Box className={styles.equality}>
          <Typography className={styles.divider}>
            Վաճառքում առկա մնացորդը՝ հատ.
          </Typography>
          <Typography className={styles.quotient}>
            (Վաճառք - վերադարձ), հատ.
          </Typography>
        </Box>
      </Box>
      <Box className={styles.chartBox}>
        <Chart
          height={500}
          series={data.datasets}
          labels={data.labels}
          fills={data.fill}
          colors={['rgb(75, 192, 192)', '#FBE8C4']}
          type="line"
        />
      </Box>
      <Box className={styles.turnoverTypes}>
        <Button
          className={
            turnoverType === ''
              ? styles.selectedTableBtn
              : styles.tableBtn
          }
          onClick={() => seTurnoverType('remain')}
        >
          Եկամուտ մեկ միավորի մնացորդի համար
        </Button>
        <Button
          className={
            turnoverType === ''
              ? styles.selectedTableBtn
              : styles.chartBtn
          }
          onClick={() => seTurnoverType('daily')}
        >
          Ամենօրյա դինամիկա
        </Button>
      </Box>
    </Box>
  )
}

export default TurnoverAnalytics
