import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Box, Typography } from '@mui/material'
import Loading from '@shared/Loading'
import CustomerOrders from '@features/CustomerComponents/CustomerOrderTable'
import { ICustomer } from 'types/customer.types'
import { getOneCustomer } from 'services/customer.service'

import styles from './styles.module.scss'

const CustomerPage = () => {
  const [customer, setCustomer] = useState<ICustomer | null>(null)

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

  return customer ? (
    <Box className={styles.customerPage}>
      <Box className={styles.sidebar}>
        <Box className={styles.customerInfo}>
          <Typography className={styles.label}>Անուն ազգանուն։</Typography>
          <Typography className={styles.info}>{customer.fullName}</Typography>
        </Box>
        <Box className={styles.customerInfo}>
          <Typography className={styles.label}>Հեռախոսահամարը։</Typography>
          <Typography className={styles.info}>{customer.phone}</Typography>
        </Box>
        <Box className={styles.customerInfo}>
          <Typography className={styles.label}>Հասցե։</Typography>
          <Typography className={styles.info}>{customer?.orders[0]?.address}</Typography>
        </Box>
        <Box className={styles.customerInfo}>
          <Typography className={styles.label}>Ընհանուր պատվերները։</Typography>
          <Typography className={styles.info}>
            {customer.orders?.length}
          </Typography>
        </Box>
       
      </Box>
      <CustomerOrders orders={customer.orders} />
    </Box>
  ) : (
    <Loading />
  )
}

export default CustomerPage
