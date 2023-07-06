import { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import styles from './styles.module.scss'

const categories = [
  {
    category: 'Կոշիկ',
  },
  {
    category: 'Դանակ',
  },
  {
    category: 'Շապիկ',
  },
]

interface IProps {
  category: string
  onChange: (category: string) => void
}

const CategorySelect: FC<IProps> = ({ category, onChange }) => {
  return (
    <FormControl className={styles.form}>
      <InputLabel id="type-label">Տիպը</InputLabel>
      <Select
        labelId="type-label"
        label="Տիպը"
        className={styles.select}
        placeholder="Տիպը"
        value={category}
        onChange={(evt) => onChange(evt.target.value)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        {categories.map(({ category }) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CategorySelect
