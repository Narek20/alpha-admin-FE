import { useContext, useState } from 'react'
import { Box, Button } from '@mui/material'
import DriverCard from '@features/DriverComponents/DriverCard'
import SectionHeader from '@shared/SectionTitle'
import DriverAddModal from '@features/DriverComponents/DriverAddModal'
import { DriversContext } from 'contexts/driver.context'

import styles from './styles.module.scss'

const Drivers = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { drivers } = useContext(DriversContext)

  return (
    <Box className={styles.driversPage}>
      <Box className={styles.header}>
        <Box>
          <SectionHeader title="Առաքիչներ" />
        </Box>
        <Button className={styles.addBtn} onClick={() => setIsOpen(true)}>
          Ավելացնել Առաքիչ
        </Button>
      </Box>
      <Box className={styles.drivers}>
        {drivers.map((driver) => (
          <DriverCard key={driver.phone} {...driver} />
        ))}
      </Box>
      <DriverAddModal open={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  )
}

export default Drivers
