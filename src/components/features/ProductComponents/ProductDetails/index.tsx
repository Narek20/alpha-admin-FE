import { FC, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import ImageCarousel from '@shared/ImageCarousel'
import ConfirmationModal from '@shared/ConfirmationModal'
import { useToast } from 'contexts/toast.context'
import { AuthContext } from 'contexts/auth.context'
import { ProductsContext } from 'contexts/products.context'
import { UserStatus } from 'types/user.types'
import { AdditionalDetailsKeys, IProduct, Sizes } from 'types/product.types'
import { removeProduct, updateProduct } from 'services/products.service'
import { additionalDetailsKeys } from '@utils/product/constants'
import { priceFormatter } from '@utils/priceFormatter'

import styles from './styles.module.scss'

const ProductDetails: FC<{ product: IProduct }> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isProductExist, setIsProductExist] = useState(false)
  const [productSizes, setProductSizes] = useState<Sizes[]>([])

  const navigate = useNavigate()
  const { showToast } = useToast()
  const { userData } = useContext(AuthContext)
  const { products, setProducts } = useContext(ProductsContext)

  const theme = useTheme()

  const handleSave = async () => {
    const formData = new FormData()
    formData.append('sizes', JSON.stringify(productSizes))

    const data = await updateProduct(formData, product.id)

    if (data.success) {
      showToast('success', data.message)
      setProducts(
        products.map((elem) =>
          elem.id === product.id ? { ...elem, sizes: data.data.sizes } : elem,
        ),
      )
      setIsEdit(false)
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
      }),
    )
  }

  const handleRemove = async () => {
    setIsOpen(true)
  }

  const handleConfirm = async () => {
    const data = await removeProduct(`${product.id}`)

    if (data.success) {
      showToast('success', data.message)
      setProducts(products.filter(({ id }) => id !== product.id))
      navigate('/products')
    }
  }

  useEffect(() => {
    if (product.sizes?.length) {
      setProductSizes(product.sizes)

      product.sizes.forEach((size) => {
        if (size.quantity && size.quantity > 0) {
          setIsProductExist(true)
        }
      })
    } else {
      setIsProductExist(false)
    }
  }, [product.sizes])

  useEffect(() => {
    if (productSizes.length) {
      if (isProductExist) {
        let isExist = false
        productSizes.forEach((size) => {
          if (size.quantity && size.quantity > 0) {
            isExist = true
          }
        })

        if (!isExist) {
          setIsProductExist(false)
        }
      } else {
        productSizes.forEach((size) => {
          if (size.quantity && size.quantity > 0) {
            setIsProductExist(true)
          }
        })
      }
    }
  }, [productSizes])

  return (
    <>
      <Box
        className={styles.carousel}
        sx={{ opacity: isProductExist ? 1 : 0.5 }}
      >
        <ImageCarousel slides={product.images} />
        {!isProductExist && <hr className={styles.line} />}
      </Box>
      <Box className={styles.productDetails}>
        <Box className={styles.details}>
          <Box className={styles.titleContainer}>
            <Typography
              className={styles.title}
              sx={{ overflowWrap: 'anywhere' }}
            >
              {product.title} /{' '}
              <span
                className={styles.category}
                style={{ overflowWrap: 'anywhere' }}
              >
                {product.category} / {product.brand}
              </span>
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
                      {key === AdditionalDetailsKeys.PRICE ||
                      key === AdditionalDetailsKeys.PURCHASE_PRICE
                        ? `${priceFormatter(product[key])} ֏`
                        : product[key]}
                    </Typography>
                  </Box>
                ),
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
            {userData?.status !== UserStatus.USER && (
              <IconButton onClick={() => setIsEdit(true)}>
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
            )}
          </Box>
          <Box className={styles.sizes}>
            {productSizes
              .sort((a, b) => +a.size - +b.size)
              .map(({ size, smSize, quantity }, index) => (
                <Box key={size} className={styles.sizeContainer}>
                  <Box
                    className={
                      quantity && quantity > 0
                        ? styles.selectedSize
                        : styles.size
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
                            quantity && quantity > 0 ? --quantity : 0,
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
        {userData?.status !== UserStatus.USER && (
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
        )}
        {isOpen && (
          <ConfirmationModal
            btnText={'Հեռացնել Ապրանքը'}
            onClose={() => setIsOpen(false)}
            text="Հեռացնել Ապրանքը"
            onConfirm={handleConfirm}
          />
        )}
      </Box>
    </>
  )
}

export default ProductDetails
