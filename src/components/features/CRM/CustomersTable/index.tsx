import { FC, useContext } from 'react'
import { useNavigate } from 'react-router'
import Paper from '@mui/material/Paper'
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
} from '@mui/material'
import { priceFormatter } from '@utils/priceFormatter'
import { CRMTableColumns } from '@utils/CRM/constants'
import { CustomersContext } from 'contexts/customer.context'

import styles from './styles.module.scss'

const CustomersTable = () => {
  const navigate = useNavigate()
  const { customers } = useContext(CustomersContext)

  return (
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
          {customers.map(({ fullName, phone, totalPrice, totalQty }) => (
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
                {priceFormatter(totalPrice)}
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                {totalQty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomersTable
