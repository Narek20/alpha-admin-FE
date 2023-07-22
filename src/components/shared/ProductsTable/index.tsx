import { FC } from 'react'
import { useNavigate } from 'react-router'
import Paper from '@mui/material/Paper'
import {
  Box,
  Button,
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
  data: Array<{ product: IProduct; quantity: number; size?: string }>
}

const ProductTable: FC<IProps> = ({ data }) => {
  const columns = [
    'Նկար',
    'Կատեգորիա',
    'Անվանում',
    'Բրենդ',
    'Չափս',
    'Քանակ',
    'Գին',
  ]
  const navigate = useNavigate()

  return (
    <TableContainer className={styles.tableContainer} component={Paper}>
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
          {data.map(({ quantity, product, size }) => (
            <TableRow
              key={product.title}
              sx={{ padding: 20 }}
              className={styles.bodyRow}
            >
              <TableCell
                className={styles.imgBodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Box className={styles.imgContainer}>
                  <img src={product.images[0]} className={styles.img} />
                  <Box className={styles.zoomedContainer}>
                    <img src={product.images[0]} className={styles.zoomedImg} />
                    <Button
                      className={styles.seeMoreBtn}
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      Տեսնել ավելին
                    </Button>
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Typography className={styles.data}>
                  {product.category.title}
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
                <Typography className={styles.data}>{size}</Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Typography className={styles.data}>{quantity}</Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Typography className={styles.data}>{product.price}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable
