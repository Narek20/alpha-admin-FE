import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Typography, Button, IconButton } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
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
import { getFromData } from '@utils/product/formData'
import { createProduct } from 'services/products.service'
import { ProductsContext } from 'contexts/products.context'
import { ICreateProduct, ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

const NewProductData = () => {
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<
    | { color: string; images: File[]; sizes: string[]; smSizes: string[] }
    | undefined
  >(undefined)
  const [colorProducts, setColorProducts] = useState<
    { color: string; images: File[]; sizes: string[]; smSizes: string[] }[]
  >([])
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

  const navigate = useNavigate()
  const { getProducts } = useContext(ProductsContext)

  const handleChange = (
    key: ProductKeys,
    value: string | string[] | number
  ) => {
    if (key === ProductKeys.COLOR && Array.isArray(value)) {
      if (value.length > colorProducts.length) {
        setColorProducts([
          ...colorProducts,
          {
            color: value[value.length - 1],
            sizes: [''],
            smSizes: [''],
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
          })
        )
      }

      if (!selectedColor) {
        setSelectedColor(value[0])
      }
    } else {
      setProductData({ ...productData, [key]: value })
    }
  }

  const handleRemove = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: string
  ) => {
    evt.stopPropagation()
    evt.preventDefault()

    setColorProducts(
      colorProducts.filter((colorProduct) => colorProduct.color !== color)
    )
    setSelectedColor(colorProducts[0].color || '')
  }

  const handleSizeChange = (
    color: string,
    sizes: string[],
    smSizes: string[]
  ) => {
    setColorProducts(
      colorProducts.map((colorProduct) => {
        if (colorProduct.color === color) {
          return {
            ...colorProduct,
            sizes,
            smSizes,
          }
        }

        return colorProduct
      })
    )
  }

  const addSize = (color: string) => {
    setColorProducts(
      colorProducts.map((colorProduct) => {
        if (color === colorProduct.color) {
          return {
            ...colorProduct,
            sizes: [...colorProduct.sizes, ''],
            smSizes: [...colorProduct.smSizes, ''],
          }
        }

        return colorProduct
      })
    )
  }

  const handleChangeImages = (color: string, images: File[]) => {
    setColorProducts(
      colorProducts.map((colorProduct) => {
        if (colorProduct.color === color) {
          return {
            ...colorProduct,
            images,
          }
        }

        return colorProduct
      })
    )
  }

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCreate = async () => {
    colorProducts.forEach(async (colorProduct, index) => {
      const formData = getFromData(colorProduct, productData)

      const data = await createProduct(formData)

      if (data.success && index === colorProducts.length - 1) {
        getProducts()
        navigate('/products')
      }
    })
  }

  useEffect(() => {
    if (selectedColor && colorProducts) {
      setSelectedProduct(
        colorProducts.find((product) => product.color === selectedColor)
      )
    }
  }, [selectedColor, colorProducts])

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
        <Button className={styles.addBtn} onClick={handleCreate}>
          Ստեղծել
        </Button>
      </Box>
      <Box className={styles.productData}>
        <Box id="info"></Box>
        <SectionHeader title="Բնութագրերը" />
        <TextField
          label="Անվանումը"
          onChange={(evt) => handleChange(ProductKeys.TITLE, evt.target.value)}
        />
        <CategorySelect
          category={productData.category}
          onChange={(category) => handleChange(ProductKeys.CATEGORY, category)}
        />
        <Box className={styles.prices}>
          <TextField
            className={styles.purchase}
            label="Առք"
            onChange={(evt) =>
              handleChange(ProductKeys.PURCHASE_PRICE, +evt.target.value)
            }
          />
          <TextField
            className={styles.price}
            label="Վաճառք"
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
          label="Քաշը"
          value={productData.weight}
          onChange={(evt) => handleChange(ProductKeys.WEIGHT, evt.target.value)}
        />
        <TextField
          label="Կոշիկի բարձրությունը"
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
                <CloseOutlinedIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Box id="sizes"></Box>
        {selectedColor && selectedProduct && (
          <>
            <NewProductSizes
              color={selectedColor}
              sizes={selectedProduct.sizes}
              handleSizeChange={handleSizeChange}
              smSizes={selectedProduct.smSizes}
              addSize={addSize}
            />
            <Box id="images"></Box>
            <NewProductImages
              images={selectedProduct.images}
              color={selectedColor}
              changeImages={handleChangeImages}
            />
          </>
        )}
        <Button className={styles.addBtn} onClick={handleCreate}>
          Ստեղծել
        </Button>
      </Box>
    </Box>
  )
}

export default NewProductData
