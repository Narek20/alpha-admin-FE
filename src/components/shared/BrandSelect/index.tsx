import { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import styles from './styles.module.scss'

const brands = [
  {
    brand: 'Макс-Кар',
  },
  {
    brand: 'Alpha Milit',
  },
  {
    brand: 'Pahest',
  },
]

interface IProps {
  brand: string
  onChange: (brand: string) => void
}

const BrandSelect: FC<IProps> = ({ brand, onChange }) => {
  return (
    <FormControl className={styles.form}>
      <InputLabel id="brand-label">Բրենդը</InputLabel>
      <Select
        labelId="brand-label"
        label="Բրենդը"
        className={styles.select}
        value={brand}
        onChange={(evt) => onChange(evt.target.value)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        {brands.map(({ brand }) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default BrandSelect
