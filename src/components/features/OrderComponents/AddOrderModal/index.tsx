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
import {
  IOrder,
  OrderTableKeysType,
  PaymentMethods,
  orderProductType,
} from 'types/order.types'
import {
  CreateOrderKeys,
  OrderTableColumns,
  paymentMethods,
} from '@utils/order/constants'

import styles from './styles.module.scss'
import { OrderProductSearch } from '@shared/OrderProductSearch'

interface IProps {
  open: boolean
  onClose: () => void
}

const OrderAddModal: FC<IProps> = ({ open, onClose }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [selectedTitles, setSelectedTitles] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<
    Array<orderProductType & { isLoading?: boolean }>
  >([])
  const [orderData, setOrderData] = useState<{
    [key: string]: string | number | boolean
  } | null>({ paymentMethod: PaymentMethods.CASH })

  const { orders, filters, setFilters } = useContext(OrdersContext)
  const { showToast } = useToast()

  const handleChange = (key: OrderTableKeysType, value: string | boolean) => {
    setOrderData({ ...orderData, [key]: value })
  }

  const handleProducts = (values: orderProductType | orderProductType[]) => {
    setSelectedProducts(
      (values as orderProductType[]).map((orderProduct) => ({
        ...orderProduct,
        isLoading: true,
      })),
    )
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

  const handleAdd = async () => {
    const productIDs = selectedProducts.map(({ product, quantity, size }) => ({
      id: product.id,
      quantity,
      size,
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
      setOrderData({})
      setSelectedProducts([])
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

  useEffect(() => {
    if (!open) {
      setFilters({})
      setOrderData({})
      setSelectedProducts([])
    }
  }, [open])

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
                            !orderData?.isSpecial,
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
                      evt.target.value as string,
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
            <OrderProductSearch
              orderProducts={selectedProducts as unknown as orderProductType[]}
              onChange={handleProducts}
              multiple
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
                          handleSizeChange(
                            evt.target.value as string,
                            index,
                            product.id,
                          )
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

export default OrderAddModal
