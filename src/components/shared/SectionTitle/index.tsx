import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import styles from './styles.module.scss'

interface IProps {
  title: string
}

const SectionHeader: FC<IProps> = ({ title }) => {
  return (
    <Box className={styles.header}>
      <Typography className={styles.title}>{title}</Typography>
    </Box>
  )
}

export default SectionHeader
