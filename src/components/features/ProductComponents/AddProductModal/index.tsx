import { ChangeEvent, FC, useContext, useState } from 'react'
import { Box, IconButton, Button, Modal, TextField } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import SizeSelect from '@shared/SizeSelect'
import BrandSelect from '@shared/BrandSelect'
import SectionHeader from '@shared/SectionTitle'
import CategorySelect from '@shared/CategorySelect'
import { getFromData } from '@utils/product/formData'
import { createProduct } from 'services/products.service'
import { ProductsContext } from 'contexts/products.context'
import { ICreateProduct, ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const ProductAddModal: FC<IProps> = ({ open, onClose }) => {
  const [images, setImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [productData, setProductData] = useState<ICreateProduct>({
    title: '',
    category: '',
    brand: '',
    color: '',
    sizes: [],
    price: 0,
  })

  const { getProducts } = useContext(ProductsContext)

  const handleChange = (
    key: ProductKeys,
    value: string | string[] | number
  ) => {
    setProductData({ ...productData, [key]: value })
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()

      setImageFiles([...imageFiles, event.target.files[0]])

      reader.onloadend = () => {
        setImages([...images, reader.result as string])
      }

      reader.readAsDataURL(event.target.files[0])
    }
  }

  const handleRemove = (index: number) => {
    if (images.length) {
      setImages(images?.filter((_, i: number) => i !== index))
      setImageFiles(imageFiles?.filter((_, i: number) => i !== index))
    }
  }

  const handleAdd = async () => {
    const formData = getFromData(imageFiles, productData)
    const data = await createProduct(formData)

    if (data.success) {
      getProducts()
      onClose()
    }
  }

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.header}>
          <SectionHeader title="Ավելացնել Ապրանք" />
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <form encType="multipart/form-data">
          <Box className={styles.content}>
            <TextField
              label={'Անվանումը'}
              className={styles.input}
              value={productData.title}
              onChange={(evt) =>
                handleChange(ProductKeys.TITLE, evt.target.value)
              }
            />
            <CategorySelect
              category={productData.category}
              onChange={(category: string) =>
                handleChange(ProductKeys.CATEGORY, category)
              }
            />
            <BrandSelect
              brand={productData.brand}
              onChange={(brand: string) =>
                handleChange(ProductKeys.BRAND, brand)
              }
            />
            <SizeSelect
              size={productData.sizes}
              onChange={(sizes: string[] | string) =>
                handleChange(ProductKeys.SIZES, sizes)
              }
            />
            <TextField
              label={'Գինը'}
              type="number"
              className={styles.input}
              value={productData.price}
              onChange={(evt) =>
                handleChange(ProductKeys.PRICE, +evt.target.value)
              }
            />
            <TextField
              label={'Գույնը'}
              className={styles.input}
              value={productData.color}
              onChange={(evt) =>
                handleChange(ProductKeys.COLOR, evt.target.value)
              }
            />
            <input type="file" onChange={handleImage} />
          </Box>
        </form>
        <Box className={styles.images}>
          {images?.map((image, index) => (
            <Box key={image + index} className={styles.imageContainer}>
              <img className={styles.img} src={image} alt={image + index} />
              <IconButton onClick={() => handleRemove(index)}>
                <CloseOutlinedIcon sx={{ color: 'red' }} />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Box className={styles.actions}>
          <Button
            className={styles.addBtn}
            color={'success'}
            onClick={handleAdd}
          >
            Ավելացնել
          </Button>
          <Button
            className={styles.cancelBtn}
            color="inherit"
            onClick={onClose}
          >
            Չեղարկել
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductAddModal
