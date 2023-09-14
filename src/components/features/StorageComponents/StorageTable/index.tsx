import { FC, useState } from 'react'
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
import { IStorageImport, StorageKeys } from 'types/storage.types'
import ImportInfoModal from '../ImportInfoModal'

import styles from './styles.module.scss'

interface IProps {
  data: IStorageImport[]
  columns: string[]
}

const StorageTable: FC<IProps> = ({ data, columns }) => {
  const [selectedImport, setSelectedImport] = useState<IStorageImport | null>(
    null,
  )

  return (
    <>
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
                key={data.title}
                sx={{ padding: 20 }}
                className={styles.bodyRow}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedImport(data)}
              >
                {StorageTableKeys.map((key: StorageKeys, index) => (
                  <TableCell
                    className={styles.bodyCell}
                    component="th"
                    scope="row"
                    align="left"
                  >
                    <Typography className={styles.data}>
                      {key === StorageKeys.USER
                        ? data.user?.fullName
                        : data[key]}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedImport && (
        <ImportInfoModal
          importData={selectedImport}
          onClose={() => setSelectedImport(null)}
        />
      )}
    </>
  )
}

export default StorageTable
