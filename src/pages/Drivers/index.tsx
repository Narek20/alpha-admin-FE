import { useContext, useState } from 'react'
import { Box, Button } from '@mui/material'
import DriverCard from '@features/DriverComponents/DriverCard'
import SectionHeader from '@shared/SectionTitle'
import DriverAddModal from '@features/DriverComponents/DriverAddModal'
import { AuthContext } from 'contexts/auth.context'
import { DriversContext } from 'contexts/driver.context'
import { UserStatus } from 'types/user.types'

import styles from './styles.module.scss'

const Drivers = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { drivers } = useContext(DriversContext)
  const { userData } = useContext(AuthContext)

  return (
    <Box className={styles.driversPage}>
      <Box className={styles.header}>
        <Box>
          <SectionHeader title="Առաքիչներ" />
        </Box>
        {userData?.status !== UserStatus.USER && (
          <Button className={styles.addBtn} onClick={() => setIsOpen(true)}>
            Ավելացնել Առաքիչ
          </Button>
        )}
      </Box>
      <Box className={styles.drivers}>
        {drivers.map((driver) => (
          <DriverCard key={driver.phone} {...driver} />
        ))}
      </Box>
      {isOpen && <DriverAddModal onClose={() => setIsOpen(false)} />}
    </Box>
  )
}

export default Drivers
