import { Box } from '@mui/material'
import Notes from '@features/HomeComponents/Notes'
import Supplies from '@features/HomeComponents/Supplies'
import Turnover from '@features/HomeComponents/Turnover'
import Analytics from '@features/HomeComponents/Analytics'
import Feedbacks from '@features/HomeComponents/Feedbacks'
import Questions from '@features/HomeComponents/Questions'
import StorageLoad from '@features/HomeComponents/StorageLoad'
import MarketPlace from '@features/HomeComponents/MarketPlace'
import CommonStatistics from '@features/HomeComponents/CommonStatistics'
import FinanceStatistics from '@features/HomeComponents/FinanceStatistics'
import StorageWaitingTime from '@features/HomeComponents/StorageWaitingTime'

import styles from './styles.module.scss'

const Home = () => {
  return (
    <Box className={styles.home}>
      <CommonStatistics />
      <FinanceStatistics />
      <StorageLoad />
      <MarketPlace />
      <Analytics />
      <Feedbacks />
      <Questions />
      <Notes />
      <Turnover />
      <StorageWaitingTime />
      <Supplies />
    </Box>
  )
}

export default Home
