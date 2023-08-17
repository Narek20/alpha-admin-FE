import { FC } from 'react'
import { useNavigate } from 'react-router'
import Paper from '@mui/material/Paper'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Typography,
} from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'
import StarsIcon from '@mui/icons-material/Stars'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import {
  CustomerOrdersTableColumns,
  getOrderIcon,
  orderRowColor,
  orderStatusStyles,
} from '@utils/order/constants'
import { IOrder, PaymentMethods } from 'types/order.types'

import styles from './styles.module.scss'

interface IProps {
  orders: IOrder[]
}

const CustomerOrders: FC<IProps> = ({ orders }) => {
  const navigate = useNavigate()

  return (
    <TableContainer className={styles.tableContainer} component={Paper}>
      <Table className={styles.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {CustomerOrdersTableColumns.map((key) => (
              <TableCell key={key} align="center">
                <Typography className={styles.headCell}>{key}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.createdAt}
              sx={{
                padding: 20,
                backgroundColor: orderRowColor(order.status),
                border: `1px solid gray`,
                cursor: 'pointer',
              }}
              className={styles[orderStatusStyles(order.status)]}
            >
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="center"
              >
                <Typography
                  className={styles.index}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  №{order.id}
                  {order.isSpecial && <StarsIcon sx={{ color: 'blue' }} />}
                  <img
                    style={{ width: 20, height: 20 }}
                    src={getOrderIcon(order.paymentMethod)}
                  />
                </Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="center"
              >
                <Typography className={styles.data}>{order.address}</Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="center"
              >
                <Typography className={styles.data}>{order.notes}</Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="center"
              >
                <Typography className={styles.data}>{order.driver}</Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="center"
              >
                <Typography className={styles.data}>
                  {order.createdAt}
                </Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="center"
              >
                <Typography className={styles.data}>
                  {order.deliveryDate}
                </Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="center"
              >
                <Typography className={styles.data}>{order.status}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomerOrders
