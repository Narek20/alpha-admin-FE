import { FC, useEffect, useRef, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Loading from '@shared/Loading'
import ProductModal from '../ProductModal'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  product: IProduct
}

const BigProductCard: FC<IProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false)
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
