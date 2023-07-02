import { useContext, useState, useEffect } from 'react'
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
  TextField,
  MenuItem,
  Select,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import OrdersModal from '@shared/OrdersModal'
import { OrdersContext } from 'contexts/order.context'
import {
  OrderStatuses,
  OrderTableColumns,
  OrderTableKeys,
  orderStatusStyles,
} from '@utils/order/constants'
import Pagination from '@shared/Pagination'
import { OrderTableKeysType, OrderType } from 'types/order.types'

import styles from './styles.module.scss'

const OrderTable = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editRow, setEditRow] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [rowChanges, setRowChanges] = useState<OrderType | null>(null)

  const { orders } = useContext(OrdersContext)

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

  const onEdit = (index: number) => {
    setEditRow(index)
    setIsEdit(true)
  }

  const openEditConfirm = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setIsEdit(false)
    setRowChanges(null)
  }

  const handleChange = (key: OrderTableKeysType, value: string) => {
    if (rowChanges) {
      setRowChanges({ ...rowChanges, [key]: value })
    }
  }

  useEffect(() => {}, [])

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
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
            {orders.map((order, index) => (
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
                    <TextField
                      defaultValue={order[key]}
                      className={styles.data}
                      disabled={!isEdit || index !== editRow}
                      onChange={(evt) => handleChange(key, evt.target.value)}
                    />
                  </TableCell>
                ))}
                <TableCell
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="left"
                >
                  <Select
                    defaultValue={order.status}
                    value={
                      rowChanges?.status ? rowChanges?.status : order.status
                    }
                    className={
                      styles[
                        orderStatusStyles(
                          rowChanges?.status ? rowChanges.status : order.status
                        )
                      ]
                    }
                    disabled={!isEdit || index !== editRow}
                    onChange={(evt) =>
                      handleChange(OrderTableKeysType.STATUS, evt.target.value)
                    }
                  >
                    {OrderStatuses.map((status) => (
                      <MenuItem value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="left"
                >
                  <Box className={styles.actions}>
                    <IconButton
                      onClick={isEdit ? openEditConfirm : openCompleteConfirm}
                    >
                      {isEdit ? (
                        <DoneIcon sx={{ color: '#067b00' }} />
                      ) : (
                        <CheckCircleOutlineOutlinedIcon
                          sx={{ color: '#067b00' }}
                        />
                      )}
                    </IconButton>
                    {isEdit && index === editRow ? (
                      <IconButton onClick={handleCancel}>
                        <CloseOutlinedIcon sx={{ color: '#f96666' }} />
                      </IconButton>
                    ) : (
                      <>
                        <IconButton onClick={() => onEdit(index)}>
                          <ModeEditOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={openRemoveConfirm}>
                          <DeleteOutlineOutlinedIcon
                            sx={{ color: '#f96666' }}
                          />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={50}
        onPageChange={(n: number) => console.log(n)}
        onRowsPerPageChange={(n: number) => console.log(n)}
      />
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
