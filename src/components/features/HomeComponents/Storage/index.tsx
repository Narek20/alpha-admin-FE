import { FC } from 'react'
import { Box } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {}

const Storage: FC<IProps> = () => {
  return <Box className={styles.storage}>Storage</Box>
}

export default Storage
