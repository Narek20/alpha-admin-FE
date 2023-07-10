import React, { FC } from 'react'
import { TextField } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  name: string
  onChange: (name: string) => void
}

const NameSearch: FC<IProps> = ({ name, onChange }) => {
  return (
    <TextField
      value={name}
      className={styles.search}
      onChange={(evt) => onChange(evt.target.value)}
    />
  )
}

export default NameSearch
