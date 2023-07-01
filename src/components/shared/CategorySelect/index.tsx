import { FC } from 'react'
import { MenuItem, Select } from '@mui/material'

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
    <Select
      className={styles.select}
      value={category}
      onChange={(evt) => onChange(evt.target.value)}
    >
      {categories.map(({ category }) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </Select>
  )
}

export default CategorySelect
