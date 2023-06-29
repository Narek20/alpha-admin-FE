import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const StorageWaitingTime: FC<IProps> = () => {
  return (
    <Box className={styles.storageWaitingTime}>
      <SectionHeader title="Պահեստի Սպասելաժամը" />
    </Box>
  )
}

export default StorageWaitingTime
