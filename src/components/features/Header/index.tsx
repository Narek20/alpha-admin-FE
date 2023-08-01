import { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  Box,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import OrderAddModal from '@features/OrderComponents/AddOrderModal'
import ProfileDropDown from '@features/UserComponents/ProfileDropDown'
import logo from '@assets/images/alpha-logo.jpg'
import { navlinks } from '@utils/navbar/constants'
import DrawerComponent from '@shared/Drawer'
import { AuthContext } from 'contexts/auth.context'

import styles from './styles.module.scss'

const iconStyles = { color: '#f6c71e', width: 30, height: 30 }

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down(1000))
  const { userData } = useContext(AuthContext)

  return (
    <Box className={styles.header}>
      {!isTablet ? (
        <Box className={styles.leftSection}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="logo" />
          </Link>
          <Box className={styles.links}>
            {navlinks.map(({ link, title }) =>
              title === 'Անալիտիկա' && !userData?.isAdmin ? null : (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                  }
                  key={title}
                  to={link}
                >
                  {title}
                </NavLink>
              ),
            )}
          </Box>
        </Box>
      ) : (
        <IconButton onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}
      <Box className={styles.rightSection}>
        <Button className={styles.addOrder} onClick={() => setIsOpen(true)}>
          Ավելացնել Պատվեր
        </Button>
        <IconButton className={styles.icon}>
          <HelpOutlineOutlinedIcon sx={iconStyles} />
        </IconButton>
        <Box
          className={styles.accountIcon}
          onMouseEnter={() => setIsDropDownOpen(true)}
          onMouseLeave={() => setIsDropDownOpen(false)}
        >
          <Typography className={styles.userName}>
            {userData?.fullName}
          </Typography>
        </Box>
      </Box>
      <ProfileDropDown isOpen={isDropDownOpen} />
      <OrderAddModal open={isOpen} onClose={() => setIsOpen(false)} />
      <DrawerComponent
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        anchor="left"
        variant="temporary"
      >
        <Box className={styles.links}>
          {navlinks.map((navlink) =>
            navlink.title === 'Անալիտիկա' && !userData?.isAdmin ? null : (
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.link
                }
                key={navlink.title}
                to={navlink.link}
                onClick={() => setIsDrawerOpen(false)}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                  }}
                >
                  <navlink.icon />
                  <Typography>{navlink.title}</Typography>
                </Box>
              </NavLink>
            ),
          )}
        </Box>
      </DrawerComponent>
    </Box>
  )
}

export default Header
