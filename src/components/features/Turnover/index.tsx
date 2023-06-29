import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const Turnover: FC<IProps> = () => {
  return (
    <Box className={styles.turnover}>
      <SectionHeader title="Շրջանառություն" />
    </Box>
  )
}

export default Turnover
