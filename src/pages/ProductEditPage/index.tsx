import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, Button } from '@mui/material'
import Loading from '@shared/Loading'
import BrandSelect from '@shared/BrandSelect'
import ColorSelect from '@shared/ColorSelect'
import SeasonSelect from '@shared/SeasonSelect'
import GenderSelect from '@shared/GenderSelect'
import SectionHeader from '@shared/SectionTitle'
import CountrySelect from '@shared/CountrySelect'
import CategorySelect from '@shared/CategorySelect'
import ClaspTypeSelect from '@shared/FastenerTypeSelect'
import NewProductSizes from '@features/ProductComponents/ProductSizes'
import NewProductImages from '@features/ProductComponents/ProductImages'
import { useToast } from 'contexts/toast.context'
import { getFormData } from '@utils/product/formData'
import { getProductById, updateProduct } from 'services/products.service'
import { ICreateProduct, ProductKeys, Sizes } from 'types/product.types'

import styles from './styles.module.scss'

const ProductEditPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [productData, setProductData] = useState<
    ICreateProduct & { images: File[] }
  >({
    gender: '',
    title: '',
    brand: '',
    price: 0,
    color: '',
    sizes: [],
    season: '',
    weight: '',
    country: '',
    category: '',
    purchasePrice: 0,
    clasp: '',
    shoesHeight: '',
    images: [],
  })

  const { id = 0 } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleChange = (
    key: ProductKeys,
    value: string | string[] | number
  ) => {
    setProductData({ ...productData, [key]: value })
  }

  const addSize = () => {
    setProductData({
      ...productData,
      sizes: [...productData.sizes, { size: '' }],
    })
  }

  const handleChangeImages = (images: File[]) => {
    setProductData({ ...productData, images: images })
  }

  const handleSizeChange = (sizes: Sizes[]) => {
    setProductData({ ...productData, sizes })
  }

  const handleEdit = async () => {
    const formData = getFormData(productData)
    const data = await updateProduct(formData, +id)

    if (data.success) {
      showToast('success', data.message)
      navigate('/products')
    }
  }

  const getProduct = async () => {
    if (id) {
      setIsLoading(true)
      const data = await getProductById(id)

      if (data.success) {
        setProductData(data.data)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

  return (
    <Box className={styles.newProductPage}>
      <Box className={styles.productData}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Box id="info"></Box>
            <SectionHeader title="Բնութագրերը" />
            <TextField
              value={productData.title}
              label="Անվանումը"
              onChange={(evt) =>
                handleChange(ProductKeys.TITLE, evt.target.value)
              }
            />
            <CategorySelect
              category={productData.category}
              onChange={(category) =>
                handleChange(ProductKeys.CATEGORY, category)
              }
            />
            <Box className={styles.prices}>
              <TextField
                className={styles.purchase}
                value={productData.purchasePrice}
                label="Առք"
                type="number"
                onChange={(evt) =>
                  handleChange(ProductKeys.PURCHASE_PRICE, +evt.target.value)
                }
              />
              <TextField
                className={styles.price}
                value={productData.price}
                label="Վաճառք"
                type="number"
                onChange={(evt) =>
                  handleChange(ProductKeys.PRICE, +evt.target.value)
                }
              />
            </Box>
            <BrandSelect
              brand={productData.brand}
              onChange={(brand) => handleChange(ProductKeys.BRAND, brand)}
            />
            <ClaspTypeSelect
              clasp={productData.clasp}
              onChange={(clasp) => handleChange(ProductKeys.CLASP, clasp)}
            />
            <GenderSelect
              gender={productData.gender}
              onChange={(gender) => handleChange(ProductKeys.GENDER, gender)}
            />
            <SeasonSelect
              season={productData.season}
              onChange={(season) => handleChange(ProductKeys.SEASON, season)}
            />
            <TextField
              label="Քաշը(գր․)"
              value={productData.weight}
              onChange={(evt) =>
                handleChange(ProductKeys.WEIGHT, evt.target.value)
              }
            />
            <TextField
              label="Կոշիկի բարձրությունը(սմ․)"
              value={productData.shoesHeight}
              onChange={(evt) =>
                handleChange(ProductKeys.SHOES_HEIGHT, evt.target.value)
              }
            />
            <CountrySelect
              country={productData.country}
              onChange={(country) => handleChange(ProductKeys.COUNTRY, country)}
            />
            <Box id="colors"></Box>
            <SectionHeader title="Գույները" />
            <Box id="sizes"></Box>
            <ColorSelect
              color={productData.color || ''}
              onChange={(colors) => handleChange(ProductKeys.COLOR, colors)}
            />
            <NewProductSizes
              sizes={productData.sizes}
              handleSizeChange={handleSizeChange}
              addSize={addSize}
            />
            <Box id="images"></Box>
            <NewProductImages
              images={productData.images}
              changeImages={handleChangeImages}
            />
            <Button className={styles.addBtn} onClick={handleEdit}>
              Պահպանել
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ProductEditPage
