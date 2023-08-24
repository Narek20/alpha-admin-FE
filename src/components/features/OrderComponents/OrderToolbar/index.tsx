import { useState, useContext, useLayoutEffect } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import SectionHeader from '@shared/SectionTitle'
import OrderAddModal from '@features/OrderComponents/AddOrderModal'
import OrderSettings from '../OrderSettings'
import { OrdersContext } from 'contexts/order.context'
import { OrderStatus } from 'types/order.types'

import styles from './styles.module.scss'

const OrderToolbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [tab, setTab] = useState<OrderStatus>(OrderStatus.RECEIVED)
  const [status, setStatus] = useState('Բոլորը')

  const { filters, setFilters, searchOrders } = useContext(OrdersContext)

  const handleFilter = (key: string, value: OrderStatus) => {
    if (key === 'tab') {
      setTab(value)
    } else {
      setStatus(value)
    }

    // if (key === 'tab' && value === OrderStatus.RECEIVED) {
    //   setFilters({ ...filters, status })
    // } else {
    setFilters({ ...filters, status: value })
    // }
  }

  useLayoutEffect(() => {
    setFilters({ ...filters, status: OrderStatus.RECEIVED })
  }, [])

  return (
    <Box className={styles.orderToolbar}>
      <Box className={styles.header}>
        <SectionHeader title="Պատվերներ" />
        <Button className={styles.addBtn} onClick={() => setIsOpen(true)}>
          Ավելացնել Պատվեր
        </Button>
      </Box>
      <Box className={styles.topBar}>
        <Box>
          <Button
            className={
              tab === OrderStatus.RECEIVED
                ? styles.selectedButton
                : styles.button
            }
            onClick={() => handleFilter('tab', OrderStatus.RECEIVED)}
          >
            Նոր Պատվերներ
          </Button>
          <Button
            className={
              tab === OrderStatus.PACKING
                ? styles.selectedButton
                : styles.button
            }
            onClick={() => handleFilter('tab', OrderStatus.PACKING)}
          >
            Փաթեթավորվում է
          </Button>
        </Box>
        <Box>
          <Button
            className={
              tab === OrderStatus.DELIVERY
                ? styles.selectedButton
                : styles.button
            }
            onClick={() => handleFilter('tab', OrderStatus.DELIVERY)}
          >
            Առաքվում է
          </Button>
          <Button
            className={
              tab === OrderStatus.COMPLETED
                ? styles.selectedButton
                : styles.button
            }
            onClick={() => handleFilter('tab', OrderStatus.ISSUE)}
          >
            Խնդիր
          </Button>
          <Button
            className={
              tab === OrderStatus.COMPLETED
                ? styles.selectedButton
                : styles.button
            }
            onClick={() => handleFilter('tab', OrderStatus.COMPLETED)}
          >
            Արխիվ
          </Button>
        </Box>
      </Box>
      <Box className={styles.bottomBar}>
        <TextField
          className={styles.search}
          label="Որոնում"
          onChange={(evt) => searchOrders(evt.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* <FormControl className={styles.select}>
          <Select
            defaultValue={'Բոլորը'}
            className={styles.select}
            onChange={(evt) =>
              handleFilter('status', evt.target.value as OrderStatus)
            }
          >
            {productStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <IconButton
          className={styles.settings}
          onClick={() => setIsSettingsOpen(true)}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
      <OrderAddModal open={isOpen} onClose={() => setIsOpen(false)} />
      <OrderSettings
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </Box>
  )
}

export default OrderToolbar
