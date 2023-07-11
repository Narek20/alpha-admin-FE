import { useContext, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import NameFilter from '@features/Filters/NameFilter'
import PriceFilter from '@features/Filters/PriceFilter'
import BrandFilter from '@features/Filters/BrandFilter'
import CategoryFilter from '@features/Filters/CategoryFilter'
import { ProductsContext } from 'contexts/products.context'
import SidebarFilterSkillet from '../SidebarFiilterSkillet'
import { ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

const ProductsSidebar = () => {
  const { filters, setFilters } = useContext(ProductsContext)

  const handleFilter = (
    param: ProductKeys,
    filter: string | string[] | number[]
  ) => {
    if (Array.isArray(filter)) {
      return setFilters({ ...filters, [param]: filter.join(',') })
    }

    setFilters({ ...filters, [param]: filter })
  }

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.header}>
        <Typography>Ֆիլտր</Typography>
      </Box>
      <SidebarFilterSkillet
        title="Անունը"
        children={<NameFilter onChange={handleFilter} />}
      />
      <SidebarFilterSkillet
        title="Գինը"
        children={<PriceFilter onChange={handleFilter} />}
      />
      <SidebarFilterSkillet
        title="Տեսակը"
        children={<CategoryFilter onChange={handleFilter} />}
      />
      <SidebarFilterSkillet
        title="Բրենդը"
        children={<BrandFilter onChange={handleFilter} />}
      />
    </Box>
  )
}

export default ProductsSidebar