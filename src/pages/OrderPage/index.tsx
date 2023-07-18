import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import Loading from '@shared/Loading'
import ProductTable from '@shared/ProductsTable'
import SectionHeader from '@shared/SectionTitle'
import { IOrder } from 'types/order.types'
import { getOrderById } from 'services/orders.service'
import { OrderDetailsKeys, orderRowColor } from '@utils/order/constants'

import styles from './styles.module.scss'

const OrderPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState<IOrder | null>(null)
  const [commonQtyAndPrice, setCommonQtyAndPrice] = useState({
    qty: 0,
    price: 0,
  })

  const { id } = useParams()

  const getProduct = async () => {
    if (id) {
      setIsLoading(true)
      const data = await getOrderById(id)

      if (data.success) {
        setOrder(data.data)
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    getProduct()
  }, [id])

  useEffect(() => {
    if (order) {
      const commonQtyAndPrice = order.orderProducts.reduce(
        (acc, product) => ({
          qty: acc.qty + product.quantity,
          price: acc.price + +product.product.price,
        }),
        {
          qty: 0,
          price: 0,
        }
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
          </Box>
          <Box className={styles.details}>
            {OrderDetailsKeys.map(
              (detailsKey) =>
                order[detailsKey.key] && (
                  <Box key={detailsKey.label} className={styles.infoContainer}>
                    <Typography className={styles.infoLabel}>
                      {detailsKey.label}
                    </Typography>
                    <Typography className={styles.info}>
                      {order[detailsKey.key]}
                    </Typography>
                  </Box>
                )
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
          <SectionHeader title="Պատվիրած ապրանքները" />
          <Box className={styles.products}>
            <ProductTable data={order.orderProducts} />
          </Box>
        </>
      )}
    </Box>
  )
}

export default OrderPage
