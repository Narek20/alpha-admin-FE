import { FC } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { claspTypes } from '@utils/product/constants'

import styles from './styles.module.scss'

interface IProps {
  clasp: string
  onChange: (clasp: string) => void
}

const ClaspTypeSelect: FC<IProps> = ({ clasp, onChange }) => {
  return (
    <FormControl className={styles.form}>
      <InputLabel id="clasp-label">Ամրացումը</InputLabel>
      <Select
        labelId="clasp-label"
        label="Ամրացումը"
        className={styles.select}
        value={clasp}
        onChange={(evt) => onChange(evt.target.value)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        {claspTypes.map(({ clasp }) => (
          <MenuItem key={clasp} value={clasp}>
            {clasp}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ClaspTypeSelect
