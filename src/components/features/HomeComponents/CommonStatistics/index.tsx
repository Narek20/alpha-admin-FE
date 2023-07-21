import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import OrderAddModal from '@features/OrderComponents/AddOrderModal'
import CommonSearch from '@shared/CommonSearch'
import SectionHeader from '@shared/SectionTitle'
import { commonStatistics } from '@utils/statistics/constants'

import styles from './styles.module.scss'

const CommonStatistics = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Box className={styles.statistics}>
      <SectionHeader title="Ընդհանուր Ստատիստիկա" />
      <Box className={styles.statisticContainer}>
        <CommonSearch />
        <Button className={styles.addOrder} onClick={() => setIsOpen(true)}>
          Ավելացնել Պատվեր
        </Button>
      </Box>
      <hr />
      {commonStatistics.map((statistic) => (
        <Box
          key={statistic.title}
          style={statistic.percentagesOver ? { marginBottom: 30 } : {}}
          className={styles.statisticContainer}
        >
          <Box className={styles.titleContainer}>
            <statistic.icon sx={{ width: 30, height: 30 }} />
            <Typography className={styles.title}>{statistic.title}</Typography>
          </Box>
          <Typography
            className={statistic.percentage ? styles.percentage : styles.amount}
          >
            {statistic.qty}
          </Typography>
        </Box>
      ))}
      <OrderAddModal open={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  )
}

export default CommonStatistics
