import { FC, useState } from 'react'
import { Box, Typography } from '@mui/material'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'

import styles from './styles.module.scss'

interface IProps {
  title: string
  children: JSX.Element
}

const SidebarFilterSkillet: FC<IProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Box className={styles.filterSkillet}>
      <Box className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <Typography className={styles.title}>{title}</Typography>
        <ArrowBackIosNewOutlinedIcon
          className={isOpen ? styles.arrow : styles.bottomArrow}
        />
      </Box>
      {isOpen && <Box className={styles.filter}>{children}</Box>}
    </Box>
  )
}

export default SidebarFilterSkillet
