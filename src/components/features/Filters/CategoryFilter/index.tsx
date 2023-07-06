import { FC, useState } from 'react'
import { Box } from '@mui/material'
import CategorySelect from '@shared/CategorySelect'
import { ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  onChange?: (key: ProductKeys, filter: string) => void
}

const CategoryFilter: FC<IProps> = ({ onChange }) => {
  const [category, setCategory] = useState('')

  const handleChange = (value: string) => {
    if (onChange) onChange(ProductKeys.CATEGORY, value)
    setCategory(value)
  }

  return (
    <Box className={styles.categoryFilter}>
      <CategorySelect category={category} onChange={handleChange} />
    </Box>
  )
}

export default CategoryFilter
