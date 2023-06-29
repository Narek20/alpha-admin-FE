import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const FinanceStatistics: FC<IProps> = () => {
  return (
    <Box className={styles.statistics}>
      <SectionHeader title="Ֆինանսական Ստատիստիկա" />
    </Box>
  )
}

export default FinanceStatistics
