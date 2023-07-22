import { FC } from 'react'
import { TextField } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  country: string
  onChange: (country: string) => void
}

const CountrySelect: FC<IProps> = ({ country, onChange }) => {
  return (
    <TextField
      label="Արտադրված է"
      value={country}
      onChange={(evt) => onChange(evt.target.value)}
    />
  )
}

export default CountrySelect
