import { FC } from 'react'
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

import styles from './styles.module.scss'

interface IProps {
  data: Array<{ [key: string]: string | number }>
  columns: string[]
}

const TableComponent: FC<IProps> = ({ data, columns }) => {
  const keys = Object.keys(data[0])

  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((key) => (
              <TableCell align="left">{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow
              key={data.name}
              sx={{ padding: 20 }}
              className={styles.bodyRow}
            >
              {keys.map((key: string) => (
                <TableCell
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="left"
                >
                  <Typography className={styles.data}>{data[key]}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent
