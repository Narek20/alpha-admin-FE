import { useState } from 'react'
import { Box } from '@mui/material'
import SizeSelect from '@shared/SizeSelect'

const SizeFilter = () => {
  const [size, setSize] = useState<string | string[]>([])

  return (
    <Box>
      <SizeSelect size={size} onChange={setSize} />
    </Box>
  )
}

export default SizeFilter
