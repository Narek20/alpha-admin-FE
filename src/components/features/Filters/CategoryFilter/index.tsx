import { useState } from 'react'
import { Box } from '@mui/material'
import CategorySelect from '@shared/CategorySelect'

import styles from './styles.module.scss'

const CategoryFilter = () => {
  const [category, setCategory] = useState('')

  return (
    <Box className={styles.categoryFilter}>
      <CategorySelect category={category} onChange={setCategory} />
    </Box>
  )
}

export default CategoryFilter
