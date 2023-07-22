import { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {}

const Loading: FC<IProps> = () => {
  return (
    <Box className={styles.loading}>
      <CircularProgress color="warning" />
    </Box>
  )
}

export default Loading
