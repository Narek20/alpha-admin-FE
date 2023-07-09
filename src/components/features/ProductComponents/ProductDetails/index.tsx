import { FC, useContext, useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { updateProduct } from 'services/products.service'
import { ProductsContext } from 'contexts/products.context'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'

const ProductDetails: FC<IProduct & { onClose: () => void }> = ({
  id,
  title,
  color,
  rating,
  category,
  price,
  sizes,
  smSizes,
  selectedSizes,
  onClose,
}) => {
  const [productSelectedSizes, setProductSelectedSizes] = useState(
    selectedSizes ? selectedSizes.split(",") : []
  )

  const [productSizes, setProductSizes] = useState<
    { sizes: string; smSizes: string }[]
  >([])
  const { getProducts } = useContext(ProductsContext)

  const handleSave = async () => {
    const data = await updateProduct({
      id,
      selectedSizes: productSelectedSizes.join(','),
    } as IProduct)

    if (data.success) {
      getProducts()
    }
  }

  const handleSelect = (size: string) => {
    if (productSelectedSizes.find((elem) => elem === size)) {
      setProductSelectedSizes(
        productSelectedSizes.filter((elem) => elem !== size)
      )
    } else {
      setProductSelectedSizes([...productSelectedSizes, size])
    }
  }

  useEffect(() => {
    if (sizes.length) {
      const productSizes = sizes.split(',')
      const selectedSmSizes = smSizes.split(',')
      setProductSizes(
        productSizes.map((size, index) => ({
          sizes: size,
          smSizes: selectedSmSizes[index],
        }))
      )
    }
  }, [sizes, smSizes])

  return (
    <Box className={styles.productDetails}>
      <Box className={styles.titleContainer}>
        <Typography className={styles.title}>{title} /</Typography>
        <Typography className={styles.category}>{category}</Typography>
      </Box>
      <Box className={styles.ratingContainer}>
        <StarOutlinedIcon sx={{ width: 15, height: 15, color: '#FF773C' }} />
        <Typography className={styles.rating}>{rating || 0}</Typography>
      </Box>
      <Typography className={styles.price}>Արժեքը։ {price} դր․</Typography>
      {color && (
        <Typography className={styles.color}>Գույնը։ {color}</Typography>
      )}
      <Typography className={styles.sizesTitle}>Չափսերը: </Typography>
      <Box className={styles.sizes}>
        {productSizes.map(({ sizes, smSizes }, index) => (
          <Box
            key={sizes}
            className={
              productSelectedSizes.find(
                (selectedSize) => selectedSize === sizes
              )
                ? styles.selectedSizeContainer
                : styles.sizeContainer
            }
            onClick={() => handleSelect(sizes)}
          >
            {sizes}
            <Box className={styles.sizeDetails}>
              <Typography className={styles.smSize}>Չափսը։ {sizes}</Typography>
              <Typography className={styles.size}>
                Ոտքի երկարությունը: {smSizes}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className={styles.actions}>
        <Button
          className={styles.saveBtn}
          color={'success'}
          onClick={handleSave}
        >
          Պահպանել
        </Button>
        <Button className={styles.cancelBtn} color="inherit" onClick={onClose}>
          Չեղարկել
        </Button>
      </Box>
    </Box>
  )
}

export default ProductDetails
