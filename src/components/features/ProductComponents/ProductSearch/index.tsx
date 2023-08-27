import { useContext, useRef } from 'react'
import { ProductsContext } from 'contexts/products.context'
import { TextField } from '@mui/material'
import { getAllProducts, search } from 'services/products.service'
import { IResponse } from 'types/response.types'

import styles from './styles.module.scss'

const ProductSearch = () => {
  const { setProducts, filters } = useContext(ProductsContext)
  const abortControllerRef = useRef<AbortController>()

  const handleSearch = async (searchKey: string) => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()
    let data: IResponse
    if (searchKey.trim()) {
      data = await search(searchKey, abortControllerRef.current)
    } else {
      data = await getAllProducts(filters, abortControllerRef.current)
    }

    if (data.success) {
      setProducts(data.data)
    }
  }

  return (
    <TextField
      className={styles.search}
      onChange={(e) => handleSearch(e.target.value)}
    />
  )
}

export default ProductSearch
