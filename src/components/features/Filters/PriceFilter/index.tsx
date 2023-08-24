import { FC, useEffect, useRef, useState } from 'react'
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
  const timeout = useRef<NodeJS.Timeout>()

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  useEffect(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      if (onChange) {
        onChange(ProductKeys.PRICE, value as number[])
        console.log('fetching')
      }
    }, 1000)
  }, [value])

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
        sx={{ color: 'black' }}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        step={100}
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
