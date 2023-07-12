import { FC, useEffect, useState } from 'react'
import { Box, Slider, TextField } from '@mui/material'
import { ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

function valuetext(value: number) {
  return `${value} Դր․`
}

interface IProps {
  onChange?: (key: ProductKeys, filter: number[]) => void
}

const PriceFilter: FC<IProps> = ({ onChange }) => {
  const [value, setValue] = useState<number[]>([0, 100000])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
    if (onChange) {
      onChange(ProductKeys.PRICE, value as number[])
    }
  }

  return (
    <Box className={styles.priceFilter}>
      <Box className={styles.priceInputs}>
        <TextField
          label="Սկսած"
          className={styles.priceInput}
          onChange={(evt) => setValue([+evt.target.value, value[1]])}
        />
        <TextField
          label="Մինչև"
          className={styles.priceInput}
          onChange={(evt) => setValue([value[0], +evt.target.value])}
        />
      </Box>
      <Slider
        className={styles.slider}
        sx={{ color: '#f6c71e' }}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        min={1000}
        max={100000}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  )
}

export default PriceFilter
