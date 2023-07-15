import { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  country: string
  onChange: (country: string) => void
}

const CountrySelect: FC<IProps> = ({ country, onChange }) => {
  return (
    <FormControl className={styles.form}>
      <InputLabel id="country-label">Արտադրված է</InputLabel>
      <Select
        labelId="country-label"
        label="Արտադրված է"
        className={styles.select}
        value={country}
        onChange={(evt) => onChange(evt.target.value)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        <MenuItem value="Հայաստան">Հայաստան</MenuItem>
        <MenuItem value="Չինաստան">Չինաստան</MenuItem>
        <MenuItem value="Ռուսաստան">Ռուսաստան</MenuItem>
      </Select>
    </FormControl>
  )
}

export default CountrySelect
