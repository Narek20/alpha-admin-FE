import { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  gender: string
  onChange: (gender: string) => void
}

const GenderSelect: FC<IProps> = ({ gender, onChange }) => {
  return (
    <FormControl className={styles.form}>
      <InputLabel id="gender-label">Սեռը</InputLabel>
      <Select
        labelId="gender-label"
        label="Սեռը"
        className={styles.select}
        value={gender}
        onChange={(evt) => onChange(evt.target.value)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        <MenuItem value="Արական">Արական</MenuItem>
        <MenuItem value="Իգական">Իգական</MenuItem>
      </Select>
    </FormControl>
  )
}

export default GenderSelect
