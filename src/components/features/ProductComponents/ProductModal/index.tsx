import { FC } from 'react'
import { useNavigate } from 'react-router'
import { Box, Button, Modal } from '@mui/material'
import ImageCarousel from '@shared/ImageCarousel'
import ProductDetails from '../ProductDetails'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  product: IProduct
  open: boolean
  onClose: () => void
}

const ProductModal: FC<IProps> = ({ open, product, onClose }) => {
  const navigate = useNavigate()
  
  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.content}>
          <Box className={styles.carousel}>
            <ImageCarousel slides={product.images} size={500} />
          </Box>
          <Box className={styles.details}>
            <ProductDetails {...product} onClose={onClose} />
            <Button
              className={styles.seeMore}
              onClick={() => navigate(`/edit-product/${product.id}`)}
            >
              Փոփոխել
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductModal
