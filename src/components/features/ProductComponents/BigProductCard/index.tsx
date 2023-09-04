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
  const [isProductExist, setIsProductExist] = useState(true)
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

  useEffect(() => {
    if (product.sizes && product.sizes.length) {
      if (isProductExist) {
        let isExist = false
        product.sizes.forEach((size) => {
          if (size.quantity) {
            isExist = true
          }
        })

        if (!isExist) {
          setIsProductExist(false)
        }
      } else {
        product.sizes.forEach((size) => {
          if (size.quantity) {
            setIsProductExist(true)
          }
        })
      }
    }
  }, [product.sizes])

  return (
    <Box className={styles.card} onClick={() => navigate(`${product.id}`)}>
      <Box className={styles.img} sx={{ opacity: isProductExist ? 1 : 0.5 }}>
        {isLoading ? (
          <Loading />
        ) : (
          <img className={styles.img} src={product.images[0]} alt="Ապրանք" />
        )}
        {!isProductExist && <hr className={styles.line} />}
      </Box>
      <Box className={styles.titleContainer}>
        <Typography className={styles.title} sx={{ overflowWrap: 'anywhere' }}>
          {product.title} /{' '}
          <span
            className={styles.category}
            style={{ overflowWrap: 'anywhere' }}
          >
            {product.category.title} / {product.brand}
          </span>
        </Typography>
      </Box>
      <Typography className={styles.price}>
        Արժեքը։ {priceFormatter(product.price)} ֏
      </Typography>
    </Box>
  )
}

export default BigProductCard
