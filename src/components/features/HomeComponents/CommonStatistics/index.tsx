import { Box, Typography } from '@mui/material'
import CommonSearch from '@shared/CommonSearch'
import SectionHeader from '@shared/SectionTitle'
import { commonStatistics } from '@utils/statistics/constants'

import styles from './styles.module.scss'

const CommonStatistics = () => {
  return (
    <Box className={styles.statistics}>
      <SectionHeader title="Ընդհանուր Ստատիստիկա" />
      <Box className={styles.statisticHeader}>
        <CommonSearch />
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
    </Box>
  )
}

export default CommonStatistics
