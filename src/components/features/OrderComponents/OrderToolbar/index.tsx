import { useState, useEffect } from 'react'
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
import OrderAddModal from '@shared/AddOrderModal'
import { productStatuses } from '@utils/product/constants'

import styles from './styles.module.scss'

const OrderToolbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [ordersType, setOrdersType] = useState('all')

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
          onClick={() => setOrdersType('new')}
        >
          Նոր պատվերները
        </Button>
        <Button
          className={
            ordersType === 'delivery' ? styles.selectedButton : styles.button
          }
          onClick={() => setOrdersType('delivery')}
        >
          Առաքվող պատվերները
        </Button>
        <Button
          className={
            ordersType === 'all' ? styles.selectedButton : styles.button
          }
          onClick={() => setOrdersType('all')}
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
          <Select defaultValue={'Բոլորը'} className={styles.select}>
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
