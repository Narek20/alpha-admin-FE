import { FC, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Loading from '@shared/Loading'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  product: IProduct
}

const SmallProductCard: FC<IProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const image = new Image()
    image.src = product.images[0]
    image.addEventListener('load', handleImageLoad)
    return () => {
      image.removeEventListener('load', handleImageLoad)
    }
  }, [product.images[0]])

  return (
    <Box className={styles.card}>
      {isLoading ? (
        <Box className={styles.img}>
          <Loading />
        </Box>
      ) : (
        <img className={styles.img} src={product.images[0]} alt="Ապրանք" />
      )}
      <Typography className={styles.title}>{product.title}</Typography>
      <Typography className={styles.brand}>{product.brand}</Typography>
    </Box>
  )
}

export default SmallProductCard
