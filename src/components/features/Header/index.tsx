import { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Box, IconButton, Typography } from '@mui/material'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import ProfileDropDown from '@features/UserComponents/ProfileDropDown'
import logo from '@assets/images/alpha-logo.jpg'
import { navlinks } from '@utils/navbar/constants'
import { AuthContext } from 'contexts/auth.context'

import styles from './styles.module.scss'

const iconStyles = { color: '#f6c71e', width: 30, height: 30 }

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const { userData } = useContext(AuthContext)

  return (
    <Box className={styles.header}>
      <Box className={styles.leftSection}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <Box className={styles.links}>
          {navlinks.map(({ link, title }) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
              key={title}
              to={link}
            >
              {title}
            </NavLink>
          ))}
        </Box>
      </Box>
      <Box className={styles.rightSection}>
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
    </Box>
  )
}

export default Header
