import { FC, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined'
import { ProductsContext } from 'contexts/products.context'

import styles from './styles.module.scss'
import AddStorageProduct from '../AddStorageProduct'

interface IProps {
  isBig: boolean
  changeDisplay: (isBig: boolean) => void
}

const ProductsToolbar: FC<IProps> = ({ isBig, changeDisplay }) => {
  const [isOpen, setIsOpen] = useState(false)

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
        <FormControl className={styles.form}>
          <Select
            value={filters.take || 10}
            onChange={(evt) => changeItemsCount(evt.target.value as string)}
          >
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="50">50</MenuItem>
            <MenuItem value="100">100</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={styles.rightBar}>
        <Button className={styles.button} onClick={() => setIsOpen(true)}>
          Ապրանքի ներկրում
        </Button>
        <Button className={styles.button} onClick={handleAdd}>
          Ավելացնել
        </Button>
        <Button className={styles.button} onClick={() => getProducts()}>
          Բոլոր ապրանքները
        </Button>
      </Box>
      <AddStorageProduct open={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  )
}

export default ProductsToolbar
