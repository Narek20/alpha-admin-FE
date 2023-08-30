import { useContext, useState } from 'react'
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
} from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { priceFormatter } from '@utils/priceFormatter'
import { CRMTableColumns } from '@utils/CRM/constants'
import { CustomersContext } from 'contexts/customer.context'

import ConfirmationModal from '@shared/ConfirmationModal'
import { removeCustomer } from 'services/customer.service'
import { useToast } from 'contexts/toast.context'

import styles from './styles.module.scss'

const CustomersTable = () => {
  const [customerId, setCustomerId] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const { showToast } = useToast()
  const { customers, setCustomers } = useContext(CustomersContext)

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

  return (
    <>
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
          <TableBody>
            {customers.map(({ id, fullName, phone, totalPrice, totalQty }) => (
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
                      <DeleteOutlineOutlinedIcon sx={{ color: '#f96666' }} />
                    </IconButton>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        open={isOpen}
        onClose={handleClose}
        onConfirm={handleRemove}
        btnText="Հեռացնել"
        text="Հաճախորդի հեռացում"
      />
    </>
  )
}

export default CustomersTable
