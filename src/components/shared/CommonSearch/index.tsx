import { FC } from 'react'
import { Autocomplete, TextField } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {}

const CommonSearch: FC<IProps> = () => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      className={styles.search}
      options={[]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Որոնում" />}
    />
  )
}

export default CommonSearch
