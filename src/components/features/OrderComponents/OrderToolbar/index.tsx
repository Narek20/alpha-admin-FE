import { useState, useContext } from 'react'
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
  const [ordersType, setOrdersType] = useState('Նոր պատվեր')

  const { filters, setFilters } = useContext(OrdersContext)

  const handleFilter = (key: string, value: string) => {
    if (key === 'status') {
      setOrdersType(value)
    }
    setFilters({ ...filters, [key]: value })
  }

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
            ordersType === 'Նոր պատվեր' ? styles.selectedButton : styles.button
          }
          onClick={() => handleFilter('status', 'Նոր պատվեր')}
        >
          Պատվերներ
        </Button>
        <Button
          className={
            ordersType === 'Փաթեթավորվում է'
              ? styles.selectedButton
              : styles.button
          }
          onClick={() => handleFilter('status', 'Փաթեթավորվում է')}
        >
          Փաթեթավորվում է
        </Button>
        <Button
          className={
            ordersType === 'Առաքվում է' ? styles.selectedButton : styles.button
          }
          onClick={() => handleFilter('status', 'Առաքվում է')}
        >
          Առաքվում է
        </Button>
        <Button
          className={
            ordersType === 'Ավարտված' ? styles.selectedButton : styles.button
          }
          onClick={() => handleFilter('status', 'Ավարտված')}
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
            defaultValue={'Նոր պատվեր'}
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
