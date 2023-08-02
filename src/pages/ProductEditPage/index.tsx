import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, Button } from '@mui/material'
import Loading from '@shared/Loading'
import BrandSelect from '@shared/BrandSelect'
import ColorSelect from '@shared/ColorSelect'
import SectionHeader from '@shared/SectionTitle'
import CountrySelect from '@shared/CountrySelect'
import CategorySelect from '@shared/CategorySelect'
import NewProductSizes from '@features/ProductComponents/ProductSizes'
import NewProductImages from '@features/ProductComponents/ProductImages'
import { useToast } from 'contexts/toast.context'
import { CategoriesContext } from 'contexts/category.context'
import { getFormData } from '@utils/product/formData'
import { getProductById, updateProduct } from 'services/products.service'
import { ICreateProduct, ProductKeys, Sizes } from 'types/product.types'

import styles from './styles.module.scss'

const max = 1000000
const min = 0

const ProductEditPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [additionalFields, setAdditionalFields] = useState<
    { key: string; title: string }[]
  >([])
  const [productData, setProductData] = useState<
    ICreateProduct & { images: File[] }
  >({
    title: '',
    brand: '',
    price: 0,
    color: '',
    sizes: [],
    country: '',
    category: '',
    purchasePrice: 0,
    images: [],
    additionalInfo: [],
  })

  const { id = 0 } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { categories } = useContext(CategoriesContext)

  const handleChange = (
    key: ProductKeys,
    value: string | string[] | number,
  ) => {
    let changedValue = value

    if (key === ProductKeys.PRICE || key === ProductKeys.PURCHASE_PRICE) {
      if (+changedValue > max) changedValue = max
      if (+changedValue < min) changedValue = min
    }

    setProductData({ ...productData, [key]: changedValue })
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

  const handleChangeInfo = (key: string, title: string, value: string) => {
    const chosenInfo = productData.additionalInfo.find(
      (info) => info.key === key,
    )

    const changedInfo = productData.additionalInfo.map((info) => {
      if (info.key === key) {
        return {
          ...info,
          value,
        }
      }

      return info
    })

    if (!chosenInfo) {
      changedInfo.push({ value, title, key })
    }

    setProductData({
      ...productData,
      additionalInfo: changedInfo,
    })
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
        setProductData({ ...data.data, category: data.data.category.title })
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (productData.category) {
      const category = categories.find(
        (category) => category.title === productData.category,
      )

      if (category) {
        setAdditionalFields(category.fields)
      }
    }
  }, [productData.category])

  useEffect(() => {
    getProduct()
  }, [id])

  return (
    <Box className={styles.newProductPage}>
      <Box className={styles.categoryContainer}>
        <CategorySelect
          category={productData.category}
          onChange={(category) => handleChange(ProductKeys.CATEGORY, category)}
        />
      </Box>
      <Box className={styles.productData}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <SectionHeader title="Բնութագրերը" />
            <TextField
              value={productData.title}
              label="Անվանումը"
              onChange={(evt) =>
                handleChange(ProductKeys.TITLE, evt.target.value)
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
            {additionalFields.map(({ key, title }) => (
              <TextField
                label={title}
                key={title}
                onChange={(evt) =>
                  handleChangeInfo(key, title, evt.target.value)
                }
              />
            ))}
            <TextField
              value={productData.country}
              onChange={(evt) =>
                handleChange(ProductKeys.COUNTRY, evt.target.value)
              }
            />
            <TextField
              label="Նշումներ"
              multiline
              value={productData.notes}
              onChange={(evt) =>
                handleChange(ProductKeys.NOTES, evt.target.value)
              }
            />
            <SectionHeader title="Գույները" />
            <ColorSelect
              color={productData.color || ''}
              onChange={(colors) => handleChange(ProductKeys.COLOR, colors)}
            />
            <NewProductSizes
              sizes={productData.sizes}
              handleSizeChange={handleSizeChange}
              addSize={addSize}
            />
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
