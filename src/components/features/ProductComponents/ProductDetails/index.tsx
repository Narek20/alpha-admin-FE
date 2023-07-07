import { FC, useContext, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { updateProduct } from 'services/products.service'
import { ProductsContext } from 'contexts/products.context'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'

const sizeOptions = Array.from({ length: 10 }, (_, index) => index + 36 + '')

const ProductDetails: FC<IProduct & { onClose: () => void }> = ({
  title,
  color,
  rating,
  category,
  price,
  sizes,
  onClose,
}) => {
  const [selectedSizes, setSelectedSizes] = useState(sizes.split(','))
  const { getProducts } = useContext(ProductsContext)

  const handleSave = async () => {
    const data = await updateProduct({
      sizes: selectedSizes.join(','),
    } as IProduct)

    if (data.success) {
      getProducts()
    }
  }

  const handleSelect = (size: string) => {
    if (selectedSizes.find((elem) => elem === size)) {
      setSelectedSizes(selectedSizes.filter((elem) => elem !== size))
    } else {
      setSelectedSizes([...selectedSizes, size])
    }
  }

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
        {sizeOptions.map((size) => (
          <Box
            key={size}
            className={
              selectedSizes.find((elem) => elem === size)
                ? styles.selectedSize
                : styles.size
            }
            onClick={() => handleSelect(size)}
          >
            {size}
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
