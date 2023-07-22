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
import { StorageTableKeys } from '@utils/storage/constants'
import { IStorage, StorageKeys } from 'types/storage.types'

import styles from './styles.module.scss'

interface IProps {
  data: IStorage[]
  columns: string[]
}

const StorageTable: FC<IProps> = ({ data, columns }) => {
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
              key={data.storage}
              sx={{ padding: 20 }}
              className={styles.bodyRow}
            >
              {StorageTableKeys.map((key: StorageKeys) => (
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

export default StorageTable
