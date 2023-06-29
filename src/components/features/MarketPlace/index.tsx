import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const MarketPlace: FC<IProps> = () => {
  return (
    <Box className={styles.marketPlace}>
      <SectionHeader title="Մարկետպլեյս" />
    </Box>
  )
}

export default MarketPlace
