import { useState, useContext, useLayoutEffect, useEffect } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import SectionHeader from '@shared/SectionTitle'
import OrderAddModal from '@features/OrderComponents/AddOrderModal'
import OrderSettings from '../OrderSettings'
import { OrdersContext } from 'contexts/order.context'
import { OrderStatus } from 'types/order.types'
import { OrderStatuses, initialStatusCounts } from '@utils/order/constants'

import styles from './styles.module.scss'

const OrderToolbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [counts, setCounts] = useState<{ [key: string]: number }>(
    initialStatusCounts,
  )
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [tab, setTab] = useState<OrderStatus>(OrderStatus.RECEIVED)
  const [status, setStatus] = useState('Բոլորը')

  const { filters, statusCounts, setFilters, searchOrders } =
    useContext(OrdersContext)

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

  useEffect(() => {
    setCounts(initialStatusCounts)
    statusCounts.forEach(({ status, count }) =>
      setCounts((prev) => ({ ...prev, [status]: count })),
    )
  }, [statusCounts])

  return (
    <Box className={styles.orderToolbar}>
      <Box className={styles.header}>
        <SectionHeader title="Պատվերներ" />
        <Button className={styles.addBtn} onClick={() => setIsOpen(true)}>
          Ավելացնել Պատվեր
        </Button>
      </Box>
      <Box className={styles.topBar}>
        {OrderStatuses.map((status) => (
          <Button
            key={status}
            className={tab === status ? styles.selectedButton : styles.button}
            onClick={() => handleFilter('tab', status)}
          >
            {status}
            <Typography className={styles.count}>
              {counts ? counts[status] : 0}
            </Typography>
          </Button>
        ))}
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
      {isSettingsOpen && (
        <OrderSettings onClose={() => setIsSettingsOpen(false)} />
      )}
    </Box>
  )
}

export default OrderToolbar
