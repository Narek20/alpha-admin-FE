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
import { OrderProductSearch } from '@shared/OrderProductSearch'
import { useToast } from 'contexts/toast.context'
import useOnEnter from '@utils/hooks/useOnEnter'
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
import { getAddress, updateCustomer } from 'services/customer.service'
import { ICustomer } from 'types/customer.types'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const OrderAddModal: FC<IProps> = ({ open, onClose }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cashbackMoneyUse, setCashbackMoneyUse] = useState(false)
  const [customerData, setCustomerData] = useState<ICustomer | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<
    Array<orderProductType & { isLoading?: boolean }>
  >([])
  const [orderData, setOrderData] = useState<{
    [key: string]: string | number | boolean
  } | null>({ paymentMethod: PaymentMethods.CASH })

  const { orders, filters, setFilters, getCounts, getOrders } =
    useContext(OrdersContext)
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
    setSelectedProducts((prev) => prev.filter((_, ind) => ind !== index))
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
    if (!open) {
      return
    }
    const productIDs = selectedProducts.map(({ product, quantity, size }) => ({
      id: product.id,
      quantity,
      size,
    }))

    if (isCreating) return

    setIsCreating(true)
    if (customerData) await updateCustomer(customerData)

    const data = await placeOrder({ ...orderData, productIDs } as IOrder)

    if (data.success) {
      const limit = filters.take ? +filters.take : 10
      if (orders.length > limit) {
        orders.pop()
      }

      getCounts()
      getOrders()
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

  const onCancel = () => {
    setOrderData({})
    setSelectedProducts([])
    onClose()
  }

  const getCustomerAddress = async (phone: string) => {
    if (phone.length === 9) {
      setIsLoading(true)
      const data = await getAddress(phone)

      if (data.success) {
        setCustomerData(data.data)
        const customerData = {
          fullName: '',
          address: '',
          address2: '',
        }
        if (data.data.address) {
          customerData.address = data.data.address
        }

        if (data.data.address2) {
          customerData.address2 = data.data.address2
        }

        if (data.data.fullName) {
          customerData.fullName = data.data.fullName
        }

        setOrderData({ ...orderData, ...customerData })
      }

      setIsLoading(false)
    }
  }

  useOnEnter(handleAdd)

  useEffect(() => {
    selectedProducts.forEach(({ product }) => {
      const image = new Image()
      image.src = process.env.REACT_APP_BASE_URL + product.images[0]
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
    if (
      orderData &&
      orderData.phone &&
      !orderData.address &&
      !orderData.address2
    ) {
      getCustomerAddress(orderData.phone as string)
    }
  }, [orderData])

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box sx={{ position: 'relative' }}>
          {isLoading && (
            <Box className={styles.loading}>
              <Loading />
            </Box>
          )}
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
                  value={orderData && orderData[key] ? orderData[key] : ''}
                  onChange={(evt) => handleChange(key, evt.target.value)}
                />
              ))}
              <TextField
                label="Նշումներ"
                multiline
                className={styles.input}
                value={orderData?.[OrderTableKeysType.NOTES]}
                onChange={(evt) =>
                  handleChange(OrderTableKeysType.NOTES, evt.target.value)
                }
              />
              <TextField
                label="Առաքման օրը"
                type="date"
                InputLabelProps={{ shrink: true }}
                className={styles.input}
                value={orderData?.[OrderTableKeysType.DELIVERY_DATE]}
                onChange={(evt) =>
                  handleChange(
                    OrderTableKeysType.DELIVERY_DATE,
                    evt.target.value,
                  )
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
                {!!orderData?.isSpecial && (
                  <TextField
                    placeholder="Հատուկ պատվերի արժեքը"
                    onChange={(evt) =>
                      setOrderData({
                        ...orderData,
                        specialPrice: +evt.target.value,
                      })
                    }
                  />
                )}
                <FormControl>
                  <Select
                    defaultValue={PaymentMethods.CASH}
                    value={orderData?.[OrderTableKeysType.PAYMENT_METHOD]}
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
                {customerData && (
                  <>
                    <Box>
                      <Typography>Cashback</Typography>
                      <Typography>{customerData?.cashback}%</Typography>
                    </Box>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="cashback_money"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value={true}
                          control={
                            <Radio
                              checked={!!cashbackMoneyUse}
                              onClick={() =>
                                setCashbackMoneyUse(!cashbackMoneyUse)
                              }
                            />
                          }
                          label="Կուտակված գումար"
                        />
                      </RadioGroup>
                    </FormControl>
                    {cashbackMoneyUse && (
                      <TextField
                        label="Կուտակված գումար"
                        placeholder={customerData.cashback_money}
                        onChange={(evt) =>
                          setOrderData({
                            ...orderData,
                            usedCashback: evt.target.value,
                          })
                        }
                      />
                    )}
                  </>
                )}
              </Box>
              <DriverSelect
                driver={orderData?.driver as string}
                onChange={(driver: string) =>
                  handleChange(OrderTableKeysType.DRIVER, driver)
                }
              />
              <OrderProductSearch
                orderProducts={
                  selectedProducts as unknown as orderProductType[]
                }
                setOrderProducts={setSelectedProducts}
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
                            src={
                              process.env.REACT_APP_BASE_URL + product.images[0]
                            }
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
                          {product.sizes?.map(({ size, quantity }) => (
                            <MenuItem
                              key={size}
                              value={size}
                              sx={
                                !quantity || +quantity <= 0
                                  ? { opacity: 0.5 }
                                  : {}
                              }
                            >
                              {size}
                              {(!quantity || +quantity <= 0) && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: 0,
                                    width: 64,
                                    height: 2,
                                    backgroundColor: 'red',
                                    opacity: 0.4,
                                  }}
                                ></div>
                              )}
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
              onClick={onCancel}
            >
              Չեղարկել
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default OrderAddModal
