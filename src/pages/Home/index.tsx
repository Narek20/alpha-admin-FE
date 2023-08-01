import { useContext } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
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
import { AuthContext } from 'contexts/auth.context'

import styles from './styles.module.scss'

const Home = () => {
  const { userData } = useContext(AuthContext)
  const theme = useTheme()

  const isTablet = useMediaQuery(theme.breakpoints.down(1200))
  const isMobile = useMediaQuery(theme.breakpoints.down(600))

  return (
    <Box className={styles.home}>
      <Box className={styles.row}>
        {(!isTablet || isMobile) && <CommonStatistics />}
        {userData?.isAdmin ? (
          <FinanceStatistics />
        ) : (
          <>
            <StorageLoad />
            <MarketPlace />
          </>
        )}
      </Box>
      <Box className={styles.row}>
        {isTablet && !isMobile && <CommonStatistics />}
        {userData?.isAdmin && (
          <>
            <StorageLoad />
            {(!isTablet || isMobile) && (
              <>
                <MarketPlace />
                <Analytics />
              </>
            )}
          </>
        )}
      </Box>
      {isTablet && !isMobile && (
        <Box className={styles.row}>
          <MarketPlace />
          <Analytics />
        </Box>
      )}
      <Box className={styles.row}>
        <Feedbacks />
        <Questions />
        {(!isTablet || isMobile) && <Notes />}
      </Box>
      <Box className={styles.row}>
        {isTablet && !isMobile && <Notes />}
        <Turnover />
        {(!isTablet || isMobile) && <Supplies />}
        {/* <StorageWaitingTime /> */}
      </Box>
      {isTablet && !isMobile && (
        <Box className={styles.row}>
          <Supplies />
        </Box>
      )}
    </Box>
  )
}

export default Home
