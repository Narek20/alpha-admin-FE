import { useContext, useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import useTablet from '@utils/hooks/useTablet'
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
  const [tabletFilters, setTabletFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({})

  const isTablet = useTablet()

  useEffect(() => {
    isTablet && setTabletFilters(filters)
  }, [isTablet])

  const handleFilter = (
    param: ProductKeys,
    filter: string | string[] | number[],
  ) => {
    const newFilters = Array.isArray(filter)
      ? { ...filters, [param]: filter.join(',') }
      : { ...filters, [param]: filter }

    isTablet ? setTabletFilters(newFilters) : setFilters(newFilters)
  }

  return (
    <Box className={styles.sidebar}>
      <Box className={styles.header}>
        <Typography>Ֆիլտր</Typography>
        <Button className={styles.allOrders} onClick={() => setFilters({})}>
          Բոլոր ապրանքները
        </Button>
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
      {isTablet && (
        <Button onClick={() => setFilters(tabletFilters)}>
          <Typography>Փնտրել</Typography>
        </Button>
      )}
    </Box>
  )
}

export default ProductsSidebar
