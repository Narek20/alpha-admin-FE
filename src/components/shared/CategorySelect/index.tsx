import { FC, useContext } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { CategoriesContext } from 'contexts/category.context'

import styles from './styles.module.scss'

interface IProps {
  multiple?: boolean
  category?: string
  selectedCategories?: string[]
  onCategoryChange?: (category: string) => void
  onCategoriesChange?: (categories: string[]) => void
}

const CategorySelect: FC<IProps> = ({
  multiple,
  category,
  selectedCategories,
  onCategoryChange,
  onCategoriesChange,
}) => {
  const { categories } = useContext(CategoriesContext)

  return (
    <Autocomplete
      noOptionsText="Ոչինչ չի գտնվել"
      disablePortal
      id="combo-box-demo"
      multiple={multiple}
      className={styles.search}
      options={categories.map((category) => category.title)}
      onChange={(_, value) =>
        multiple && onCategoriesChange
          ? onCategoriesChange(value as string[])
          : onCategoryChange && onCategoryChange(value as string)
      }
      value={multiple ? selectedCategories : category}
      renderInput={(params) => <TextField {...params} label="Կատեգորիա" />}
    />
  )
}

export default CategorySelect
