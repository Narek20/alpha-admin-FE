import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'

const OrderProductCard: FC<IProduct & { quantity: number }> = ({
  quantity,
  price,
  category,
  brand,
  title,
  images,
}) => {
  return (
    <Box className={styles.productCard}>
      <img src={images[0]} className={styles.img} alt="նկար" />
      <Box className={styles.detailContainer}>
        <Typography className={styles.label}>Կատեգորիան</Typography>
        <Typography className={styles.detail}>{category}</Typography>
      </Box>
      <Box className={styles.detailContainer}>
        <Typography className={styles.label}>Քանակը</Typography>
        <Typography className={styles.detail}>{quantity}</Typography>
      </Box>
      <Box className={styles.detailContainer}>
        <Typography className={styles.label}>Անվանումը</Typography>
        <Typography className={styles.detail}>{title}</Typography>
      </Box>
      <Box className={styles.detailContainer}>
        <Typography className={styles.label}>Գինը</Typography>
        <Typography className={styles.detail}>{price}</Typography>
      </Box>
      <Box className={styles.detailContainer}>
        <Typography className={styles.label}>Բրենդը</Typography>
        <Typography className={styles.detail}>{brand}</Typography>
      </Box>
    </Box>
  )
}

export default OrderProductCard
