import { FC, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { Box, Typography, Select, MenuItem, Button } from '@mui/material'
import armeniaIcon from '@assets/images/armenia.png'
import russianIcon from '@assets/images/russia.png'
import { AuthContext } from 'contexts/auth.context'

import styles from './styles.module.scss'

interface IProps {
  isOpen: boolean
}

const iconStyles = { width: 30, height: 30, marginRight: 10 }

const ProfileDropDown: FC<IProps> = ({ isOpen }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [language, setLanguage] = useState('AM')

  const { userData, setUserData } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleExit = () => {
    setUserData(null)
    localStorage.removeItem('token')
  }

  return (
    <Box
      className={isOpen || isHovered ? styles.dropDown : styles.hidden}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box className={styles.header}>
        <Typography className={styles.profileTitle}>Պրոֆիլ</Typography>
        {userData?.isAdmin && (
          <Button
            className={styles.settings}
            onClick={() => navigate('/settings')}
          >
            Կարգավորումներ
          </Button>
        )}
      </Box>
      <Box className={styles.content}>
        <hr />
        <Select
          className={styles.select}
          sx={{ display: isOpen || isHovered ? 'flex' : 'none' }}
          value={language}
          onChange={(evt) => setLanguage(evt.target.value as string)}
        >
          <MenuItem value="AM">
            <img style={iconStyles} src={armeniaIcon} alt="icon" />
            <Typography>AM</Typography>
          </MenuItem>
          <MenuItem value="EN">
            <img style={iconStyles} src={russianIcon} alt="icon" />
            <Typography>RU</Typography>
          </MenuItem>
        </Select>
        <hr />
        <Button className={styles.exit} onClick={handleExit}>
          Ելք
        </Button>
        <Box></Box>
      </Box>
    </Box>
  )
}

export default ProfileDropDown
