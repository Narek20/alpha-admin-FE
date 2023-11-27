import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Typography, Button, IconButton } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import Loading from '@shared/Loading'
import BrandSelect from '@shared/BrandSelect'
import ColorSelect from '@shared/ColorSelect'
import SectionHeader from '@shared/SectionTitle'
import CountrySelect from '@shared/CountrySelect'
import CategorySelect from '@shared/CategorySelect'
import NewProductSizes from '@features/ProductComponents/ProductSizes'
import NewProductImages from '@features/ProductComponents/ProductImages'
import { getFormData } from '@utils/product/formData'
import { createProduct } from 'services/products.service'
import { useToast } from 'contexts/toast.context'
import { ProductsContext } from 'contexts/products.context'
import { CategoriesContext } from 'contexts/category.context'
import { ICreateProduct, ProductKeys, Sizes } from 'types/product.types'

import styles from './styles.module.scss'
import useOnEnter from '@utils/hooks/useOnEnter'

const min = 0
const max = 1000000

const NewProductData = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [additionalFields, setAdditionalFields] = useState<{ title: string }[]>(
    [],
  )
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

  const navigate = useNavigate()
  const { getProducts } = useContext(ProductsContext)
  const { categories } = useContext(CategoriesContext)
  const { showToast } = useToast()

  const handleChange = (
    key: ProductKeys,
    value: string | string[] | number,
  ) => {
    let changedValue = value

    if (key === ProductKeys.PRICE || key === ProductKeys.PURCHASE_PRICE) {
      if (+changedValue > max) changedValue = max
      if (+changedValue < min) changedValue = min
    }

    setProductData({ ...productData, [key]: value })
  }

  const handleAddInfo = (title: string, value: string) => {
    const chosenInfo = productData.additionalInfo.find(
      (info) => info.title === title,
    )

    const changedInfo = productData.additionalInfo.map((info) => {
      if (info.title === title) {
        return {
          ...info,
          value,
        }
      }

      return info
    })

    if (!chosenInfo) {
      changedInfo.push({ value, title })
    }

    setProductData({
      ...productData,
      additionalInfo: changedInfo,
    })
  }

  const handleSizeChange = (sizes: Sizes[]) => {
    setProductData({ ...productData, sizes })
  }

  const handleChangeImages = (images: File[]) => {
    setProductData({ ...productData, images: images })
  }

  const handleCreate = async () => {
    setIsCreating(true)
    const formData = getFormData(productData)

    const data = await createProduct(formData)

    if (data.success) {
      showToast('success', data.message)
      getProducts()
      navigate('/products')
    } else {
      showToast('error', data.message)
    }
    setIsCreating(false)
  }

  useOnEnter(() => !isCreating && handleCreate())

  useEffect(() => {
    if (productData.category) {
      const category = categories.find(
        (category) => category.title === productData.category,
      )

      if (category) setAdditionalFields(category.fields)
    }
  }, [productData.category])

  return (
    <Box className={styles.newProductPage}>
      <Box className={styles.categoryContainer}>
        <CategorySelect
          category={productData.category}
          onCategoryChange={(category) =>
            handleChange(ProductKeys.CATEGORY, category)
          }
        />
      </Box>
      {productData.category && (
        <Box className={styles.productData}>
          <SectionHeader title="Բնութագրերը" />
          <TextField
            label="Անվանումը"
            onChange={(evt) =>
              handleChange(ProductKeys.TITLE, evt.target.value)
            }
          />
          <Box className={styles.prices}>
            <TextField
              className={styles.purchase}
              value={productData.purchasePrice || undefined}
              label="Առք"
              type="number"
              InputProps={{
                inputProps: {
                  max: 1000000,
                  min: 0,
                },
              }}
              onChange={(evt) =>
                handleChange(ProductKeys.PURCHASE_PRICE, +evt.target.value)
              }
            />
            <TextField
              className={styles.price}
              value={productData.price || undefined}
              label="Վաճառք"
              type="number"
              InputProps={{
                inputProps: {
                  max: 1000000,
                  min: 0,
                },
              }}
              onChange={(evt) =>
                handleChange(ProductKeys.PRICE, +evt.target.value)
              }
            />
          </Box>
          <BrandSelect
            brand={productData.brand}
            onChange={(brand) => handleChange(ProductKeys.BRAND, brand)}
          />
          {additionalFields.map(({ title }) => (
            <TextField
              label={title}
              key={title}
              onChange={(evt) => handleAddInfo(title, evt.target.value)}
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
            onChange={(evt) =>
              handleChange(ProductKeys.NOTES, evt.target.value)
            }
          />
          <NewProductSizes
            sizes={productData.sizes}
            handleSizeChange={handleSizeChange}
          />
          <NewProductImages
            images={productData.images}
            changeImages={handleChangeImages}
          />
          <Button
            className={styles.addBtn}
            onClick={!isCreating ? handleCreate : undefined}
          >
            {isCreating ? <Loading /> : 'Ստեղծել'}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default NewProductData
