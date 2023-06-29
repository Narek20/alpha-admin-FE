import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const Analytics: FC<IProps> = () => {
  return (
    <Box className={styles.analytics}>
      <SectionHeader title="Անալիտիկա" />
    </Box>
  )
}

export default Analytics
