import { FC, useState } from 'react'
import { Box } from '@mui/material'
import NameSearch from '@shared/NameSearch'
import { ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  onChange?: (key: ProductKeys, filter: string) => void
}

const NameFilter: FC<IProps> = ({ onChange }) => {
  const [searchKey, setSearchKey] = useState('')

  const handleChange = (value: string) => {
    if (onChange) onChange(ProductKeys.TITLE, value)
    setSearchKey(value)
  }

  return (
    <Box className={styles.nameFilter}>
      <NameSearch name={searchKey} onChange={handleChange} />
    </Box>
  )
}

export default NameFilter
