import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

const RegionSales = () => {
  return (
    <Box className={styles.regionSales}>
      <SectionHeader title='4.Վաճառք ըստ տարածաշրջանների'/>
    </Box>
  )
}

export default RegionSales