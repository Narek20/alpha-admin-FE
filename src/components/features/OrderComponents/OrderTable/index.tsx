import { useContext, useState } from 'react'
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
import { useToast } from 'contexts/toast.context'
import Pagination from '@shared/Pagination'
import ConfirmationModal from '@shared/ConfirmationModal'
import { OrdersContext } from 'contexts/order.context'
import { removeOrder, updateOrder } from 'services/orders.service'
import {
  OrderStatuses,
  OrderTableColumns,
  OrderTableKeys,
  orderRowColor,
  orderStatusStyles,
} from '@utils/order/constants'
import { OrderTableKeysType, IOrder, OrderStatus } from 'types/order.types'

import styles from './styles.module.scss'

const OrderTable = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editRow, setEditRow] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [confirmModalText, setConfirmModalText] = useState('')
  const [rowChanges, setRowChanges] = useState<IOrder | undefined>()

  const { orders, filters, setOrders, setFilters } = useContext(OrdersContext)
  const { showToast } = useToast()
  const navigate = useNavigate()

  const openCompleteConfirm = (
    evt: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    evt.stopPropagation()
    evt.preventDefault()
    setIsComplete(true)
    setEditRow(index)
    setIsEdit(false)
    setOpen(true)
    setConfirmModalText('Ավարտել')
  }

  const openRemoveConfirm = (
    evt: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    evt.stopPropagation()
    evt.preventDefault()
    setIsEdit(false)
    setIsComplete(false)
    setEditRow(index)
    setOpen(true)
    setConfirmModalText('Հեռացնել')
  }

  const onEdit = (evt: React.MouseEvent<HTMLButtonElement>, index: number) => {
    evt.stopPropagation()
    evt.preventDefault()
    const order = orders.find((_, ind) => ind === index)
    setConfirmModalText('Պահպանել փոփոխությունները')
    setRowChanges(order)
    setEditRow(index)
    setIsEdit(true)
  }

  const openEditConfirm = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation()
    evt.preventDefault()
    setOpen(true)
  }

  const handleCancel = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation()
    evt.preventDefault()
    setIsEdit(false)
    setRowChanges(undefined)
  }

  const handleChange = (
    index: number,
    key: OrderTableKeysType,
    value: string
  ) => {
    if (rowChanges) {
      setRowChanges({ ...rowChanges, [key]: value })
    }
  }

  const handleConfirm = async () => {
    const order = orders.find((order, ind) => ind === editRow)

    if (isEdit && rowChanges) {
      const data = await updateOrder(rowChanges)

      if (data.success) {
        showToast('success', data.message)
        setOrders(
          orders.map((order, index) => (index === editRow ? rowChanges : order))
        )
        setOpen(false)
        setIsEdit(false)
      }
    } else if (isComplete) {
      const data = await updateOrder({
        id: order?.id,
        status: OrderStatus.COMPLETED,
      } as IOrder)

      if (data.success) {
        showToast('success', 'Պատվերը ավարտված է')
        setOpen(false)
        setOrders(
          orders.map((order, ind) =>
            ind === editRow
              ? { ...order, status: OrderStatus.COMPLETED }
              : order
          )
        )
      }
    } else {
      if (order?.id) {
        const data = await removeOrder(order.id)

        if (data.success) {
          showToast('success', data.message)
          setOrders(orders.filter((_, index) => index !== editRow))
          setOpen(false)
        }
      }
    }
  }

  const onPageChange = (page: number) => {
    setFilters({ ...filters, skip: `${page - 1}` })
  }

  const onRowsPerPageChange = (rows: number) => {
    setFilters({ ...filters, take: `${rows}` })
  }

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {OrderTableColumns.map((key) => (
                <TableCell key={key} align="center">
                  <Typography className={styles.headCell}>{key}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order.createdAt}
                sx={{
                  padding: 20,
                  backgroundColor: orderRowColor(order.status),
                  border: `1px solid gray`,
                  cursor: 'pointer',
                }}
                onClick={
                  isEdit || open
                    ? () => {}
                    : () => navigate(`/orders/${order.id}`)
                }
                className={styles[orderStatusStyles(order.status)]}
              >
                {OrderTableKeys.map((key: OrderTableKeysType, ind) => (
                  <TableCell
                    key={key}
                    className={styles.bodyCell}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {ind === 0 ? (
                      <Typography className={styles.index}>
                        №{order[key]}
                      </Typography>
                    ) : (
                      <TextField
                        defaultValue={order[key]}
                        size="small"
                        className={styles.data}
                        disabled={!isEdit || index !== editRow}
                        onChange={(evt) =>
                          handleChange(index, key, evt.target.value)
                        }
                      />
                    )}
                  </TableCell>
                ))}
                <TableCell
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="center"
                >
                  <Select
                    defaultValue={order.status}
                    value={
                      isEdit && editRow === index
                        ? rowChanges?.status
                        : order.status
                    }
                    className={styles[orderStatusStyles(order.status)]}
                    disabled={!isEdit || index !== editRow}
                    onChange={(evt) =>
                      handleChange(
                        index,
                        OrderTableKeysType.STATUS,
                        evt.target.value
                      )
                    }
                  >
                    {OrderStatuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="center"
                >
                  <Box className={styles.actions}>
                    <IconButton
                      onClick={(evt) =>
                        isEdit
                          ? openEditConfirm(evt)
                          : openCompleteConfirm(evt, index)
                      }
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
                        <IconButton onClick={(evt) => onEdit(evt, index)}>
                          <ModeEditOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton
                          onClick={(evt) => openRemoveConfirm(evt, index)}
                        >
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      <ConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        text={confirmModalText + !isEdit ? 'Պատվերը' : ''}
        btnText={confirmModalText}
        isEdit={isEdit}
        isComplete={isComplete}
        onConfirm={handleConfirm}
      />
    </>
  )
}

export default OrderTable
