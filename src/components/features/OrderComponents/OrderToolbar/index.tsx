import { useState, useContext, useEffect } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  FormControl,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import SectionHeader from '@shared/SectionTitle'
import OrderAddModal from '@features/OrderComponents/AddOrderModal'
import { OrdersContext } from 'contexts/order.context'
import { productStatuses } from '@utils/product/constants'

import styles from './styles.module.scss'

const OrderToolbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [ordersType, setOrdersType] = useState('all')

  const { filters, setFilters } = useContext(OrdersContext)

  const handleFilter = (key: string, value: string) => {
    if (key === 'type') {
      setOrdersType(value)
    }
    setFilters({ ...filters, [key]: value })
  }

  useEffect(() => {}, [ordersType])

  return (
    <Box className={styles.orderToolbar}>
      <Box className={styles.header}>
        <SectionHeader title="Պատվերներ" />
        <Button className={styles.addBtn} onClick={() => setIsOpen(true)}>
          Ավելացնել Պատվեր
        </Button>
      </Box>
      <Box className={styles.topBar}>
        <Button
          className={
            ordersType === 'new' ? styles.selectedButton : styles.button
          }
          onClick={() => handleFilter('type', 'new')}
        >
          Նոր պատվերները
        </Button>
        <Button
          className={
            ordersType === 'delivery' ? styles.selectedButton : styles.button
          }
          onClick={() => handleFilter('type', 'delivery')}
        >
          Առաքվող պատվերները
        </Button>
        <Button
          className={
            ordersType === 'all' ? styles.selectedButton : styles.button
          }
          onClick={() => handleFilter('type', 'all')}
        >
          Արխիվ
        </Button>
      </Box>
      <Box className={styles.bottomBar}>
        <TextField
          className={styles.search}
          label="Որոնում"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl className={styles.select}>
          <Select
            defaultValue={'Բոլորը'}
            className={styles.select}
            onChange={(evt) => handleFilter('status', evt.target.value)}
          >
            {productStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton className={styles.settings}>
          <SettingsIcon />
        </IconButton>
      </Box>
      <OrderAddModal open={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  )
}

export default OrderToolbar
