import { useState } from 'react'
import { Box, Slider, TextField } from '@mui/material'

import styles from './styles.module.scss'

function valuetext(value: number) {
  return `${value} Դր․`
}

const PriceFilter = () => {
  const [value, setValue] = useState<number[]>([0, 50000])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <Box className={styles.priceFilter}>
      <Box className={styles.priceInputs}>
        <TextField label="Սկսած" className={styles.priceInput} />
        <TextField label="Մինչև" className={styles.priceInput} />
      </Box>
      <Slider
        className={styles.slider}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  )
}

export default PriceFilter
