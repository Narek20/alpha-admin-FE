import { Box, Typography } from '@mui/material'
import SizeFilter from '@features/Filters/SizeFilter'
import NameFilter from '@features/Filters/NameFilter'
import PriceFilter from '@features/Filters/PriceFilter'
import BrandFilter from '@features/Filters/BrandFilter'
import CategoryFilter from '@features/Filters/CategoryFilter'
import SidebarFilterSkillet from '@features/SidebarFiilterSkillet'

import styles from './styles.module.scss'

const ProductsSidebar = () => {
  return (
    <Box className={styles.sidebar}>
      <Typography>Ֆիլտր</Typography>
      <SidebarFilterSkillet title="Անունը" children={<NameFilter />} />
      <SidebarFilterSkillet title="Գինը" children={<PriceFilter />} />
      <SidebarFilterSkillet title="Տեսակը" children={<CategoryFilter />} />
      <SidebarFilterSkillet title="Բրենդը" children={<BrandFilter />} />
      <SidebarFilterSkillet title="Չափսը" children={<SizeFilter />} />
    </Box>
  )
}

export default ProductsSidebar
