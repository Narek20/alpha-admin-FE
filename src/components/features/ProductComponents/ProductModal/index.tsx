import { FC } from 'react'
import { Box, Modal } from '@mui/material'
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
          <ProductDetails product={product} />
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductModal
