import { FC, useContext, useEffect, useState } from 'react'
import { Box, Typography, IconButton, Modal, TextField, Button } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { CategoriesContext } from 'contexts/category.context'
import { ICategory } from 'types/category.types'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const ProductSettings: FC<IProps> = ({ open, onClose }) => {
  const [category, setCategory] = useState<ICategory[]>([])

  const { categories } = useContext(CategoriesContext)

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
          {category.map((category) => (
            <Box className={styles.categoryContainer}>
              <Typography className={styles.title}>{category.title}</Typography>
              <Box className={styles.fields}>
                {category.fields.map((field) => (
                  <Box className={styles.field} key={field.title}>
                    <TextField value={field.title} />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
          <Box>
            <Button></Button>
            <Button></Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProductSettings
