import { Box } from '@mui/material'
import Loading from '@shared/Loading'

import styles from './styles.module.scss'

const LoadingPage = () => {
  return (
    <Box className={styles.loadingPage}>
      <Loading />
    </Box>
  )
}

export default LoadingPage
