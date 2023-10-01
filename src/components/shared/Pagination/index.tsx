import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { TablePagination } from '@mui/material'
import { IPagination } from 'types/product.types'

interface IProps {
  // count: number
  // take?: number
  pagination: IPagination
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

const Pagination: FC<IProps> = ({
  // count,
  // take = 10,
  pagination,
  onPageChange,
  onRowsPerPageChange,
}) => {
  // const [page, setPage] = useState(pagination.skip)

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPageChange(newPage)
    // setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10))
    // setPage(0)
  }

  return (
    <TablePagination
      component="div"
      labelRowsPerPage=""
      count={pagination.count}
      page={pagination.skip}
      onPageChange={handleChangePage}
      rowsPerPage={pagination.take}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}

export default Pagination
