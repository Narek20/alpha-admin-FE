import { FC, useState, useEffect, useContext } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Button,
  Modal,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import useOnEnter from '@utils/hooks/useOnEnter'
import { StoresContext } from 'contexts/store.context'
import localStorageKeys from '@utils/localStorageKeys'
import { StoreTableColumns } from '@utils/store/constants'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const StoreSettings: FC<IProps> = ({ open, onClose }) => {
  const [columns, setColumns] = useState<
    { column: string; isChecked: boolean }[]
  >([])
  const { tableColumns, setTableColumns } = useContext(StoresContext)

  const handleSave = () => {
    const tableColumns = columns
      .filter(({ isChecked }) => isChecked)
      .map(({ column }) => column)
    setTableColumns(tableColumns)
    localStorage.setItem(
      localStorageKeys.STORE_TABLE_COLUMNS,
      JSON.stringify(tableColumns),
    )
    onClose()
  }

  const handleChange = (selectedColumn: string) => {
    const updatedColumns = columns.map((column) => {
      if (column.column === selectedColumn) {
        return {
          ...column,
          isChecked: !column.isChecked,
        }
      }

      return column
    })

    setColumns([...updatedColumns])
  }

  useOnEnter(handleSave)

  useEffect(() => {
    const columns: { column: string; isChecked: boolean }[] = []
    StoreTableColumns.forEach((tableColumn) => {
      const column = tableColumns.find((value) => value === tableColumn)
      columns.push({ column: tableColumn, isChecked: column ? true : false })
    })

    setColumns([...columns])
  }, [tableColumns])

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.header}>
          <Typography className={styles.title}>Խանութի սյունները</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box className={styles.content}>
          {columns.map(({ column, isChecked }) => (
            <Box key={column}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value={isChecked}
                    control={
                      <Radio
                        checked={isChecked}
                        onClick={() => handleChange(column)}
                      />
                    }
                    label={column}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
        </Box>
        <Box className={styles.actions}>
          <Button
            className={styles.addBtn}
            color={'success'}
            onClick={handleSave}
          >
            Պահպանել
          </Button>
          <Button
            className={styles.cancelBtn}
            color="inherit"
            onClick={onClose}
          >
            Չեղարկել
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default StoreSettings
