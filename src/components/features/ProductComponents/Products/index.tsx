import { useContext, useState } from 'react'
import { Box, Stack, Pagination } from '@mui/material'
import { ProductsContext } from 'contexts/products.context'
import BigProductCard from '../BigProductCard'
import ProductsToolbar from '../ProductsToolbar'
import SmallProductCard from '../SmallProductCard'
import Loading from '@shared/Loading'
import EmptyResults from '@shared/EmptyResults'

import styles from './styles.module.scss'

const Products = () => {
  const [isBig, setIsBig] = useState(true)
  const { products, isLoading } = useContext(ProductsContext)

  return (
    <Box className={styles.productsContainer}>
      <ProductsToolbar isBig={isBig} changeDisplay={setIsBig} />
      <Box className={styles.items}>
        {isLoading ? (
          <Loading />
        ) : products.length ? (
          products.map((product) =>
            isBig ? (
              <BigProductCard key={product.title} product={product} />
            ) : (
              <SmallProductCard key={product.title} product={product} />
            )
          )
        ) : (
          <EmptyResults />
        )}
      </Box>
      {!!products.length && (
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" />
        </Stack>
      )}
    </Box>
  )
}

export default Products
