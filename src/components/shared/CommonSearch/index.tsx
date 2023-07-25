import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Autocomplete, TextField } from '@mui/material'
import { search } from 'services/products.service'

import styles from './styles.module.scss'

interface IProps {}

const CommonSearch: FC<IProps> = () => {
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState<
    Array<{ title: string; link: string }>
  >([])
  const handleSearch = async (value: string | null) => {
    if (value) {
      setSearchValue(value)

      const data = await search(value)

      if (data.success) {
        setResults(data.data)
      }
    }
  }

  return (
    <Autocomplete
      className={styles.search}
      freeSolo
      value={searchValue}
      onChange={(_, newValue) => {
        handleSearch(newValue)
      }}
      options={results.map((item) => item.title)}
      renderInput={(params) => (
        <TextField {...params} label="Search" variant="outlined" fullWidth />
      )}
      renderOption={(option) => (
        <Link to={`${option.title}`}>{option.title}</Link>
      )}
    />
  )
}

export default CommonSearch
