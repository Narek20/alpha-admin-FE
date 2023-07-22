import { FC, useContext } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { CategoriesContext } from 'contexts/category.context'

import styles from './styles.module.scss'

interface IProps {
  category: string
  onChange: (category: string) => void
}

const CategorySelect: FC<IProps> = ({ category, onChange }) => {
  const { categories } = useContext(CategoriesContext)

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      className={styles.search}
      options={categories.map((category) => category.title)}
      onChange={(_, value) => onChange(value || '')}
      value={category || ''}
      renderInput={(params) => <TextField {...params} label="Կատեգորիա" />}
    />
  )
}

export default CategorySelect
