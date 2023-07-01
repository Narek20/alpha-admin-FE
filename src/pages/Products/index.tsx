import { Box } from '@mui/material'
import ProductsSidebar from '@features/ProductsSidebar'
import Products from '@features/Products'

import styles from './styles.module.scss'

const ProductsPage = () => {
  return (
    <Box className={styles.productsPage}>
      <Box className={styles.content}>
        <ProductsSidebar />
        <Products />
      </Box>
    </Box>
  )
}

export default ProductsPage
