import { FC, useState, useContext } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined'
import ProductAddModal from '@shared/AddProductModal'
import { ProductsContext } from 'contexts/products.context'

import styles from './styles.module.scss'

interface IProps {
  isBig: boolean
  changeDisplay: (isBig: boolean) => void
}

const ProductsToolbar: FC<IProps> = ({ isBig, changeDisplay }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { getProducts } = useContext(ProductsContext)

  const handleAdd = () => {
    setIsOpen(true)
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
      </Box>
      <Box className={styles.rightBar}>
        <Button className={styles.button} onClick={handleAdd}>
          Ավելացնել
        </Button>
        <Button className={styles.button} onClick={() => getProducts()}>
          Բոլոր ապրանքները
        </Button>
      </Box>
      <ProductAddModal open={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  )
}

export default ProductsToolbar
