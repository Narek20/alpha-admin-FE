import { useContext, useState } from 'react'
import Paper from '@mui/material/Paper'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Typography,
  Box,
  IconButton,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import OrdersModal from '@shared/OrdersModal'
import { OrdersContext } from 'contexts/order.context'
import { OrderTableColumns, OrderTableKeys } from '@utils/order/constants'
import { OrderStatus, OrderTableKeysType } from 'types/order.types'

import styles from './styles.module.scss'

const OrderTable = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const { orders } = useContext(OrdersContext)

  const statusComponent = (status: OrderStatus): string => {
    switch (status) {
      case OrderStatus.CANCELED:
        return 'canceled'
      case OrderStatus.PACKING:
        return 'packing'
      case OrderStatus.DELIVERY:
        return 'delivery'
      case OrderStatus.COMPLETED:
        return 'completed'
      default:
        return 'received'
    }
  }

  const openCompleteConfirm = () => {
    setIsComplete(true)
    setIsEdit(false)
    setOpen(true)
  }

  const openRemoveConfirm = () => {
    setIsEdit(false)
    setIsComplete(false)
    setOpen(true)
  }

  return (
    <>
      <TableContainer
        className={styles.tableContainer}
        component={Paper}
        sx={{
          '&::-webkit-scrollbar': {
            width: '5px !important',
          },
        }}
      >
        <Table className={styles.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {OrderTableColumns.map((key) => (
                <TableCell align="left">
                  <Typography className={styles.headCell}>{key}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.title}
                sx={{ padding: 20 }}
                className={styles.bodyRow}
              >
                {OrderTableKeys.map((key: OrderTableKeysType) => (
                  <TableCell
                    key={key}
                    className={styles.bodyCell}
                    component="th"
                    scope="row"
                    align="left"
                  >
                    <Typography className={styles.data}>
                      {order[key]}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="left"
                >
                  <Typography className={styles[statusComponent(order.status)]}>
                    {order.status}
                  </Typography>
                </TableCell>
                <TableCell
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="left"
                >
                  <Box className={styles.actions}>
                    <IconButton onClick={openCompleteConfirm}>
                      <DoneIcon sx={{ color: '#067b00' }} />
                    </IconButton>
                    <IconButton>
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={openRemoveConfirm}>
                      <DeleteOutlineOutlinedIcon sx={{ color: '#f96666' }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrdersModal
        open={open}
        onClose={() => setOpen(false)}
        isEdit={isEdit}
        isComplete={isComplete}
      />
    </>
  )
}

export default OrderTable
