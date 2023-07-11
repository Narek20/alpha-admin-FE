import { FC, useContext, useState, useEffect } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { updateProduct } from 'services/products.service'
import { ProductsContext } from 'contexts/products.context'
import { ICreateProduct, IProduct, Sizes } from 'types/product.types'

import styles from './styles.module.scss'

const ProductDetails: FC<IProduct & { onClose: () => void }> = ({
  id,
  title,
  color,
  rating,
  category,
  price,
  sizes,
  onClose,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [productSizes, setProductSizes] = useState<Sizes[]>([])
  const { getProducts } = useContext(ProductsContext)

  const handleSave = async () => {
    const formData = new FormData()
    formData.append('sizes', JSON.stringify(productSizes))

    const data = await updateProduct(formData, id)

    if (data.success) {
      getProducts()
    }
  }

  const handleChange = (index: number, value: number) => {
    setProductSizes(
      productSizes.map((elem, ind) => {
        if (ind === index) {
          return {
            ...elem,
            quantity: value,
          }
        }

        return elem
      })
    )
  }

  useEffect(() => {
    if (sizes?.length) {
      setProductSizes(sizes)
    }
  }, [sizes])

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
      <Typography className={styles.price}>
        Արժեքը։ {price.toLocaleString()} դր․
      </Typography>
      {color && (
        <Typography className={styles.color}>Գույնը։ {color}</Typography>
      )}
      <Box className={styles.sizeTitleContainer}>
        <Typography className={styles.sizesTitle}>Չափսերը: </Typography>
        <IconButton onClick={() => setIsEdit(true)}>
          <ModeEditOutlineOutlinedIcon sx={{ color: '#f6c71e' }} />
        </IconButton>
      </Box>
      <Box className={styles.sizes}>
        {productSizes.map(({ size, smSize, quantity }, index) => (
          <Box key={size} className={styles.sizeContainer}>
            <Box
              className={
                quantity && quantity > 0 ? styles.selectedSize : styles.size
              }
            >
              <Typography className={styles.sizeText}>{size}</Typography>
              <hr className={styles.line}/>
            </Box>
            <Box className={styles.sizeDetails}>
              <Typography>Քանակը։ {quantity || 0} հատ</Typography>
              <Typography>Երկարությունը: {smSize}սմ․</Typography>
            </Box>
            {isEdit && (
              <Box className={styles.sizeActions}>
                <IconButton
                  className={styles.plusBtn}
                  onClick={() => handleChange(index, quantity ? ++quantity : 1)}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  className={styles.minusBtn}
                  onClick={() =>
                    handleChange(
                      index,
                      quantity && quantity > 0 ? --quantity : 0
                    )
                  }
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Box className={styles.actions}>
        {isEdit && (
          <>
            <Button
              className={styles.saveBtn}
              color={'success'}
              onClick={handleSave}
            >
              Պահպանել
            </Button>
            <Button
              className={styles.cancelBtn}
              color="inherit"
              onClick={() => setIsEdit(false)}
            >
              Չեղարկել
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ProductDetails
