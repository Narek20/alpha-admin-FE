import { useState } from 'react'
import { Box } from '@mui/material'

import styles from './styles.module.scss'
import BrandSelect from '@shared/BrandSelect'

const BrandFilter = () => {
  const [brand, setBrand] = useState('')

  return (
    <Box className={styles.brandFilter}>
      <BrandSelect brand={brand} onChange={setBrand} />
    </Box>
  )
}

export default BrandFilter
