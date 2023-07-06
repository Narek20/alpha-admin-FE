import { FC, useState } from 'react'
import { Box } from '@mui/material'
import SizeSelect from '@shared/SizeSelect'
import { ProductKeys } from 'types/product.types'

interface IProps {
  onChange?: (key: ProductKeys, filter: string | string[]) => void
}

const SizeFilter: FC<IProps> = ({ onChange }) => {
  const [size, setSize] = useState<string | string[]>([])

  const handleChange = (value: string | string[]) => {
    if (onChange) onChange(ProductKeys.SIZES, value)
    setSize(value)
  }

  return (
    <Box>
      <SizeSelect size={size} onChange={handleChange} />
    </Box>
  )
}

export default SizeFilter
