import { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  season: string
  onChange: (season: string) => void
}

const SeasonSelect: FC<IProps> = ({ season, onChange }) => {
  return (
    <FormControl className={styles.form}>
      <InputLabel id="season-label">Սեզոնը</InputLabel>
      <Select
        labelId="season-label"
        label="Սեզոնը"
        className={styles.select}
        value={season}
        onChange={(evt) => onChange(evt.target.value)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        <MenuItem value="Ամառ">Ամառ</MenuItem>
        <MenuItem value="Ձմեռ">Ձմեռ</MenuItem>
        <MenuItem value="շրջտարյա">շրջտարյա</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SeasonSelect
