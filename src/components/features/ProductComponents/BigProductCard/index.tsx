import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Box, Typography } from '@mui/material'
import Loading from '@shared/Loading'
import { IProduct } from 'types/product.types'
import { priceFormatter } from '@utils/priceFormatter'

import styles from './styles.module.scss'

interface IProps {
  product: IProduct
}

const BigProductCard: FC<IProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

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
    <Box className={styles.card} onClick={() => navigate(`${product.id}`)}>
      <Box className={styles.img}>
        {isLoading ? (
          <Loading />
        ) : (
          <img className={styles.img} src={product.images[0]} alt="Ապրանք" />
        )}
      </Box>
      <Box className={styles.titleContainer}>
        <Typography className={styles.title}>{product.title} /</Typography>
        <Typography className={styles.category}>
          {product.category.title} /
        </Typography>
        <Typography className={styles.category}>{product.brand}</Typography>
      </Box>
      <Typography className={styles.price}>
        Արժեքը։ {priceFormatter(product.price)} դր․
      </Typography>
    </Box>
  )
}

export default BigProductCard
