import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const Supplies: FC<IProps> = () => {
  return (
    <Box className={styles.supplies}>
      <SectionHeader title="Պահեստ" />
    </Box>
  )
}

export default Supplies
