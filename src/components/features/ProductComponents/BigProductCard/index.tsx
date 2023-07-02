import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { ProductType } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  product: ProductType
}

const BigProductCard: FC<IProps> = ({ product }) => {
  return (
    <Box className={styles.card}>
      <img className={styles.img} src={product.img[0]} alt="Ապրանք" />
      <Typography className={styles.brand}>{product.brand}</Typography>
      <Typography className={styles.title}>{product.title}</Typography>
      <Typography></Typography>
    </Box>
  )
}

export default BigProductCard
