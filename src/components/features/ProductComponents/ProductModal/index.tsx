import { FC } from 'react'
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
  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.content}>
          <Box className={styles.carousel}>
            <ImageCarousel slides={product.images} size={500} />
          </Box>
          <Box className={styles.details}>
            <ProductDetails {...product} onClose={onClose} />
            <Button className={styles.seeMore} onClick={() => {}}>
              Տեսնել ավելին
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductModal
