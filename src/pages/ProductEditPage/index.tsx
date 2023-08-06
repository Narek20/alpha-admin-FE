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
import { ProductsContext } from 'contexts/products.context'
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
    { title: string; value?: string }[]
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
  const { getProducts } = useContext(ProductsContext)

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

  const handleChangeInfo = (title: string, value: string) => {
    const chosenInfo = productData.additionalInfo.find(
      (info) => info.title === title,
    )

    const changedProductInfo = productData.additionalInfo.map((info) => {
      if (info.title === title) {
        return {
          ...info,
          value,
        }
      }

      return info
    })

    const changedInfo = additionalFields.map((info) => {
      if (info.title === title) {
        return {
          ...info,
          value,
        }
      }

      return info
    })

    setAdditionalFields(changedInfo)

    if (!chosenInfo) {
      changedProductInfo.push({ value, title })
    }

    setProductData({
      ...productData,
      additionalInfo: changedProductInfo,
    })
  }

  const handleEdit = async () => {
    const formData = getFormData(productData)
    const data = await updateProduct(formData, +id)

    if (data.success) {
      showToast('success', data.message)
      getProducts()
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
    getProduct()
  }, [id])

  useEffect(() => {
    if (productData.category) {
      const category = categories.find(
        (category) => category.title === productData.category,
      )

      const fields = category?.fields.map(({ title }) => {
        const additionalInfo = productData.additionalInfo.find(
          (info) => info.title === title,
        )

        if (additionalInfo) {
          return {
            title,
            value: additionalInfo.value,
          }
        }

        return {
          title,
        }
      })

      if (category && fields) setAdditionalFields(fields)
    }
  }, [productData.category])

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
            {additionalFields.map(({ title, value }) => (
              <TextField
                label={title}
                value={value}
                key={title}
                onChange={(evt) => handleChangeInfo(title, evt.target.value)}
              />
            ))}
            <TextField
              label="Արտադրված է"
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
