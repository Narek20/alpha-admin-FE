import { Box } from '@mui/material'
import Products from '@features/ProductComponents/Products'
import ProductsSidebar from '@features/ProductComponents/ProductsSidebar'

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
