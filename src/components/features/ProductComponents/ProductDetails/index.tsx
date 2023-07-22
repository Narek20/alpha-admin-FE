import { FC, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Box, Button, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import ImageCarousel from '@shared/ImageCarousel'
import ConfirmationModal from '@shared/ConfirmationModal'
import { useToast } from 'contexts/toast.context'
import { IProduct, Sizes } from 'types/product.types'
import { removeProduct, updateProduct } from 'services/products.service'
import { additionalDetailsKeys } from '@utils/product/constants'

import styles from './styles.module.scss'

const ProductDetails: FC<{ product: IProduct }> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [productSizes, setProductSizes] = useState<Sizes[]>([])
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleSave = async () => {
    const formData = new FormData()
    formData.append('sizes', JSON.stringify(productSizes))

    const data = await updateProduct(formData, product.id)

    if (data.success) {
      showToast('success', data.message)
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

  const handleRemove = async () => {
    setIsOpen(true)
  }

  const handleConfirm = async () => {
    const data = await removeProduct(`${product.id}`)

    if (data.success) {
      showToast('success', data.message)
      navigate('/products')
    }
  }

  useEffect(() => {
    if (product.sizes?.length) {
      setProductSizes(product.sizes)
    }
  }, [product.sizes])

  return (
    <>
      <Box className={styles.carousel}>
        <ImageCarousel slides={product.images} size={500} />
      </Box>
      <Box className={styles.productDetails}>
        <Box className={styles.details}>
          <Box className={styles.titleContainer}>
            <Typography className={styles.title}>{product.title} /</Typography>
            <Typography className={styles.category}>
              {product.category.title}
            </Typography>
          </Box>
          <Box className={styles.ratingContainer}>
            <StarOutlinedIcon
              sx={{ width: 15, height: 15, color: '#FF773C' }}
            />
            <Typography className={styles.rating}>
              {product.rating || 0}
            </Typography>
          </Box>
          <Box className={styles.additionalInformation}>
            {additionalDetailsKeys.map(
              ({ key, label }) =>
                product[key] && (
                  <Box className={styles.infoContainer} key={key}>
                    <Typography className={styles.label}>{label}:</Typography>
                    <Typography className={styles.info}>
                      {product[key]}
                    </Typography>
                  </Box>
                )
            )}
            {product.additionalInfo &&
              product.additionalInfo.map(({ value, title }) => (
                <Box className={styles.infoContainer} key={title}>
                  <Typography className={styles.label}>{title}:</Typography>
                  <Typography className={styles.info}>{value}</Typography>
                </Box>
              ))}
          </Box>
          <Box className={styles.sizeTitleContainer}>
            <Typography className={styles.sizesTitle}>Չափսերը: </Typography>
            <IconButton onClick={() => setIsEdit(true)}>
              <ModeEditOutlineOutlinedIcon />
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
                  <hr className={styles.line} />
                </Box>
                <Box className={styles.sizeDetails}>
                  <Typography>Քանակը։ {quantity || 0} հատ</Typography>
                  <Typography>Երկարությունը: {smSize}սմ․</Typography>
                </Box>
                {isEdit && (
                  <Box className={styles.sizeActions}>
                    <IconButton
                      className={styles.plusBtn}
                      onClick={() =>
                        handleChange(index, quantity ? ++quantity : 1)
                      }
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
        <Box className={styles.actions}>
          <Button
            className={styles.seeMore}
            onClick={() => navigate(`/edit-product/${product.id}`)}
          >
            Փոփոխել
          </Button>
          <Button className={styles.removeBtn} onClick={handleRemove}>
            Հեռացնել Ապրանքը
          </Button>
        </Box>
        <ConfirmationModal
          btnText={'Հեռացնել Ապրանքը'}
          onClose={() => setIsOpen(false)}
          open={isOpen}
          text="Հեռացնել Ապրանքը"
          onConfirm={handleConfirm}
        />
      </Box>
    </>
  )
}

export default ProductDetails
