import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Paper from '@mui/material/Paper'
import {
  IconButton,
  Button,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TextField,
  InputAdornment,
  Stack,
  Pagination,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { priceFormatter } from '@utils/priceFormatter'
import { CRMTableColumns } from '@utils/CRM/constants'
import { CustomersContext } from 'contexts/customer.context'

import Loading from '@shared/Loading'
import ConfirmationModal from '@shared/ConfirmationModal'
import { removeCustomer } from 'services/customer.service'
import { useToast } from 'contexts/toast.context'

import styles from './styles.module.scss'

const CustomersTable = () => {
  const [page, setPage] = useState<null | number>(null)
  const [customerId, setCustomerId] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const { showToast } = useToast()
  const {
    customers,
    setCustomers,
    searchKey,
    setSearchKey,
    pagination,
    getCustomers,
    isLoading,
  } = useContext(CustomersContext)

  const handleClick = (evt: React.MouseEvent, id: number) => {
    evt.stopPropagation()
    setIsOpen(true)
    setCustomerId(id)
  }

  const handleClose = () => {
    setIsOpen(false)
    setCustomerId(0)
  }

  const handleRemove = async () => {
    if (customerId) {
      const data = await removeCustomer(customerId)

      if (data.success) {
        showToast('success', data.message)
        setCustomers(customers.filter(({ id }) => id !== customerId))
        setIsOpen(false)
      }
    }
  }

  useEffect(() => {
    setPage(1)
  }, [searchKey])

  useEffect(() => {
    if (page) {
      pagination.skip = page - 1
      getCustomers()
    }
  }, [page])

  return (
    <>
      <TextField
        fullWidth
        label="Փնտրել"
        value={searchKey}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: searchKey ? (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchKey('')}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        onChange={(evt) => setSearchKey(evt.target.value)}
      />
      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table className={styles.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {CRMTableColumns.map((column) => (
                <TableCell
                  key={column}
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="left"
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
              {customers.map(
                ({ id, fullName, phone, totalPrice, totalQty }) => (
                  <TableRow
                    key={fullName + phone}
                    sx={{ padding: 20 }}
                    className={styles.bodyRow}
                    onClick={() => navigate(`/customers/${phone}`)}
                  >
                    <TableCell
                      className={styles.bodyCell}
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {fullName}
                    </TableCell>
                    <TableCell
                      className={styles.bodyCell}
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {phone}
                    </TableCell>
                    <TableCell
                      className={styles.bodyCell}
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {priceFormatter(totalPrice)} ֏
                    </TableCell>
                    <TableCell
                      className={styles.bodyCell}
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {totalQty}
                    </TableCell>
                    <TableCell>
                      <Button>
                        <IconButton onClick={(evt) => handleClick(evt, id)}>
                          <DeleteOutlineOutlinedIcon
                            sx={{ color: '#f96666' }}
                          />
                        </IconButton>
                      </Button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {isLoading && <Loading />}
      {!!customers.length && pagination.count > pagination.take && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Pagination
            sx={{ ml: 'auto' }}
            page={page || 1}
            count={Math.ceil(pagination.count / pagination.take)}
            variant="outlined"
            onChange={(_, page) => setPage(page)}
          />
        </Stack>
      )}
      {isOpen && (
        <ConfirmationModal
          onClose={handleClose}
          onConfirm={handleRemove}
          btnText="Հեռացնել"
          text="Հաճախորդի հեռացում"
        />
      )}
    </>
  )
}

export default CustomersTable
