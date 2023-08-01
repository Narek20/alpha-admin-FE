import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Box, Drawer, IconButton } from '@mui/material'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import logo from '@assets/images/alpha-logo.jpg'

import styles from './styles.module.scss'

type Anchor = 'top' | 'left' | 'bottom' | 'right'
interface IProps {
  isOpen: boolean
  children: ReactNode
  anchor: Anchor
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
  return (
    <Drawer
      className={styles.drawer}
      anchor={anchor}
      open={isOpen}
      variant={variant}
      onClose={onClose}
      classes={{
        paper: styles.drawerPaper,
      }}
    >
      <Box className={styles.drawerContent}>
        <div className={styles.drawerHeader}>
          <Link to="/" onClick={onClose}>
            <img className={styles.logo} src={logo} alt="logo" />
          </Link>
          <IconButton onClick={onClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        {children}
      </Box>
    </Drawer>
  )
}

export default DrawerComponent
