import { FC } from 'react'
import { Box, TextField, Button, IconButton } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SectionHeader from '@shared/SectionTitle'
import { Sizes } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  sizes: Sizes[]
  addSize: () => void
  handleSizeChange: (sizes: Sizes[], color?: string) => void
}

const NewProductSizes: FC<IProps> = ({ sizes, addSize, handleSizeChange }) => {
  const handleChange = (
    sizeType: 'size' | 'smSize',
    index: number,
    value: string,
  ) => {
    handleSizeChange(
      sizes.map((elem, ind) => {
        if (ind === index) {
          return {
            ...elem,
            [sizeType]: value,
          }
        }

        return elem
      }),
    )
  }

  const removeSize = (index: number) => {
    handleSizeChange(sizes.filter((_, i) => i !== index))
  }

  return (
    <>
      <SectionHeader title="Չափսերը" />
      <Box className={styles.sizes}>
        {sizes.map((elem, index) => (
          <Box key={index} className={styles.sizeContainer}>
            <TextField
              label="Չափսը"
              value={elem.size}
              onChange={(evt) => handleChange('size', index, evt.target.value)}
            />
            <TextField
              label="Չափսը (սմ․)"
              value={elem.smSize}
              onChange={(evt) =>
                handleChange('smSize', index, evt.target.value)
              }
            />
            <IconButton onClick={() => removeSize(index)}>
              <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
            </IconButton>
          </Box>
        ))}
        <Button
          className={styles.addBtn}
          onClick={(e) => {
            e.currentTarget.scrollIntoView({ behavior: 'smooth' })
            addSize()
          }}
        >
          Ավելացնել չափս
        </Button>
      </Box>
    </>
  )
}

export default NewProductSizes
