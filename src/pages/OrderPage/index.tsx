import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  IconButton,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputBase,
} from '@mui/material'
import Loading from '@shared/Loading'
import ProductTable from '@shared/ProductsTable'
import SectionHeader from '@shared/SectionTitle'
import {
  IOrder,
  OrderStatus,
  PaymentMethods,
  orderProductType,
} from 'types/order.types'
import { IProduct } from 'types/product.types'
import { getOrderById, updateOrder } from 'services/orders.service'
import {
  OrderDetailsKeys,
  OrderStatuses,
  getOrderIcon,
  orderRowColor,
  paymentMethods,
} from '@utils/order/constants'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { OrderProductSearch } from '@shared/OrderProductSearch'
import { useToast } from 'contexts/toast.context'
import { OrdersContext } from 'contexts/order.context'
import { DriversContext } from 'contexts/driver.context'
import { priceFormatter } from '@utils/priceFormatter'

import styles from './styles.module.scss'

const OrderPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [defaultOrder, setDefaultOrder] = useState<IOrder | null>(null)
  const [order, setOrder] = useState<IOrder | null>(null)
  const [originalOrder, setOriginalOrder] = useState<IOrder | null>(null)
  const [commonQtyAndPrice, setCommonQtyAndPrice] = useState({
    qty: 0,
    price: 0,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isAddActive, setIsAddActive] = useState(false)

  const { drivers } = useContext(DriversContext)
  const { getOrders } = useContext(OrdersContext)
  const { showToast } = useToast()

  const { id } = useParams()
  const navigate = useNavigate()

  const getOrder = async () => {
    if (id) {
      setIsLoading(true)
      const data = await getOrderById(id)

      if (data.success) {
        setOrder(data.data)
        setOriginalOrder(data.data)
        setDefaultOrder(data.data)
        setIsLoading(false)
      }
    }
  }

  const editProduct = (index: number, newData: Partial<orderProductType>) => {
    setOrder(
      (prev) =>
        prev && {
          ...prev,
          orderProducts: prev.orderProducts.map(
            ({ quantity, product, size, id }, i) =>
              index === i
                ? {
                    id,
                    quantity: newData.quantity || quantity,
                    size:
                      prev.orderProducts.some(
                        (orderProduct) => orderProduct.size === newData.size,
                      ) || !newData.size
                        ? size
                        : newData.size,
                    product,
                  }
                : { quantity, product, size, id },
          ),
        },
    )
  }

  const editOrder = (newData: Partial<IOrder>) => {
    setOrder(
      (prev) =>
        prev && {
          ...prev,
          ...newData,
        },
    )
  }

  const removeOrderProduct = (index: number) => {
    setOrder(
      (prev) =>
        prev && {
          ...prev,
          orderProducts: prev.orderProducts.filter((_, i) => i !== index),
        },
    )
  }

  const handleFilterSearch = (data: IProduct[]) =>
    data.filter(
      (product: IProduct) =>
        product.sizes?.some(
          (size) =>
            !order?.orderProducts.some(
              (orderProduct) =>
                orderProduct.product.id === product.id &&
                orderProduct.size === size.size,
            ),
          // && size.quantity
        ),
    )

  const handleAddProduct = (
    newOrderProduct: orderProductType | orderProductType[],
  ) => {
    setOrder(
      (prev) =>
        prev && {
          ...prev,
          orderProducts: [
            ...prev.orderProducts,
            newOrderProduct as orderProductType,
          ],
        },
    )
    setIsAddActive(false)
  }

  const acceptEditing = async () => {
    setIsEditing(false)
    if (order && order !== defaultOrder) {
      setIsLoading(true)
      const data = await updateOrder(order)

      if (data.success) {
        setDefaultOrder(data.data)
        setOrder(data.data)
        setIsLoading(false)
        getOrders()
        showToast('success', data.message)
      }
    }
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setOrder(defaultOrder)
  }

  useEffect(() => {
    getOrder()
  }, [id])

  useEffect(() => {
    if (order) {
      const commonQtyAndPrice = order.orderProducts.reduce(
        (acc, product) => ({
          qty: acc.qty + product.quantity,
          price: acc.price + +product.product.price * product.quantity,
        }),
        {
          qty: 0,
          price: 0,
        },
      )

      setCommonQtyAndPrice(commonQtyAndPrice)
    }
  }, [order])

  return (
    <Box className={styles.orderPage}>
      {isLoading || !order || !originalOrder ? (
        <Loading />
      ) : (
        <>
          <Box className={styles.header}>
            <SectionHeader title={`Պատվեր №${order.id}`} />
            <Select
              defaultValue={order.status}
              value={order.status}
              className={styles.status}
              input={<InputBase />}
              disabled={!isEditing}
              onChange={(evt) =>
                editOrder({ status: evt.target.value as OrderStatus })
              }
              style={{ background: orderRowColor(order.status) }}
            >
              {OrderStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            <Select
              defaultValue={order.paymentMethod}
              value={order.paymentMethod}
              className={styles.select}
              disabled={!isEditing}
              onChange={(evt) =>
                editOrder({ paymentMethod: evt.target.value as PaymentMethods })
              }
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  <img
                    style={{ width: 20, height: 20 }}
                    src={getOrderIcon(method)}
                  />
                </MenuItem>
              ))}
            </Select>
            {isEditing ? (
              <Box className={styles.right}>
                <IconButton onClick={acceptEditing}>
                  <CheckCircleOutlineOutlinedIcon sx={{ color: 'green' }} />
                </IconButton>
                <IconButton onClick={cancelEditing}>
                  <CloseOutlinedIcon sx={{ color: 'red' }} />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => setIsEditing(true)}
                className={styles.right}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
            )}
          </Box>
          <Box className={styles.details}>
            {OrderDetailsKeys.map(
              (detailsKey) =>
                originalOrder[detailsKey.key] && (
                  <React.Fragment key={detailsKey.label}>
                    {detailsKey.key === 'driver' && (
                      <Box className={styles.infoContainer}>
                        <Typography className={styles.infoLabel}>
                          {detailsKey.label}
                        </Typography>
                        <Select
                          labelId="driver-label"
                          variant="outlined"
                          defaultValue={order.driver}
                          value={order.driver}
                          className={styles.select}
                          disabled={!isEditing}
                          onChange={(evt) =>
                            editOrder({ driver: evt.target.value })
                          }
                        >
                          {drivers.map(({ fullName, direction }) => (
                            <MenuItem key={fullName} value={fullName}>
                              {`${fullName} ${direction}`}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}
                    {(detailsKey.key === 'deliveryDate' ||
                      detailsKey.key === 'createdAt') && (
                      <Box
                        key={detailsKey.label}
                        className={styles.infoContainer}
                      >
                        <Typography className={styles.infoLabel}>
                          {detailsKey.label}
                        </Typography>
                        <TextField
                          defaultValue={order[detailsKey.key]}
                          size="small"
                          type="date"
                          onChange={(evt) =>
                            editOrder({ [detailsKey.key]: evt.target.value })
                          }
                          className={styles.date}
                          disabled={!isEditing}
                        />
                      </Box>
                    )}
                    {detailsKey.key !== 'driver' &&
                      detailsKey.key !== 'createdAt' &&
                      detailsKey.key !== 'deliveryDate' && (
                        <Box
                          key={detailsKey.label}
                          className={styles.infoContainer}
                          sx={
                            detailsKey.label === 'Հեռախոսահամար' && !isEditing
                              ? { cursor: 'pointer' }
                              : {}
                          }
                          onClick={
                            detailsKey.label === 'Հեռախոսահամար' && !isEditing
                              ? () =>
                                  navigate(
                                    `/customers/${order[detailsKey.key]}`,
                                  )
                              : undefined
                          }
                        >
                          <Typography className={styles.infoLabel}>
                            {detailsKey.label}
                          </Typography>
                          <TextField
                            defaultValue={order[detailsKey.key]}
                            value={order[detailsKey.key]}
                            onClick={
                              detailsKey.label === 'Հեռախոսահամար' && !isEditing
                                ? () =>
                                    navigate(
                                      `/customers/${order[detailsKey.key]}`,
                                    )
                                : undefined
                            }
                            size="small"
                            onChange={(evt) =>
                              editOrder({ [detailsKey.key]: evt.target.value })
                            }
                            className={`${styles.date} ${
                              detailsKey.label === 'Հեռախոսահամար' && !isEditing
                                ? styles.phone
                                : ''
                            }`}
                            disabled={!isEditing}
                          />
                        </Box>
                      )}
                  </React.Fragment>
                ),
            )}
            <Box className={styles.infoContainer}>
              <Typography className={styles.infoLabel}>
                Ընդհանուր Քանակ
              </Typography>
              <Typography className={styles.info}>
                {commonQtyAndPrice.qty}
              </Typography>
            </Box>
            <Box className={styles.infoContainer}>
              <Typography className={styles.infoLabel}>
                Ընդհանուր Գումար
              </Typography>
              <Typography className={styles.info}>
                {priceFormatter(commonQtyAndPrice.price)} ֏
              </Typography>
            </Box>
          </Box>
          <>
            <SectionHeader title="Նշումներ" />
            <TextField
              value={order.notes || ''}
              size="small"
              onChange={(evt) => editOrder({ notes: evt.target.value })}
              className={styles.notes}
              style={{ margin: '20px 0px' }}
              disabled={!isEditing}
            />
          </>
          <SectionHeader title="Պատվիրված ապրանքները" />
          <Box className={styles.products}>
            <ProductTable
              displayOrderNumber={false}
              data={order.orderProducts}
              isEditing={isEditing}
              editProduct={editProduct}
              handleRemove={removeOrderProduct}
            />
            {isEditing && (
              <Box className={styles.productAddBtn}>
                {isAddActive ? (
                  <OrderProductSearch
                    onChange={handleAddProduct}
                    orderProducts={order.orderProducts}
                  />
                ) : (
                  <IconButton onClick={() => setIsAddActive(true)}>
                    <ControlPointIcon sx={{ color: 'green' }} />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

export default OrderPage
