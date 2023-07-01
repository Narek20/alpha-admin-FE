import { FC, useContext, useState } from 'react'
import { Box, Stack, Pagination } from '@mui/material'
import BigProductCard from '@features/BigProductCard'
import ProductsToolbar from '@features/ProductsToolbar'
import SmallProductCard from '@features/SmallProductCard'
import { ProductsContext } from 'contexts/products.context'

import styles from './styles.module.scss'

interface IProps {}

const Products: FC<IProps> = ({}) => {
  const [isBig, setIsBig] = useState(true)

  const { products } = useContext(ProductsContext)

  return (
    <Box className={styles.productsContainer}>
      <ProductsToolbar isBig={isBig} changeDisplay={setIsBig} />
      <Box className={styles.items}>
        {products.map((product) =>
          isBig ? (
            <BigProductCard key={product.title} product={product} />
          ) : (
            <SmallProductCard key={product.title} product={product} />
          )
        )}
      </Box>
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" />
      </Stack>
    </Box>
  )
}

export default Products
