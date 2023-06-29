import { Box } from '@mui/material'
import Notes from '@features/Notes'
import Turnover from '@features/Turnover'
import Supplies from '@features/Supplies'
import Feedbacks from '@features/Feedbacks'
import Analytics from '@features/Analytics'
import Questions from '@features/Questions'
import StorageLoad from '@features/StorageLoad'
import MarketPlace from '@features/MarketPlace'
import CommonStatistics from '@features/CommonStatistics'
import FinanceStatistics from '@features/FinanceStatistics'
import StorageWaitingTime from '@features/StorageWaitingTime'

import styles from './styles.module.scss'

const Home = () => {
  return (
    <Box className={styles.home}>
      <CommonStatistics />
      <FinanceStatistics />
      <StorageLoad />
      <MarketPlace />
      <Notes />
      <Feedbacks />
      <Questions />
      <Analytics />
      <Turnover />
      <StorageWaitingTime />
      <Supplies />
    </Box>
  )
}

export default Home
