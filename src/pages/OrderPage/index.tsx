import { useState, useEffect } from 'react'
import { renderMatches, useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Autocomplete,
  MenuItem,
} from '@mui/material'
import Loading from '@shared/Loading'
import ProductTable from '@shared/ProductsTable'
import SectionHeader from '@shared/SectionTitle'
import { IOrder, orderProductType } from 'types/order.types'
import { IProduct } from 'types/product.types'
import { getOrderById, updateOrder } from 'services/orders.service'
import {
  OrderDetailsKeys,
  getOrderIcon,
  orderRowColor,
} from '@utils/order/constants'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

import styles from './styles.module.scss'
import { getAllProducts } from 'services/products.service'
import { ProductSearch } from '@shared/ProductSearch'

const OrderPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [defaultOrder, setDefaultOrder] = useState<IOrder | null>(null)
  const [order, setOrder] = useState<IOrder | null>(null)
  const [commonQtyAndPrice, setCommonQtyAndPrice] = useState({
    qty: 0,
    price: 0,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isAddActive, setIsAddActive] = useState(false)
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])

  const { id } = useParams()
  const navigate = useNavigate()

  const getProduct = async () => {
    if (id) {
      setIsLoading(true)
      const data = await getOrderById(id)

      if (data.success) {
        setOrder(data.data)
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

  const addOrderProduct = (newData: orderProductType) => {
    setOrder(
      (prev) =>
        prev && {
          ...prev,
          orderProducts: [...prev.orderProducts, { ...newData }],
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
            ) && size.quantity,
        ),
    )

  const handleAddProduct: (
    event: React.SyntheticEvent<Element, Event>,
    value: IProduct | null,
  ) => void = (evt, value) => {
    const newData = searchedProducts.find((product) => product.id === value?.id)
    if (!newData) {
      return
    }
    addOrderProduct({
      id: NaN,
      product: newData,
      quantity: 1,
      size: newData.sizes?.find(
        (size) =>
          !order?.orderProducts.some(
            (orderProduct) =>
              orderProduct.product.id === newData.id &&
              orderProduct.size === size.size,
          ) && size.quantity,
      )?.size,
    })
    setSearchedProducts([])
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
      }
    }
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setOrder(defaultOrder)
  }

  useEffect(() => {
    getProduct()
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
      {isLoading || !order ? (
        <Loading />
      ) : (
        <>
          <Box className={styles.header}>
            <SectionHeader title={`Պատվեր №${order.id}`} />
            <Typography
              className={styles.status}
              style={{ background: orderRowColor(order.status) }}
            >
              {order.status}
            </Typography>
            <img
              style={{ width: 20, height: 20 }}
              src={getOrderIcon(order.paymentMethod)}
            />
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
                order[detailsKey.key] && (
                  <Box
                    key={detailsKey.label}
                    className={styles.infoContainer}
                    onClick={
                      detailsKey.label === 'Պատվիրատու'
                        ? () => navigate(`/customers/${order[detailsKey.key]}`)
                        : undefined
                    }
                  >
                    <Typography className={styles.infoLabel}>
                      {detailsKey.label}
                    </Typography>
                    <Typography className={styles.info}>
                      {order[detailsKey.key]}
                    </Typography>
                  </Box>
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
                {commonQtyAndPrice.price}
              </Typography>
            </Box>
          </Box>
          {order.notes && (
            <>
              <SectionHeader title="Նշումներ" />
              <Typography className={styles.notes}>{order.notes}</Typography>
            </>
          )}
          <SectionHeader title="Պատվիրված ապրանքները" />
          <Box className={styles.products}>
            <ProductTable
              data={order.orderProducts}
              isEditing={isEditing}
              editProduct={editProduct}
            />
            {isEditing && (
              <Box>
                {isAddActive ? (
                  <ProductSearch
                    searchedProducts={searchedProducts}
                    setSearchedProducts={setSearchedProducts}
                    onChange={handleAddProduct}
                    handleFilter={handleFilterSearch}
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
