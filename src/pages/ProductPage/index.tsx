import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import ProductModal from '@features/ProductComponents/ProductModal'
import { IProduct } from 'types/product.types'
import { useParams } from 'react-router'
import { getProductById } from 'services/products.service'

// import styles from './styles.module.scss'

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null)

  const { id } = useParams()

  const getProduct = async () => {
    if (id) {
      const data = await getProductById(id)

      if (data.success) {
        setProduct(data.data)
      }
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

  return (
    <Box>
      <ProductModal product={product} />
    </Box>
  )
}

export default ProductPage
