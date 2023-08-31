import { FC, useContext } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { DriversContext } from 'contexts/driver.context'

import styles from './styles.module.scss'

interface IProps {
  driver?: string
  onChange: (driver: string) => void
}

const DriverSelect: FC<IProps> = ({ driver, onChange }) => {
  const { drivers } = useContext(DriversContext)
  
  return (
    <Autocomplete
      noOptionsText="Ոչինչ չի գտնվել"
      disablePortal
      id="combo-box-demo"
      className={styles.driver}
      options={drivers.map((product) => product.fullName)}
      onChange={(_, value) => onChange(value as string)}
      value={driver}
      renderInput={(params) => <TextField {...params} label="Առաքիչ" />}
    />
  )
}

export default DriverSelect
