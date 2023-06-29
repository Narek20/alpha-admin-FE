import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const StorageLoad: FC<IProps> = () => {
  return (
    <Box className={styles.storageLoad}>
      <SectionHeader title="Պահեստների ծանրաբեռնվածությունը" />
    </Box>
  )
}

export default StorageLoad
