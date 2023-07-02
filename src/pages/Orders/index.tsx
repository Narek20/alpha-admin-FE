import { Box } from '@mui/material'
import OrderToolbar from '@features/OrderComponents/OrderToolbar'
import OrderTable from '@features/OrderComponents/OrderTable'

import styles from './styles.module.scss'

const OrdersPage = () => {
  return (
    <Box className={styles.ordersPage}>
      <OrderToolbar />
      <Box className={styles.table}>
        <OrderTable />
      </Box>
    </Box>
  )
}

export default OrdersPage
