import { useState } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import StoreTable from '@features/StoreComponents/StoreTable'
import StoreAddModal from '@features/StoreComponents/AddStoreModal'
import StoreSettings from '@features/StoreComponents/StoreSettings'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

const Store = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <Box className={styles.storePage}>
      <Box className={styles.header}>
        <SectionHeader title="Վաճառքներ" />
        <Box className={styles.tools}>
          <IconButton
            className={styles.settings}
            onClick={() => setIsSettingsOpen(true)}
          >
            <SettingsIcon sx={{color: "white"}}/>
          </IconButton>
          <Button className={styles.addBtn} onClick={() => setIsOpen(true)}>
            Ավելացնել Վաճառք
          </Button>
        </Box>
      </Box>
      <Box className={styles.table}>
        <StoreTable />
      </Box>
      <StoreAddModal open={isOpen} onClose={() => setIsOpen(false)} />
      <StoreSettings
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </Box>
  )
}

export default Store
