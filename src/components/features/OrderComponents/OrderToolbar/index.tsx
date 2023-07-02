import { useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import SectionHeader from '@shared/SectionTitle'
import { productStatuses } from '@utils/product/constants'

import styles from './styles.module.scss'

const OrderToolbar = () => {
  const [ordersType, setOrderType] = useState('all')
  console.log(ordersType)
  return (
    <Box className={styles.orderToolbar}>
      <Box className={styles.header}>
        <SectionHeader title="Պատվերներ" />
        <Button className={styles.addBtn}>Ավելացնել Պատվեր</Button>
      </Box>
      <Box className={styles.topBar}>
        <Button className={styles.button} onClick={() => setOrderType('all')}>
          Բոլոր պատվերները
        </Button>
        <Button
          className={styles.button}
          onClick={() => setOrderType('drafted')}
        >
          նախագծերը
        </Button>
        <Button className={styles.button}>Պատվերների նախագիծը</Button>
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
        <Select defaultValue={'Բոլորը'} className={styles.select}>
          {productStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
        <IconButton className={styles.settings}>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default OrderToolbar
