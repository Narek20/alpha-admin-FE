import { useEffect, useContext, useState } from 'react'
import { Outlet } from 'react-router'
import { Box, Stack, Pagination } from '@mui/material'
import BigProductCard from '../BigProductCard'
import ProductsToolbar from '../ProductsToolbar'
import SmallProductCard from '../SmallProductCard'
import Loading from '@shared/Loading'
import EmptyResults from '@shared/EmptyResults'
import { ProductsContext } from 'contexts/products.context'

import styles from './styles.module.scss'

const Products = () => {
  const [page, setPage] = useState<null | number>(null)
  const [isBig, setIsBig] = useState(true)
  const { products, isLoading, pagination, getProducts } =
    useContext(ProductsContext)

  const onPageChange = (page: number) => {
    setPage(page)
  }

  useEffect(() => {
    console.log(pagination)

    if (page) {
      pagination.skip = page - 1
      getProducts()
    }
  }, [page])

  return (
    <Box className={styles.productsContainer}>
      <ProductsToolbar isBig={isBig} changeDisplay={setIsBig} />
      <Box className={styles.items}>
        {isLoading ? (
          <Loading />
        ) : products.length ? (
          products.map((product, index) =>
            isBig ? (
              <BigProductCard key={product.title + index} product={product} />
            ) : (
              <SmallProductCard key={product.title + index} product={product} />
            ),
          )
        ) : (
          <EmptyResults />
        )}
      </Box>
      {!!products.length && pagination.count > pagination.take && (
        <Stack spacing={2}>
          <Pagination
            page={page || 1}
            count={Math.ceil(pagination.count / pagination.take)}
            variant="outlined"
            onChange={(_, page) => onPageChange(page)}
          />
        </Stack>
      )}
      <Outlet />
    </Box>
  )
}

export default Products
