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
import { StoresContext } from 'contexts/store.context'
import Loading from '@shared/Loading'
import Pagination from '@shared/Pagination'
import ConfirmationModal from '@shared/ConfirmationModal'
import {
  IStoreItem,
  PaymentMethods,
  StoreTableKeysType,
} from 'types/store.types'
import { getOrderIcon } from '@utils/order/constants'
import { removeOrder, updateOrder } from 'services/store.service'
import { StoreTableKeys, paymentMethods } from '@utils/store/constants'

import styles from './styles.module.scss'

const StoreTable = () => {
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editRow, setEditRow] = useState(-1)
  const [isComplete, setIsComplete] = useState(false)
  const [confirmModalText, setConfirmModalText] = useState('')
  const [rowChanges, setRowChanges] = useState<IStoreItem | undefined>()
  const [showStores, setShowStores] = useState(false)

  const {
    storeItems,
    filters,
    pagination,
    setStoreItems,
    getStoreItems,
    isLoading,
    tableColumns,
  } = useContext(StoresContext)

  const { showToast } = useToast()
  const navigate = useNavigate()

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
    const storeItem = storeItems.find((_, ind) => ind === index)
    setConfirmModalText('Պահպանել փոփոխությունները')
    setRowChanges(storeItem)
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

  const handleChange = async (key: StoreTableKeysType, value: string) => {
    if (rowChanges) {
      setRowChanges({ ...rowChanges, [key]: value })
    }
  }

  const handleConfirm = async () => {
    const storeItem = storeItems.find((storeItem, ind) => ind === editRow)

    if (isEdit && rowChanges) {
      const data = await updateOrder({
        ...rowChanges,
      })

      if (data.success) {
        showToast('success', data.message)
        setStoreItems(
          storeItems.map((storeItem, index) =>
            index === editRow ? rowChanges : storeItem,
          ),
        )
        setOpen(false)
        setIsEdit(false)
      }
    } else if (isComplete) {
      const data = await updateOrder({
        id: storeItem?.id,
      } as IStoreItem)

      if (data.success) {
        showToast('success', data.message)
        setOpen(false)
        setStoreItems(
          storeItems.map((storeItem, ind) =>
            ind === editRow ? { ...storeItem } : storeItem,
          ),
        )
      }
    } else {
      if (storeItem?.id) {
        const data = await removeOrder(storeItem.id)

        if (data.success) {
          showToast('success', data.message)
          setOpen(false)
        }
      }
    }
  }

  const onPageChange = (page: number) => {
    pagination.skip = page
    getStoreItems()
  }

  const onRowsPerPageChange = (rows: number) => {
    pagination.take = rows
    pagination.skip = 0
    getStoreItems()
  }

  useEffect(() => {
    editRow !== -1 && setEditRow(-1)
    isEdit && setIsEdit(false)
    !isLoading && filters.status !== 'Բոլորը' && setShowStores(true)
  }, [storeItems])

  return (
    <>
      {isLoading || !showStores ? (
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
                {tableColumns.map((key) => (
                  <TableCell key={key} align="center">
                    <Typography className={styles.headCell}>{key}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {storeItems.map((storeItem, index) => (
                <TableRow
                  key={storeItem.createdAt}
                  sx={{
                    padding: 20,
                    border: `1px solid gray`,
                    cursor: 'pointer',
                  }}
                >
                  {StoreTableKeys.map(
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
                                  : () => navigate(`/store/${storeItem.id}`)
                              }
                            >
                              №{storeItem[key]}
                              {storeItem.isSpecial && (
                                <StarsIcon sx={{ color: 'blue' }} />
                              )}
                              {isEdit ? (
                                <Select
                                  defaultValue={storeItem.paymentMethod}
                                  value={
                                    editRow === index
                                      ? rowChanges?.paymentMethod
                                      : storeItem.paymentMethod
                                  }
                                  className={styles.paymentMethods}
                                  disabled={index !== editRow}
                                  onChange={(evt) =>
                                    handleChange(
                                      StoreTableKeysType.PAYMENT_METHOD,
                                      evt.target.value,
                                    )
                                  }
                                >
                                  {paymentMethods.map(
                                    (method: PaymentMethods) => (
                                      <MenuItem key={method} value={method}>
                                        <img
                                          style={{ width: 20, height: 20 }}
                                          src={getOrderIcon(method)}
                                        />
                                      </MenuItem>
                                    ),
                                  )}
                                </Select>
                              ) : (
                                <img
                                  className={styles.paymentIcon}
                                  src={getOrderIcon(storeItem.paymentMethod)}
                                />
                              )}
                            </Typography>
                          ) : (
                            <TextField
                              defaultValue={storeItem[key]}
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
                            : storeItem.createdAt
                        }
                        size="small"
                        type="date"
                        onChange={(evt) =>
                          handleChange(
                            StoreTableKeysType.CREATED_AT,
                            evt.target.value,
                          )
                        }
                        className={styles.data}
                        disabled={!isEdit || index !== editRow}
                      />
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
        // count={pagination.count}
        // take={pagination.take}
        pagination={pagination}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
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

export default StoreTable
