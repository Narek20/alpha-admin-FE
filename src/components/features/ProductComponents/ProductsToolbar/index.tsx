import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, IconButton } from '@mui/material'
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
  const { getProducts } = useContext(ProductsContext)

  const handleAdd = () => {
    navigate('/new-product')
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
    </Box>
  )
}

export default ProductsToolbar
