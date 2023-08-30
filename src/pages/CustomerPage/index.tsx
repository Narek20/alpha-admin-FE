import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Box, Typography, IconButton } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Loading from '@shared/Loading'
import CustomerOrders from '@features/CustomerComponents/CustomerOrderTable'
import { ICustomer } from 'types/customer.types'
import { getOneCustomer } from 'services/customer.service'
import CustomerEditModal from '@features/CustomerComponents/CustomerEditModal'
import ProductTable from '@shared/ProductsTable'
import { orderProductType } from 'types/order.types'
import { customerInformation } from '@utils/customer/constants'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'

import styles from './styles.module.scss'

const CustomerPage = () => {
  const [customer, setCustomer] = useState<ICustomer | null>(null)
  const [orderProducts, setOrderProducts] = useState<orderProductType[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const { fullName } = useParams()

  const getCustomer = async () => {
    if (fullName) {
      const data = await getOneCustomer(fullName)

      if (data.success) {
        setCustomer(data.data)
      }
    }
  }

  useEffect(() => {
    getCustomer()
  }, [fullName])

  useEffect(() => {
    if (customer) {
      const orderProducts = customer.orders.reduce(
        (acc: orderProductType[], order) => [...acc, ...order.orderProducts],
        [],
      )

      setOrderProducts(orderProducts)
    }
  }, [customer])

  return customer ? (
    <Box>
      <Box className={styles.customerPage}>
        <Box className={styles.sidebar}>
          {customerInformation.map(
            ({ label, key, icon }) =>
              !!customer[key] && (
                <Box key={label} className={styles.customerInfo}>
                  <Typography className={styles.label}>
                    {icon}
                    {label}
                  </Typography>
                  <Typography className={styles.info}>
                    {customer[key]}
                  </Typography>
                </Box>
              ),
          )}
          <Box className={styles.customerInfo}>
            <Typography className={styles.label}>
              <Inventory2OutlinedIcon />
              Ընհանուր պատվերները:
            </Typography>
            <Typography className={styles.info}>
              {customer?.orders?.length}
            </Typography>
          </Box>
          <Box className={styles.edit}>
            <IconButton onClick={() => setIsOpen(true)}>
              <ModeEditOutlineOutlinedIcon sx={{ color: '#f6c71e' }} />
            </IconButton>
          </Box>
        </Box>
        <CustomerOrders orders={customer.orders} />
      </Box>
      {customer.orders && <ProductTable data={orderProducts} />}
      <CustomerEditModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        customer={customer}
        setCustomer={setCustomer}
      />
    </Box>
  ) : (
    <Loading />
  )
}

export default CustomerPage
