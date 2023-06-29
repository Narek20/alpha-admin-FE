import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const Notes: FC<IProps> = () => {
  return (
    <Box className={styles.notes}>
      <SectionHeader title="Նշումներ" />
    </Box>
  )
}

export default Notes
