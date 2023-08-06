import { FC, useContext, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Modal,
  TextField,
  Button,
} from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useToast } from 'contexts/toast.context'
import { CategoriesContext } from 'contexts/category.context'
import { updateCategory } from 'services/category.service'
import { ICategory } from 'types/category.types'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const ProductSettings: FC<IProps> = ({ open, onClose }) => {
  const [category, setCategory] = useState<ICategory[]>([])
  const { showToast } = useToast()
  const { categories, getCategories } = useContext(CategoriesContext)

  const handleChange = (
    categoryTitle: string,
    value: string,
    fieldIndex: number
  ) => {
    const changedCategory = category.map((cat) =>
      cat.title === categoryTitle
        ? {
            ...cat,
            fields: cat.fields.map((field, index) =>
              index === fieldIndex ? { ...field, title: value } : field
            ),
          }
        : cat
    )

    setCategory(changedCategory)
  }

  const changeCategory = (value: string, categoryIndex: number) => {
    const changedCategory = category.map((cat, index) =>
      index === categoryIndex ? { ...cat, title: value } : cat
    )

    setCategory(changedCategory)
  }

  const handleSave = async () => {
    const data = await updateCategory(category)

    if (data.success) {
      showToast('success', data.message)
      getCategories()
      setCategory([])
      onClose()
    }
  }

  const addField = (categoryTitle: string) => {
    const updatedCategories = category.map((cat) =>
      cat.title === categoryTitle
        ? { ...cat, fields: [...cat.fields, { title: '', key: '' }] }
        : cat
    )

    setCategory(updatedCategories)
  }

  const handleAdd = () => {
    setCategory([...category, { title: '', fields: [{ title: '' }] }])
  }

  const removeCategory = (categoryTitle: string) => {
    const updatedCategories = category.filter(
      (category) => category.title !== categoryTitle
    )

    setCategory(updatedCategories)
  }

  const handleRemove = (categoryTitle: string, fieldTitle: string) => {
    const updatedCategories = category.map((cat) =>
      cat.title === categoryTitle
        ? {
            ...cat,
            fields: cat.fields.filter((field) => field.title !== fieldTitle),
          }
        : cat
    )

    setCategory(updatedCategories)
  }

  useEffect(() => {
    setCategory(categories)
  }, [categories])

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.header}>
          <Typography className={styles.title}>Կարգավորումներ</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box className={styles.content}>
          {category.map((cat, index) => (
            <Box key={index} className={styles.categoryContainer}>
              <Box>
                <TextField
                  value={cat.title}
                  variant="outlined"
                  onChange={(evt) => changeCategory(evt.target.value, index)}
                  className={styles.title}
                />
                <IconButton onClick={() => removeCategory(cat.title)}>
                  <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
                </IconButton>
              </Box>
              <Box className={styles.fields}>
                {cat.fields.map((field, idx) => (
                  <Box className={styles.field} key={idx}>
                    <TextField
                      value={field.title}
                      onChange={(evt) =>
                        handleChange(cat.title, evt.target.value, idx)
                      }
                    />
                    <IconButton
                      onClick={() => handleRemove(cat.title, field.title)}
                    >
                      <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  className={styles.addField}
                  onClick={() => addField(cat.title)}
                >
                  Ավելացնել դաշտ
                </Button>
              </Box>
            </Box>
          ))}
          <Button className={styles.addBtn} onClick={handleAdd}>
            Ավելացնել Կատեգորիա
          </Button>
          <Box className={styles.actions}>
            <Button className={styles.saveBtn} onClick={handleSave}>
              Փոփոխել
            </Button>
            <Button className={styles.cancelBtn} onClick={onClose}>
              Չեղարկել
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductSettings
