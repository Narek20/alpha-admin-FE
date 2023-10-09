import { Box, Button, Drawer, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import SidebarFilterSkillet from '../SidebarFiilterSkillet'
import { ProductsContext } from 'contexts/products.context'
import CategoryFilter from '@features/Filters/CategoryFilter'
import BrandFilter from '@features/Filters/BrandFilter'
import PriceFilter from '@features/Filters/PriceFilter'
import { ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const ProductTabletSidebar: React.FC<IProps> = ({ open, onClose }) => {
  const [tabletFilters, setTabletFilters] = useState<{
    [param: string]: string | string[] | number[]
  }>({})

  const { filters, setFilters } = useContext(ProductsContext)

  const handleFilter = (
    param: ProductKeys,
    filter: string | string[] | number[],
  ) => {
    const newFilters = {
      ...filters,
      [param]: Array.isArray(filter) ? filter.join(',') : filter,
    }

    setTabletFilters(newFilters)
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="left"
      variant="temporary"
      keepMounted
    >
      <Box className={styles.sidebar}>
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
        <Button
          onClick={() => {
            setFilters(tabletFilters)
            onClose()
          }}
        >
          <Typography>Փնտրել</Typography>
        </Button>
      </Box>
    </Drawer>
  )
}

export default ProductTabletSidebar
