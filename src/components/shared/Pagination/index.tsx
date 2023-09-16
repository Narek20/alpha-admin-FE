import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { TablePagination } from '@mui/material'

interface IProps {
  count: number
  take?: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

const Pagination: FC<IProps> = ({
  count,
  take = 10,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [page, setPage] = useState(0)

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPageChange(newPage)
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TablePagination
      component="div"
      labelRowsPerPage=""
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={take}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}

export default Pagination
