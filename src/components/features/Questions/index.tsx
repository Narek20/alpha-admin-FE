import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const Questions: FC<IProps> = () => {
  return (
    <Box className={styles.questions}>
      <SectionHeader title="Հարցեր" />
    </Box>
  )
}

export default Questions
