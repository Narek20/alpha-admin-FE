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

const min = 0
const max = 1000000

const NewProductData = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<
    { color: string; images: File[]; sizes: Sizes[] } | undefined
  >(undefined)
  const [colorProducts, setColorProducts] = useState<
    { color: string; images: File[]; sizes: Sizes[] }[]
  >([])
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

  const navigate = useNavigate()
  const { getProducts } = useContext(ProductsContext)
  const { categories } = useContext(CategoriesContext)
  const { showToast } = useToast()

  const handleChange = (
    key: ProductKeys,
    value: string | string[] | number,
  ) => {
    if (key === ProductKeys.COLOR && Array.isArray(value)) {
      if (value.length > colorProducts.length) {
        setColorProducts([
          ...colorProducts,
          {
            color: value[value.length - 1],
            sizes: [],
            images: [],
          },
        ])
      } else {
        setColorProducts(
          colorProducts.filter((colorProduct) => {
            if (!value.find((color) => color === colorProduct.color)) {
              return false
            }

            return true
          }),
        )
      }

      if (!selectedColor) {
        setSelectedColor(value[0])
      }
    } else {
      let changedValue = value

      if (key === ProductKeys.PRICE || key === ProductKeys.PURCHASE_PRICE) {
        if (+changedValue > max) changedValue = max
        if (+changedValue < min) changedValue = min
      }

      setProductData({ ...productData, [key]: value })
    }
  }

  const handleAddInfo = (key: string, title: string, value: string) => {
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

  const handleRemove = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: string,
  ) => {
    evt.stopPropagation()
    evt.preventDefault()

    setColorProducts(
      colorProducts.filter((colorProduct) => colorProduct.color !== color),
    )
    setSelectedColor(colorProducts[0].color || '')
  }

  const handleSizeChange = (sizes: Sizes[], color?: string) => {
    setColorProducts(
      colorProducts.map((colorProduct) => {
        if (colorProduct.color === color) {
          return {
            ...colorProduct,
            sizes,
          }
        }

        return colorProduct
      }),
    )
  }

  const addSize = (color?: string) => {
    setColorProducts(
      colorProducts.map((colorProduct) => {
        if (color === colorProduct.color) {
          return {
            ...colorProduct,
            sizes: [...colorProduct.sizes, { size: '' }],
          }
        }

        return colorProduct
      }),
    )
  }

  const handleChangeImages = (images: File[], color?: string) => {
    if (selectedColor) {
      setColorProducts(
        colorProducts.map((colorProduct) => {
          if (colorProduct.color === color) {
            return {
              ...colorProduct,
              images,
            }
          }

          return colorProduct
        }),
      )
    } else {
      setProductData({ ...productData, images: images })
    }
  }

  const handleCreate = async () => {
    setIsCreating(true)
    if (colorProducts.length) {
      colorProducts.forEach(async (colorProduct, index) => {
        const formData = getFormData(productData, colorProduct)

        const data = await createProduct(formData)

        if (data.success) {
          if (index === colorProducts.length - 1) {
            setIsCreating(false)
            getProducts()
            navigate('/products')
          }
        } else {
          setIsCreating(false)
          showToast('error', data.message)
        }
      })
    } else {
      const formData = getFormData(productData)

      const data = await createProduct(formData)

      if (data.success) {
        setIsCreating(false)
        showToast('success', data.message)
        getProducts()
        navigate('/products')
      } else {
        setIsCreating(false)
        showToast('error', data.message)
      }
    }
  }

  useEffect(() => {
    if (productData.category) {
      const category = categories.find(
        (category) => category.title === productData.category,
      )

      if (category) setAdditionalFields(category.fields)
    }
  }, [productData.category])

  useEffect(() => {
    if (selectedColor && colorProducts) {
      setSelectedProduct(
        colorProducts.find((product) => product.color === selectedColor),
      )
    }
  }, [selectedColor, colorProducts])

  return (
    <Box className={styles.newProductPage}>
      <Box className={styles.categoryContainer}>
        <CategorySelect
          category={productData.category}
          onChange={(category) => handleChange(ProductKeys.CATEGORY, category)}
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
              label="Առք"
              value={productData.purchasePrice}
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
              value={productData.price}
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
          {additionalFields.map(({ key, title }) => (
            <TextField
              label={title}
              key={title}
              onChange={(evt) => handleAddInfo(key, title, evt.target.value)}
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
            onChange={(evt) =>
              handleChange(ProductKeys.NOTES, evt.target.value)
            }
          />
          <SectionHeader title="Գույները" />
          <ColorSelect
            multiple={true}
            color={colorProducts.map(({ color }) => color || '')}
            onChange={(colors) => handleChange(ProductKeys.COLOR, colors)}
          />
          <Box className={styles.colors}>
            {colorProducts.map(({ color }) => (
              <Box
                key={color}
                className={
                  selectedColor === color
                    ? styles.selectedColorContainer
                    : styles.colorContainer
                }
                onClick={() => setSelectedColor(color || '')}
              >
                <Typography className={styles.color}>{color}</Typography>
                <IconButton
                  className={styles.removeBtn}
                  onClick={(evt) => handleRemove(evt, color || '')}
                >
                  <CloseOutlinedIcon
                    sx={{ width: 20, height: 20, color: 'red' }}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
          {selectedColor && selectedProduct && (
            <NewProductSizes
              color={selectedColor}
              sizes={selectedProduct.sizes}
              handleSizeChange={handleSizeChange}
              addSize={addSize}
            />
          )}
          <NewProductImages
            images={
              selectedProduct ? selectedProduct.images : productData.images
            }
            color={selectedColor}
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
