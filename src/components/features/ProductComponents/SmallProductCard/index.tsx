import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Box, Typography } from '@mui/material'
import Loading from '@shared/Loading'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'
import LazyImage from '@shared/LazyImage'

interface IProps {
  product: IProduct
}

const SmallProductCard: FC<IProps> = ({ product }) => {
  const [isProductExist, setIsProductExist] = useState(true)
  const navigate = useNavigate()

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
        <LazyImage src={product.images[0]} alt="Ապրանք" />
        {!isProductExist && <hr className={styles.line} />}
      </Box>
      <Typography className={styles.title} style={{ overflowWrap: 'anywhere' }}>
        {product.title}
      </Typography>
      <Typography className={styles.brand}>{product.brand}</Typography>
    </Box>
  )
}

export default SmallProductCard
