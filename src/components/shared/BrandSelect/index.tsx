import { FC } from 'react'
import { TextField } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  brand: string
  onChange: (brand: string) => void
}

const BrandSelect: FC<IProps> = ({ brand, onChange }) => {
  return (
    <TextField
      label="Բրենդ"
      value={brand}
      onChange={(evt) => onChange(evt.target.value)}
    />
  )
}

export default BrandSelect
