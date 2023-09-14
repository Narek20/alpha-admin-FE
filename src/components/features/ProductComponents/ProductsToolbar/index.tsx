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
import ProductSettings from '../ProductSettings'
import AddStorageProduct from '../../StorageComponents/AddStorageProduct'
import { AuthContext } from 'contexts/auth.context'
import { ProductsContext } from 'contexts/products.context'
import { UserStatus } from 'types/user.types'

import styles from './styles.module.scss'

interface IProps {
  isBig: boolean
  changeDisplay: (isBig: boolean) => void
}

const ProductsToolbar: FC<IProps> = ({ isBig, changeDisplay }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const navigate = useNavigate()
  const { pagination, getProducts } = useContext(ProductsContext)
  const { userData } = useContext(AuthContext)

  const handleAdd = () => {
    navigate('/new-product')
  }

  const changeItemsCount = (count: string) => {
    pagination.take = +count
    getProducts()
  }

  return (
    <Box className={styles.toolbar}>
      <Box className={styles.leftBar}>
        <IconButton onClick={() => changeDisplay(true)}>
          <GridViewOutlinedIcon sx={{ color: isBig ? 'black' : 'black' }} />
        </IconButton>
        <IconButton onClick={() => changeDisplay(false)}>
          <ViewCompactOutlinedIcon sx={{ color: isBig ? 'black' : 'black' }} />
        </IconButton>
        <FormControl className={styles.form}>
          <Select
            value={pagination.take || 10}
            onChange={(evt) => changeItemsCount(evt.target.value as string)}
          >
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="50">50</MenuItem>
            <MenuItem value="100">100</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {userData?.status !== UserStatus.USER && (
        <Box className={styles.rightBar}>
          <Button className={styles.button} onClick={handleAdd}>
            Ավելացնել
          </Button>
          <Button className={styles.button} onClick={() => setIsOpen(true)}>
            Ապրանքի ընդունում
          </Button>
          <Button
            className={styles.button}
            onClick={() => setIsSettingsOpen(true)}
          >
            Կարգավորումներ
          </Button>
        </Box>
      )}
      {isOpen && <AddStorageProduct onClose={() => setIsOpen(false)} />}
      {isSettingsOpen && (
        <ProductSettings onClose={() => setIsSettingsOpen(false)} />
      )}
    </Box>
  )
}

export default ProductsToolbar
