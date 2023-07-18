import { FC } from 'react'
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
} from '@mui/material'
import { IProduct } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  data: Array<{ product: IProduct; quantity: number }>
}

const ProductTable: FC<IProps> = ({ data }) => {
  const columns = ['Նկար', 'Կատեգորիա', 'Անվանում', 'Բրենդ', 'Գին', 'Քանակ']
  const navigate = useNavigate()

  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((key) => (
              <TableCell key={key} align="left">
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ quantity, product }) => (
            <TableRow
              key={product.title}
              sx={{ padding: 20 }}
              className={styles.bodyRow}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <img src={product.images[0]} className={styles.img} />
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Typography className={styles.data}>
                  {product.category}
                </Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Typography className={styles.data}>{product.title}</Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Typography className={styles.data}>{product.brand}</Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Typography className={styles.data}>{product.price}</Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Typography className={styles.data}>{quantity}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable
