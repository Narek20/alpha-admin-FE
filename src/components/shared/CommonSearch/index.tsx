import { FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Autocomplete, TextField } from '@mui/material'
import { searchAll } from 'services/common.service'
import { IOrder } from 'types/order.types'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {}

const CommonSearch: FC<IProps> = () => {
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState<
    Array<{ title: string; link: string }>
  >([])

  const abortControllerRef = useRef<AbortController | null>(null)

  const handleSearch = async (value: string | null) => {
    if (value) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const abortController = new AbortController()
      abortControllerRef.current = abortController

      setSearchValue(value)

      const data = await searchAll(value, abortController)

      if (data.success) {
        const results: Array<{ title: string; link: string }> = []
        data.data.orders.forEach((order: IOrder) => {
          results.push({
            title: `${order.fullName} ${order.phone}`,
            link: `orders/${order.id}`,
          })
        })

        data.data.products.forEach((product: IProduct) => {
          results.push({
            title: `${product.title} ${product.brand}`,
            link: `products/${product.id}`,
          })
        })
        setResults(results)
      }
    }
  }

  return (
    <Autocomplete
      className={styles.search}
      getOptionLabel={(option) => option}
      options={results.map((item) => item.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(evt) => handleSearch(evt.target.value)}
        />
      )}
      renderOption={(option) => (
        <Link key={option.title} to={`${option.title}`}>
          {option.title}
        </Link>
      )}
    />
  )
}

export default CommonSearch
