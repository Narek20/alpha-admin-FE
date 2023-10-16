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
  IconButton,
  Select,
  MenuItem,
} from '@mui/material'
import { IProduct } from 'types/product.types'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { priceFormatter } from '@utils/priceFormatter'

import styles from './styles.module.scss'

interface IProps {
  data: Array<{
    product: IProduct
    quantity: number
    size?: string
    orderId?: number
  }>
  displayOrderNumber?: boolean
  isEditing?: boolean
  editProduct?: (
    id: number,
    newData: { size?: string; quantity?: number },
  ) => void
  handleRemove?: (index: number) => void
}

const columns = [
  'Պատվեր N',
  'Նկար',
  'Կատեգորիա',
  'Բրենդ',
  'Անվանում',
  'Չափս',
  'Քանակ',
  'Գին',
]

const ProductTable: FC<IProps> = ({
  data,
  isEditing,
  displayOrderNumber,
  editProduct,
  handleRemove,
}) => {
  const navigate = useNavigate()

  return (
    <TableContainer className={styles.tableContainer} component={Paper}>
      <Table className={styles.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((key, index) =>
              index === 0 ? (
                displayOrderNumber && (
                  <TableCell key={key} align="left">
                    {key}
                  </TableCell>
                )
              ) : (
                <TableCell key={key} align="left">
                  {key}
                </TableCell>
              ),
            )}
            {isEditing && <TableCell key="actions" align="left"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ quantity, product, size, orderId }, index) => (
            <TableRow
              key={`${product.id} ${size ? size : ''}`}
              sx={{ padding: 20 }}
              className={styles.bodyRow}
            >
              {displayOrderNumber && (
                <TableCell
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="left"
                >
                  {orderId}
                </TableCell>
              )}
              <TableCell
                className={styles.imgBodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Box className={styles.imgContainer}>
                  <img
                    src={process.env.REACT_APP_BASE_URL + product.images[0]}
                    className={styles.img}
                  />
                  <Box className={styles.zoomedContainer}>
                    <img
                      src={process.env.REACT_APP_BASE_URL + product.images[0]}
                      className={styles.zoomedImg}
                    />
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
                  {product.category}
                </Typography>
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
                <Typography className={styles.data}>{product.title}</Typography>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                {product.sizes && isEditing ? (
                  <Select
                    value={size}
                    className={styles.select}
                    onChange={(evt) =>
                      editProduct &&
                      editProduct(index, { size: evt.target.value })
                    }
                  >
                    {product.sizes.map(
                      (el) => (
                        // el.quantity ? (
                        <MenuItem key={el.size} value={el.size}>
                          {el.size}
                        </MenuItem>
                      ),
                      // ) : null,
                    )}
                  </Select>
                ) : (
                  <Typography className={styles.data}>{size}</Typography>
                )}
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Box className={styles.incDecBox}>
                  {!isEditing && (
                    <Typography className={styles.data}>{quantity}</Typography>
                  )}
                  {isEditing && (
                    <Box className={styles.incDecActions}>
                      <IconButton
                        onClick={() =>
                          // quantity <
                          //   (product.sizes?.find((el) => el.size === size)
                          //     ?.quantity || 0) &&
                          editProduct &&
                          editProduct(index, {
                            quantity: quantity + 1,
                          })
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <Typography className={styles.data}>
                        {quantity}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          editProduct &&
                          editProduct(index, {
                            quantity: quantity - 1,
                          })
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </TableCell>
              <TableCell
                className={styles.bodyCell}
                component="th"
                scope="row"
                align="left"
              >
                <Typography className={styles.data}>
                  {priceFormatter(product.price)} ֏
                </Typography>
              </TableCell>
              {isEditing && (
                <TableCell
                  className={styles.bodyCell}
                  component="th"
                  scope="row"
                  align="left"
                >
                  <IconButton
                    onClick={() => handleRemove && handleRemove(index)}
                  >
                    <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable
