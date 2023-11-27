import { FC, useCallback, useEffect, useState } from 'react'
import { Box, TextField, Button, IconButton } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SectionHeader from '@shared/SectionTitle'
import { SortableList } from '@shared/SortableList'
import { Sizes } from 'types/product.types'

import styles from './styles.module.scss'

interface IProductSizeProps {
  id: string
  size: string
  smSize?: string
  handleChange: (sizeType: 'size' | 'smSize', id: string, value: string) => void
  removeSize: (id: string) => void
}

const ProductSize: FC<IProductSizeProps> = ({
  id,
  size,
  smSize,
  handleChange,
  removeSize,
}) => {
  return (
    <Box key={id} className={styles.sizeContainer}>
      <TextField
        label="Չափսը"
        value={size}
        onChange={(evt) => handleChange('size', id, evt.target.value)}
      />
      <TextField
        label="Չափսը (սմ․)"
        value={smSize}
        onChange={(evt) => handleChange('smSize', id, evt.target.value)}
      />
      <IconButton onClick={() => removeSize(id)}>
        <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
      </IconButton>
    </Box>
  )
}

interface IProps {
  sizes: Sizes[]
  handleSizeChange: (sizes: Sizes[], color?: string) => void
}

const NewProductSizes: FC<IProps> = ({ sizes, handleSizeChange }) => {
  const [sizesWithId, setSizesWithId] = useState(
    sizes.map((el) => ({ ...el, id: Math.random().toString() + Date.now() })),
  )

  useEffect(() => {
    handleSizeChange(sizesWithId.map(({ id, ...size }) => size))
  }, [sizesWithId])

  const handleChange = useCallback(
    (sizeType: 'size' | 'smSize', id: string, value: string) => {
      setSizesWithId((prev) =>
        prev.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              [sizeType]: value,
            }
          }

          return elem
        }),
      )
    },
    [],
  )

  const removeSize = useCallback((id: string) => {
    setSizesWithId((prev) => prev.filter((el) => el.id !== id))
  }, [])

  const addSize = () => {
    setSizesWithId((prev) => [
      ...prev,
      {
        id: Math.random().toString() + Date.now(),
        size: '',
        smSize: '',
      },
    ])
  }

  return (
    <>
      <SectionHeader title="Չափսերը" />
      <Box className={styles.sizes}>
        <SortableList
          items={sizesWithId}
          renderItem={(item) => (
            <SortableList.Item id={item.id}>
              <ProductSize
                {...item}
                handleChange={handleChange}
                removeSize={removeSize}
              />
              <SortableList.DragHandle />
            </SortableList.Item>
          )}
          onChange={(newItems) => setSizesWithId(newItems)}
        />
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
