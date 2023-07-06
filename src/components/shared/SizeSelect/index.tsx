import { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import styles from './styles.module.scss'

const sizes = Array.from({ length: 31 }, (_, index) => index + 30 + '')

interface IProps {
  size: string[] | string
  onChange: (size: string[] | string) => void
}

const SizeSelect: FC<IProps> = ({ size, onChange }) => {
  return (
    <FormControl className={styles.form}>
      <InputLabel id="size-label">Չափսերը</InputLabel>
      <Select
        labelId="size-label"
        label="Չափսերը"
        className={styles.select}
        value={size}
        multiple
        onChange={(evt) => onChange(evt.target.value)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SizeSelect
