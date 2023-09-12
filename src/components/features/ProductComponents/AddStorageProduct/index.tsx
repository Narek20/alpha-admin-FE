import { FC, useState, useEffect, useContext } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Loading from '@shared/Loading'
import { useToast } from 'contexts/toast.context'
import useOnEnter from '@utils/hooks/useOnEnter'
import { OrdersContext } from 'contexts/order.context'
import { StorageContext } from 'contexts/storage.context'
import { IStorageImport, StorageKeys } from 'types/storage.types'
import { orderProductType } from 'types/order.types'
import { createStorageImports } from 'services/storage.service'
import { OrderProductSearch } from '@shared/OrderProductSearch'
import { ProductsContext } from 'contexts/products.context'

import styles from './styles.module.scss'

interface IProps {
  onClose: () => void
}

const AddStorageProduct: FC<IProps> = ({ onClose }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<
    (orderProductType & { isLoading?: boolean })[]
  >([])
  const [storageData, setStorageData] = useState<{
    [key: string]: string | number | boolean
  } | null>(null)

  const { storages } = useContext(StorageContext)
  const { products, setProducts } = useContext(ProductsContext)
  const { setOrders, orders, filters } = useContext(OrdersContext)
  const { showToast } = useToast()

  const handleChange = (key: StorageKeys, value: string | boolean) => {
    setStorageData({ ...storageData, [key]: value })
  }

  const handleAdd = async () => {
    const productIDs = selectedProducts.map(({ product, quantity, size }) => ({
      id: product.id,
      quantity,
      size,
    }))

    if (isCreating) return

    setIsCreating(true)

    const data = await createStorageImports({
      ...storageData,
      productIDs,
    } as IStorageImport)

    if (data.success) {
      const limit = filters.take ? +filters.take : 10
      if (orders.length > limit) {
        orders.pop()
      }

      setProducts(
        products.map((product) => {
          const productId = productIDs.find(({ id }) => id === product.id)
          if (productId) {
            return {
              ...product,
              sizes: product.sizes?.map(({ size, smSize, quantity }) =>
                size === productId.size
                  ? {
                      size,
                      smSize,
                      quantity: quantity
                        ? productId.quantity + quantity
                        : productId.quantity,
                    }
                  : { size, smSize, quantity },
              ),
            }
          }

          return product
        }),
      )

      setOrders([data.data, ...orders])
      showToast('success', data.message)
      onClose()
    } else {
      showToast('error', data.message)
    }
    setIsCreating(false)
  }

  const handleImageLoad = (id: number) => {
    setSelectedProducts((prev) =>
      prev.map((orderProduct) =>
        id === orderProduct.product.id
          ? {
              ...orderProduct,
              isLoading: false,
            }
          : orderProduct,
      ),
    )
  }

  const handleSizeChange = (value: string, index: number, id: number) => {
    setSelectedProducts(
      selectedProducts.map((product, ind) => {
        if (
          ind === index &&
          !selectedProducts.some(
            ({ size, product }) => product.id === id && size === value,
          )
        ) {
          return {
            ...product,
            size: value,
          }
        }

        return product
      }),
    )
  }

  const addQty = (index: number) => {
    setSelectedProducts(
      selectedProducts.map((product, ind) => {
        if (ind === index) {
          return {
            ...product,
            quantity: product.quantity + 1,
          }
        }

        return product
      }),
    )
  }

  const subQty = (index: number) => {
    setSelectedProducts(
      selectedProducts.map((product, ind) => {
        if (ind === index && product.quantity > 1) {
          return {
            ...product,
            quantity: product.quantity - 1,
          }
        }

        return product
      }),
    )
  }

  const removeImage = (index: number) => {
    setSelectedProducts((prev) => prev.filter((_, ind) => ind !== index))
  }

  useOnEnter(handleAdd)

  useEffect(() => {
    selectedProducts.forEach(({ product }) => {
      const image = new Image()
      image.src = product.images[0]
      let listener = () => {
        handleImageLoad(product.id)
        image.removeEventListener('load', listener)
      }

      if (image.complete) {
        handleImageLoad(product.id)
      } else {
        image.addEventListener('load', listener)
      }
    })
  }, [selectedProducts.length])

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box>
          <Box className={styles.header}>
            <Typography className={styles.title}>Ապրանքի ընդունում</Typography>
            <IconButton onClick={onClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Box className={styles.content}>
            <Autocomplete
              className={styles.input}
              options={storages.map(({ title }) => title)}
              value={
                storageData &&
                typeof storageData[StorageKeys.TITLE] === 'string'
                  ? (storageData[StorageKeys.TITLE] as string)
                  : storages[0]?.title || ''
              }
              onChange={(_, value) =>
                handleChange(StorageKeys.TITLE, value || '')
              }
              freeSolo
              renderInput={(params) => (
                <TextField
                  label="Պահեստ"
                  {...params}
                  onChange={(evt) =>
                    handleChange(StorageKeys.TITLE, evt.target.value)
                  }
                />
              )}
            />
            <TextField
              label="Ներկման օրը"
              type="date"
              InputLabelProps={{ shrink: true }}
              className={styles.input}
              onChange={(evt) =>
                handleChange(StorageKeys.IMPORT_DATE, evt.target.value)
              }
            />
            <OrderProductSearch
              orderProducts={selectedProducts}
              setOrderProducts={setSelectedProducts}
              multiple
              onChange={(values) =>
                setSelectedProducts(
                  (values as orderProductType[]).map((value) => ({
                    ...value,
                    isLoading: true,
                  })),
                )
              }
            />
          </Box>
          <Box className={styles.products}>
            {selectedProducts.map(
              ({ product, isLoading, size, quantity }, index) => (
                <Box key={product.title + index} className={styles.product}>
                  <Box>
                    <Box className={styles.imgContainer}>
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <img
                          className={styles.productImg}
                          src={product.images[0]}
                          alt="Նկար"
                        />
                      )}

                      <IconButton
                        className={styles.removeBtn}
                        onClick={() => removeImage(index)}
                      >
                        <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </Box>
                    <FormControl>
                      <Select
                        className={styles.select}
                        value={size}
                        onChange={(evt) =>
                          handleSizeChange(evt.target.value, index, product.id)
                        }
                      >
                        {product.sizes?.map(({ size }) => (
                          <MenuItem key={size} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box className={styles.actions}>
                    <IconButton
                      className={styles.plusBtn}
                      onClick={() => addQty(index)}
                    >
                      <AddIcon sx={{ color: 'green' }} />
                    </IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton
                      className={styles.minusBtn}
                      onClick={() => subQty(index)}
                    >
                      <RemoveIcon sx={{ color: 'red' }} />
                    </IconButton>
                  </Box>
                </Box>
              ),
            )}
          </Box>
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

export default AddStorageProduct
