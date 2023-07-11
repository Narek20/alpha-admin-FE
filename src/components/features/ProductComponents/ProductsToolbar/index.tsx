import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, IconButton, MenuItem, Select } from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined'
import { ProductsContext } from 'contexts/products.context'

import styles from './styles.module.scss'

interface IProps {
  isBig: boolean
  changeDisplay: (isBig: boolean) => void
}

const ProductsToolbar: FC<IProps> = ({ isBig, changeDisplay }) => {
  const navigate = useNavigate()
  const { getProducts, setFilters, filters } = useContext(ProductsContext)

  const handleAdd = () => {
    navigate('/new-product')
  }

  const changeItemsCount = (count: string) => {
    setFilters({ ...filters, take: count, skip: '0' })
  }

  return (
    <Box className={styles.toolbar}>
      <Box className={styles.leftBar}>
        <IconButton onClick={() => changeDisplay(true)}>
          <GridViewOutlinedIcon sx={{ color: isBig ? '#f6c71e' : 'black' }} />
        </IconButton>
        <IconButton onClick={() => changeDisplay(false)}>
          <ViewCompactOutlinedIcon
            sx={{ color: isBig ? 'black' : '#f6c71e' }}
          />
        </IconButton>
        <Select
          value={filters.take || 10}
          onChange={(evt) => changeItemsCount(evt.target.value as string)}
          className={styles.select}
        >
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="50">50</MenuItem>
          <MenuItem value="100">100</MenuItem>
        </Select>
      </Box>
      <Box className={styles.rightBar}>
        <Button className={styles.button} onClick={handleAdd}>
          Ավելացնել
        </Button>
        <Button className={styles.button} onClick={() => getProducts()}>
          Բոլոր ապրանքները
        </Button>
      </Box>
    </Box>
  )
}

export default ProductsToolbar
