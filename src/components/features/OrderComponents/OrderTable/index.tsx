import { useContext, useEffect, useMemo, useState } from 'react'
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
  InputBase,
  Autocomplete,
  Checkbox,
  Button,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import StarsIcon from '@mui/icons-material/Stars'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { useToast } from 'contexts/toast.context'
import Loading from '@shared/Loading'
import Pagination from '@shared/Pagination'
import ConfirmationModal from '@shared/ConfirmationModal'
import { OrdersContext } from 'contexts/order.context'
import { DriversContext } from 'contexts/driver.context'
import { changeStatus, removeOrder, updateOrder } from 'services/orders.service'
import {
  OrderStatuses,
  OrderTableKeys,
  getOrderIcon,
  orderRowColor,
  orderStatusStyles,
  paymentMethods,
} from '@utils/order/constants'
import { OrderTableKeysType, IOrder, OrderStatus } from 'types/order.types'

import styles from './styles.module.scss'

const OrderTable = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editRow, setEditRow] = useState(-1)
  const [isComplete, setIsComplete] = useState(false)
  const [confirmModalText, setConfirmModalText] = useState('')
  const [rowChanges, setRowChanges] = useState<IOrder | undefined>()
  const [showOrders, setShowOrders] = useState(false)
  const [checkedOrders, setCheckedOrders] = useState<number[]>([])

  const {
    orders,
    filters,
    pagination,
    setOrders,
    getCounts,
    getOrders,
    isLoading,
    tableColumns,
  } = useContext(OrdersContext)

  const { drivers } = useContext(DriversContext)

  const { showToast } = useToast()
  const navigate = useNavigate()

  const nextStatus = useMemo(
    () =>
      filters.status === OrderStatus.RECEIVED
        ? OrderStatus.PACKING
        : filters.status === OrderStatus.PACKING
        ? OrderStatus.DELIVERY
        : filters.status === OrderStatus.DELIVERY
        ? OrderStatus.COMPLETED
        : null,
    [filters],
  )

  const changeStatuses = async () => {
    if (!nextStatus || !checkedOrders.length) {
      return
    }

    const data = await changeStatus(checkedOrders, nextStatus)

    if (data.success) {
      showToast('success', data.message)
      setOpen(false)
      setIsEdit(false)
      setEditRow(-1)
      setCheckedOrders([])
      getCounts()
      getOrders()
    }
  }

  const openCompleteConfirm = (
    evt: React.MouseEvent<HTMLButtonElement>,
    index: number,
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
    index: number,
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

  const handleChange = async (key: OrderTableKeysType, value: string) => {
    if (rowChanges) {
      setRowChanges({ ...rowChanges, [key]: value })

      if (key === OrderTableKeysType.STATUS) {
        const order = orders.find((_, ind) => ind === editRow)

        const data = await updateOrder({
          id: order?.id,
          status: value,
        } as IOrder)

        if (data.success) {
          showToast('success', data.message)
          setOpen(false)
          setIsEdit(false)
          setEditRow(-1)
          getCounts()
          getOrders()
        }
      }
    }
  }

  const handleConfirm = async () => {
    const order = orders.find((order, ind) => ind === editRow)

    if (isEdit && rowChanges) {
      const data = await updateOrder({
        ...rowChanges,
      })

      if (data.success) {
        showToast('success', data.message)
        setOrders(
          orders.map((order, index) =>
            index === editRow ? rowChanges : order,
          ),
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
        showToast('success', data.message)
        setOpen(false)
        setOrders(
          orders.map((order, ind) =>
            ind === editRow
              ? { ...order, status: OrderStatus.COMPLETED }
              : order,
          ),
        )
      }
    } else {
      if (order?.id) {
        const data = await removeOrder(order.id)

        if (data.success) {
          showToast('success', data.message)
          getCounts()
          getOrders()
          setOpen(false)
        }
      }
    }
  }

  const onPageChange = (page: number) => {
    pagination.skip = page
    getOrders()
  }

  const onRowsPerPageChange = (rows: number) => {
    pagination.take = rows
    getOrders()
  }

  useEffect(() => {
    editRow !== -1 && setEditRow(-1)
    isEdit && setIsEdit(false)
    !isLoading && filters.status !== 'Բոլորը' && setShowOrders(true)
  }, [orders])

  useEffect(() => {
    setCheckedOrders([])
  }, [filters.status])

  return (
    <>
      {isLoading || !showOrders ? (
        <Loading />
      ) : (
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table
            className={styles.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {nextStatus && orders.length > 0 && (
                  <TableCell align="center" sx={{ padding: 0 }}>
                    <Checkbox
                      checked={checkedOrders.length === orders.length}
                      onChange={(evt) =>
                        setCheckedOrders(
                          evt.target.checked ? orders.map(({ id }) => id) : [],
                        )
                      }
                    />
                  </TableCell>
                )}
                {tableColumns.map((key) => (
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
                    border: `1px solid gray`,
                    cursor: 'pointer',
                    backgroundColor: orderRowColor(order.status),
                  }}
                  className={styles[orderStatusStyles(order.status)]}
                >
                  {nextStatus && (
                    <TableCell
                      key={'checkbox'}
                      className={styles.bodyCell}
                      sx={{ bgcolor: 'white', padding: 0 }}
                    >
                      <Checkbox
                        checked={checkedOrders.includes(order.id)}
                        onChange={(evt) =>
                          setCheckedOrders((prev) =>
                            evt.target.checked
                              ? [...prev, order.id]
                              : prev.filter((id) => id !== order.id),
                          )
                        }
                      />
                    </TableCell>
                  )}
                  {OrderTableKeys.map(
                    ({ key, label }, ind) =>
                      (tableColumns.find((column) => column === label) ||
                        ind === 0) && (
                        <TableCell
                          key={key}
                          className={styles.bodyCell}
                          component="th"
                          scope="row"
                          align="center"
                          style={
                            label === 'Համար'
                              ? { backgroundColor: 'white' }
                              : {}
                          }
                        >
                          {ind === 0 ? (
                            <Typography
                              className={styles.index}
                              onClick={
                                isEdit
                                  ? undefined
                                  : () => navigate(`/orders/${order.id}`)
                              }
                            >
                              №{order[key]}
                              {order.isSpecial && (
                                <StarsIcon sx={{ color: 'blue' }} />
                              )}
                              {isEdit ? (
                                <Select
                                  defaultValue={order.paymentMethod}
                                  value={
                                    editRow === index
                                      ? rowChanges?.paymentMethod
                                      : order.paymentMethod
                                  }
                                  className={styles.paymentMethods}
                                  disabled={index !== editRow}
                                  onChange={(evt) =>
                                    handleChange(
                                      OrderTableKeysType.PAYMENT_METHOD,
                                      evt.target.value,
                                    )
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
                              ) : (
                                <img
                                  className={styles.paymentIcon}
                                  src={getOrderIcon(order.paymentMethod)}
                                />
                              )}
                            </Typography>
                          ) : (
                            <TextField
                              defaultValue={order[key]}
                              size="small"
                              className={styles.data}
                              disabled={!isEdit || index !== editRow}
                              onChange={(evt) =>
                                handleChange(key, evt.target.value)
                              }
                              multiline={
                                isEdit && index === editRow && ind === 5
                              }
                              maxRows={2}
                            />
                          )}
                        </TableCell>
                      ),
                  )}
                  {tableColumns.find((column) => column === 'Առաքիչ') && (
                    <TableCell
                      className={styles.bodyCell}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      <Autocomplete
                        noOptionsText="Ոչինչ չի գտնվել"
                        disablePortal
                        id="combo-box-demo"
                        className={styles.driver}
                        options={drivers.map((product) => product.fullName)}
                        onChange={(_, value) =>
                          handleChange(
                            OrderTableKeysType.DRIVER,
                            value as string,
                          )
                        }
                        value={
                          editRow === index ? rowChanges?.driver : order.driver
                        }
                        disabled={!isEdit}
                        renderInput={(params) => (
                          <TextField {...params} disabled={!isEdit} />
                        )}
                      />
                    </TableCell>
                  )}
                  {tableColumns.find((column) => column === 'Ստեղծման օր') && (
                    <TableCell
                      className={styles.bodyCell}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      <TextField
                        value={
                          editRow === index
                            ? rowChanges?.createdAt
                            : order.createdAt
                        }
                        size="small"
                        type="date"
                        onChange={(evt) =>
                          handleChange(
                            OrderTableKeysType.CREATED_AT,
                            evt.target.value,
                          )
                        }
                        className={styles.data}
                        disabled={!isEdit || index !== editRow}
                      />
                    </TableCell>
                  )}
                  {tableColumns.find((column) => column === 'Առաքման օր') && (
                    <TableCell
                      className={styles.bodyCell}
                      component="th"
                      scope="row"
                      align="center"
                    >
                      <TextField
                        value={
                          editRow === index
                            ? rowChanges?.deliveryDate
                            : order.deliveryDate
                        }
                        size="small"
                        type="date"
                        onChange={(evt) =>
                          handleChange(
                            OrderTableKeysType.DELIVERY_DATE,
                            evt.target.value,
                          )
                        }
                        className={styles.data}
                        disabled={!isEdit || index !== editRow}
                      />
                    </TableCell>
                  )}
                  {tableColumns.find((column) => column === 'Ստատուսը') && (
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
                        className={styles.status}
                        input={<InputBase />}
                        disabled={!isEdit || index !== editRow}
                        onChange={(evt) =>
                          handleChange(
                            OrderTableKeysType.STATUS,
                            evt.target.value,
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
                  )}
                  {tableColumns.find(
                    (column) => column === 'Գործողություններ',
                  ) && (
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
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        count={pagination.count}
        take={pagination.take}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
      {nextStatus && checkedOrders.length > 0 && (
        <Button onClick={changeStatuses} variant="contained">
          Տեղափոխել {nextStatus}
        </Button>
      )}
      {open && (
        <ConfirmationModal
          onClose={() => setOpen(false)}
          text={confirmModalText + !isEdit ? 'Պատվերը' : ''}
          btnText={confirmModalText}
          isEdit={isEdit}
          isComplete={isComplete}
          onConfirm={handleConfirm}
        />
      )}
    </>
  )
}

export default OrderTable
