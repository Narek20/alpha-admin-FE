import { useState } from 'react'
import { Box } from '@mui/material'
import NameSearch from '@shared/NameSearch'

import styles from './styles.module.scss'

const NameFilter = () => {
  const [searchKey, setSearchKey] = useState('')

  return (
    <Box className={styles.nameFilter}>
      <NameSearch name={searchKey} onChange={setSearchKey} />
    </Box>
  )
}

export default NameFilter
