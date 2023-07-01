import { FC } from 'react'
import { MenuItem, Select } from '@mui/material'

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
    <Select
      className={styles.select}
      value={brand}
      onChange={(evt) => onChange(evt.target.value)}
    >
      {brands.map(({ brand }) => (
        <MenuItem key={brand} value={brand}>
          {brand}
        </MenuItem>
      ))}
    </Select>
  )
}

export default BrandSelect
