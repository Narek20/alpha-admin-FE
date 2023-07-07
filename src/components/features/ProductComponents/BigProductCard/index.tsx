import { FC, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import ProductModal from '../ProductModal'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  product: IProduct
}

const BigProductCard: FC<IProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box className={styles.card}>
      <img className={styles.img} src={product.images[0]} alt="Ապրանք" />
      <Typography className={styles.price}>
        Արժեքը։ {product.price} դր․
      </Typography>
      <Box className={styles.titleContainer}>
        <Typography className={styles.title}>{product.title} /</Typography>
        <Typography className={styles.category}>{product.category}</Typography>
      </Box>
      <Button className={styles.fastView} onClick={() => setIsOpen(true)}>
        Արագ դիտում
      </Button>
      <ProductModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
      />
    </Box>
  )
}

export default BigProductCard
