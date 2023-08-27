import { FC, useState } from 'react'
import { Box } from '@mui/material'
import CategorySelect from '@shared/CategorySelect'
import { ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  onChange?: (key: ProductKeys, filter: string) => void
}

const CategoryFilter: FC<IProps> = ({ onChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleChange = (value: string[]) => {
    if (onChange) onChange(ProductKeys.CATEGORY, value.join(' '))
    setSelectedCategories(value)
  }

  return (
    <Box className={styles.categoryFilter}>
      <CategorySelect
        selectedCategories={selectedCategories}
        onCategoriesChange={handleChange}
        multiple={true}
      />
    </Box>
  )
}

export default CategoryFilter
