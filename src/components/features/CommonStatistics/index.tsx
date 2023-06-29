import { Box, Tooltip, Typography } from '@mui/material'
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined'
import SectionHeader from '@shared/SectionTitle'
import { commonStatistics } from '@utils/statistics/constants'

import styles from './styles.module.scss'

const CommonStatistics = () => {
  return (
    <Box className={styles.statistics}>
      <SectionHeader title="Ընդհանուր Ստատիստիկա" />
      <Box className={styles.statisticContainer}>
        <Typography className={styles.totalPrice}>2340230դր․</Typography>
        <Tooltip
          className={styles.tooltip}
          title="Ընդհանուր եկամուտը շաբաթվա կտրվածքով"
        >
          <QuestionMarkOutlinedIcon />
        </Tooltip>
      </Box>
      <hr />
      {commonStatistics.map((statistic) => (
        <Box
          key={statistic.title}
          style={statistic.percentagesOver ? { marginBottom: 30 } : {}}
          className={styles.statisticContainer}
        >
          <Box className={styles.titleContainer}>
            <statistic.icon sx={{ color: '77767E', width: 30, height: 30 }} />
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
