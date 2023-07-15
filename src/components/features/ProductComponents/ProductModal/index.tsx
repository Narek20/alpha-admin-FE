import { FC } from 'react'
import { useNavigate } from 'react-router'
import { Box, Modal } from '@mui/material'
import ProductDetails from '../ProductDetails'
import { IProduct } from 'types/product.types'
import Loading from '@shared/Loading'

import styles from './styles.module.scss'

interface IProps {
  product: IProduct | null
}

const ProductModal: FC<IProps> = ({ product }) => {
  const navigate = useNavigate()

  return (
    <Modal
      className={styles.modal}
      open={true}
      onClose={() => navigate('/products')}
    >
      <Box className={styles.modalContent}>
        {product ? (
          <Box className={styles.content}>
            <ProductDetails product={product} />
          </Box>
        ) : (
          <Loading />
        )}
      </Box>
    </Modal>
  )
}

export default ProductModal
