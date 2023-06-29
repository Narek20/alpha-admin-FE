import { FC, useEffect, ReactNode } from 'react'
import { Box, Drawer, IconButton } from '@mui/material'
import ChevronRight from '@mui/icons-material/ChevronRight'

import styles from './styles.module.scss'

interface IProps {
  isOpen: boolean
  children: ReactNode
  anchor?: 'left' | 'right' | 'top' | 'bottom'
  variant?: 'permanent' | 'persistent' | 'temporary'
  onClose: () => void
}

const DrawerComponent: FC<IProps> = ({
  isOpen,
  anchor,
  onClose,
  variant,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }
  }, [isOpen])

  return (
    <Drawer
      className={styles.drawer}
      variant={variant}
      anchor={anchor}
      open={isOpen}
      classes={{
        paper: styles.drawerPaper,
      }}
    >
      <Box className={styles.drawerContent}>
        <div className={styles.drawerHeader}>
          <IconButton onClick={onClose}>
            <ChevronRight sx={{ color: 'black' }} />
          </IconButton>
        </div>
        {children}
      </Box>
    </Drawer>
  )
}

export default DrawerComponent
