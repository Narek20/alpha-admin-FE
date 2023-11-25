import { FC, useState, useEffect } from 'react'
import { Box, TextField, Button, IconButton } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { DndContext, closestCenter } from '@dnd-kit/core'
import SectionHeader from '@shared/SectionTitle'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Sizes } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  sizes: Sizes[]
  addSize: () => void
  handleSizeChange: (sizes: Sizes[], color?: string) => void
}

interface ISizeComponentProps {
  size: Sizes
  index: number
  maxId: number
  handleChange: (
    sizeType: 'size' | 'smSize',
    index: number,
    value: string,
  ) => void
  removeSize: (index: number) => void
}

const SizeComponent: FC<ISizeComponentProps> = ({
  size,
  index,
  maxId,
  handleChange,
  removeSize,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: +size.size ? +size.size : maxId })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  } 
  

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.sizeContainer}
    >
      <TextField
        label="Չափսը"
        value={size.size}
        onChange={(evt) => handleChange('size', index, evt.target.value)}
      />
      <TextField
        label="Չափսը (սմ․)"
        value={size.smSize}
        onChange={(evt) => handleChange('smSize', index, evt.target.value)}
      />
      <IconButton onClick={() => removeSize(index)}>
        <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
      </IconButton>
    </Box>
  )
}

const NewProductSizes: FC<IProps> = ({ sizes, addSize, handleSizeChange }) => {
  const [maxId, setMaxId] = useState(0)

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

  const onDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id === over.id) {
      return
    }

    const oldIndex = sizes.findIndex((size) => +size.size == active.id)
    const newIndex = sizes.findIndex((size) => +size.size == over.id)

    handleSizeChange([...arrayMove(sizes, oldIndex, newIndex)])
  }

  useEffect(() => {
    let maxId = 0
    sizes.forEach((size) => {
      if (+size.size > maxId) {
        maxId = +size.size
      }
    })

    setMaxId(maxId + 1)
  }, [sizes])
  console.log(maxId)
  return (
    <>
      <SectionHeader title="Չափսերը" />
      <Box className={styles.sizes}>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={sizes.map((size) => ({
              ...size,
              id: +size.size ? +size.size : maxId,
            }))}
            strategy={verticalListSortingStrategy}
          >
            {sizes.map((elem, index) => (
              <SizeComponent
                key={index}
                size={elem}
                maxId={maxId}
                index={index}
                handleChange={handleChange}
                removeSize={removeSize}
              />
            ))}
          </SortableContext>
        </DndContext>
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
