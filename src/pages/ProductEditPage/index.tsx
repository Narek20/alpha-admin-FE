import { useState, useEffect, useContext } from 'react'
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
import NewProductSizes from '@features/ProductComponents/NewProductSizes'
import NewProductImages from '@features/ProductComponents/NewProductImages'
import { getProductById } from 'services/products.service'
import { useToast } from 'contexts/toast.context'
import { ProductsContext } from 'contexts/products.context'
import { ICreateProduct, ProductKeys } from 'types/product.types'

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
    smSizes: [],
    purchasePrice: 0,
    clasp: '',
    shoesHeight: '',
    images: [],
  })

  const { id } = useParams()
  const navigate = useNavigate()
  const { getProducts } = useContext(ProductsContext)
  const { showToast } = useToast()

  const handleChange = (
    key: ProductKeys,
    value: string | string[] | number
  ) => {
    setProductData({ ...productData, [key]: value })
  }

  const addSize = () => {
    setProductData({ ...productData, sizes: [...productData.sizes, ''] })
  }

  const handleChangeImages = (images: File[]) => {
    setProductData({ ...productData, images: images })
  }

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSizeChange = () => {}

  const handleEdit = async () => {
    // const data = await updateProduct(productData)
  }

  const getProduct = async () => {
    if (id) {
      setIsLoading(true)
      const data = await getProductById(id)

      if (data.success) {
        setProductData({
          ...data.data,
          sizes: data.data.sizes.split(','),
          smSizes: data.data.smSizes.split(','),
        })
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

  return (
    <Box className={styles.newProductPage}>
      <Box className={styles.sidebar}>
        <Button className={styles.button} onClick={() => handleScroll('info')}>
          Բնութագրեր
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleScroll('colors')}
        >
          Գույներ
        </Button>
        <Button className={styles.button} onClick={() => handleScroll('sizes')}>
          Չափսեր
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleScroll('images')}
        >
          Նկարներ
        </Button>
        <Button className={styles.addBtn} onClick={handleEdit}>
          Պահպանել
        </Button>
      </Box>
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
            <SectionHeader title="Գույները" />
            <Box id="colors"></Box>
            <ColorSelect
              color={productData.color || ''}
              onChange={(colors) => handleChange(ProductKeys.COLOR, colors)}
            />
            <Box id="sizes"></Box>
            <NewProductSizes
              sizes={productData.sizes}
              handleSizeChange={handleSizeChange}
              smSizes={productData.smSizes}
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
