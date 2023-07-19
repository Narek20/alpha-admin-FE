import { FC, useContext } from 'react'
import { DriversContext } from 'contexts/driver.context'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  driver: string
  onChange: (driver: string) => void
}

const DriverSelect: FC<IProps> = ({ driver, onChange }) => {
  const { drivers } = useContext(DriversContext)
  return (
    <FormControl className={styles.form}>
      <InputLabel id="brand-label">Առաքիչ</InputLabel>
      <Select
        labelId="brand-label"
        label="Առաքիչ"
        className={styles.select}
        value={driver}
        onChange={(evt) => onChange(evt.target.value)}
        MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
      >
        {drivers.map(({ fullName, phone }) => (
          <MenuItem key={phone} value={fullName}>
            {fullName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DriverSelect
