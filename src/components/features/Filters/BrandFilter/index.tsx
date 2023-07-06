import { FC, useState } from 'react'
import { Box } from '@mui/material'
import BrandSelect from '@shared/BrandSelect'
import { ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  onChange?: (key: ProductKeys, filter: string) => void
}

const BrandFilter: FC<IProps> = ({ onChange }) => {
  const [brand, setBrand] = useState('')

  const handleChange = (value: string) => {
    if (onChange) onChange(ProductKeys.BRAND, value)
    setBrand(value)
  }

  return (
    <Box className={styles.brandFilter}>
      <BrandSelect brand={brand} onChange={handleChange} />
    </Box>
  )
}

export default BrandFilter
