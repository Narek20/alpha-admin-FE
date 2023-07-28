import { FC, useState, useEffect, useContext } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Modal,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Loading from '@shared/Loading'
import DriverSelect from '@shared/DriverSelect'
import { useToast } from 'contexts/toast.context'
import { OrdersContext } from 'contexts/order.context'
import { placeOrder } from 'services/orders.service'
import { getAllProducts } from 'services/products.service'
import { IProduct } from 'types/product.types'
import { IOrder, OrderTableKeysType, PaymentMethods } from 'types/order.types'
import {
  CreateOrderKeys,
  OrderTableColumns,
  paymentMethods,
} from '@utils/order/constants'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const OrderAddModal: FC<IProps> = ({ open, onClose }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTitles, setSelectedTitles] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<
    Array<IProduct & { quantity: number; size?: string; isLoading?: boolean }>
  >([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [orderData, setOrderData] = useState<{
    [key: string]: string | number | boolean
  } | null>(null)

  const { orders, filters, setFilters } = useContext(OrdersContext)
  const { showToast } = useToast()

  const handleChange = (key: OrderTableKeysType, value: string | boolean) => {
    setOrderData({ ...orderData, [key]: value })
  }

  const handleProducts = (values: string[]) => {
    if (values.length > selectedProducts.length) {
      const product = products.find(
        (product) => product.title === values[values.length - 1]
      )

      if (product) {
        setSelectedTitles([...selectedTitles, product.title])
        setSelectedProducts([
          ...selectedProducts,
          { ...product, quantity: 1, isLoading: true },
        ])
      }
    } else {
      setSelectedTitles(
        selectedTitles.filter((title) =>
          values.find((value) => value === title)
        )
      )
      setSelectedProducts(
        selectedProducts.filter((product) =>
          values.find((value) => value == product.title)
        )
      )
    }
  }

  const searchProducts = async (searchKey: string) => {
    const data = await getAllProducts({ title: searchKey, take: '10' })

    if (data.success) {
      setProducts(data.data)
    }
  }

  const removeImage = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, ind) => ind !== index))
    setSelectedTitles(selectedTitles.filter((_, ind) => ind !== index))
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
      })
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
      })
    )
  }

  const handleSizeChange = (value: string, index: number) => {
    setSelectedProducts(
      selectedProducts.map((product, ind) => {
        if (ind === index) {
          return {
            ...product,
            size: value,
          }
        }

        return product
      })
    )
  }

  const handleAdd = async () => {
    const productIDs = selectedProducts.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    if (isCreating) return

    setIsCreating(true)

    const data = await placeOrder({ ...orderData, productIDs } as IOrder)

    if (data.success) {
      const limit = filters.take ? +filters.take : 10
      if (orders.length > limit) {
        orders.pop()
      }

      setFilters({})
      showToast('success', data.message)
      setOrderData({}),
      setProducts([])
      onClose()
    } else {
      showToast('error', data.message)
    }
    setIsCreating(false)
  }

  const handleImageLoad = () => {
    setSelectedProducts(
      selectedProducts.map((product, index) => {
        if (index === selectedProducts.length - 1) {
          return {
            ...product,
            isLoading: false,
          }
        }

        return product
      })
    )
  }

  useEffect(() => {
    const image = new Image()
    image.src = selectedProducts[selectedProducts.length - 1]?.images[0]
    image.addEventListener('load', handleImageLoad)
    return () => {
      image.removeEventListener('load', handleImageLoad)
    }
  }, [selectedProducts.length])

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box>
          <Box className={styles.header}>
            <Typography className={styles.title}>Ավելացնել պատվեր</Typography>
            <IconButton onClick={onClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Box className={styles.content}>
            {CreateOrderKeys.map((key, index) => (
              <TextField
                key={key}
                label={OrderTableColumns[index + 1]}
                className={styles.input}
                value={orderData?.[key]}
                onChange={(evt) => handleChange(key, evt.target.value)}
              />
            ))}
            <TextField
              label="Նշումներ"
              multiline
              className={styles.input}
              onChange={(evt) =>
                handleChange(OrderTableKeysType.NOTES, evt.target.value)
              }
            />
            <TextField
              label="Առաքման օրը"
              type="date"
              InputLabelProps={{ shrink: true }}
              className={styles.input}
              onChange={(evt) =>
                handleChange(OrderTableKeysType.DELIVERY_DATE, evt.target.value)
              }
            />
            <Box className={styles.flex}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        checked={!!orderData?.isSpecial}
                        onClick={() =>
                          handleChange(
                            OrderTableKeysType.IS_SPECIAL,
                            !orderData?.isSpecial
                          )
                        }
                      />
                    }
                    label="Հատուկ պատվեր"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <Select
                  defaultValue={PaymentMethods.CASH}
                  onChange={(evt) =>
                    handleChange(
                      OrderTableKeysType.PAYMENT_METHOD,
                      evt.target.value as string
                    )
                  }
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <DriverSelect
              driver={orderData?.driver as string}
              onChange={(driver: string) =>
                handleChange(OrderTableKeysType.DRIVER, driver)
              }
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              className={styles.search}
              options={products.map((product) => product.title)}
              onChange={(_, values) => handleProducts(values)}
              value={selectedTitles}
              multiple
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ապրանքի Որոնում"
                  onChange={(evt) => searchProducts(evt.target.value)}
                />
              )}
            />
          </Box>
          <Box className={styles.products}>
            {selectedProducts.map((product, index) => (
              <Box key={product.title + index} className={styles.product}>
                <Box>
                  <Box className={styles.imgContainer}>
                    {product.isLoading ? (
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
                      value={product.size}
                      onChange={(evt) =>
                        handleSizeChange(evt.target.value as string, index)
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
                  <Typography>{product.quantity}</Typography>
                  <IconButton
                    className={styles.minusBtn}
                    onClick={() => subQty(index)}
                  >
                    <RemoveIcon sx={{ color: 'red' }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
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

export default OrderAddModal
