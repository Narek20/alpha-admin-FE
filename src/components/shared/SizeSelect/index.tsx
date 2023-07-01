import { FC } from 'react'
import { MenuItem, Select } from '@mui/material'

import styles from './styles.module.scss'

const sizes = [
  {
    size: 'Макс-Кар',
  },
  {
    size: 'Alpha Milit',
  },
  {
    size: 'Pahest',
  },
]

interface IProps {
  size: string
  onChange: (size: string) => void
}

const SizeSelect: FC<IProps> = ({ size, onChange }) => {
  return (
    <Select
      className={styles.select}
      value={size}
      onChange={(evt) => onChange(evt.target.value)}
    >
      {sizes.map(({ size }) => (
        <MenuItem key={size} value={size}>
          {size}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SizeSelect
