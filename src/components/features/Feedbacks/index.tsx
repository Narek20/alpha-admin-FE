import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const Feedbacks: FC<IProps> = () => {
  return (
    <Box className={styles.feedbacks}>
      <SectionHeader title="Հետադարձ Կապ" />
    </Box>
  )
}

export default Feedbacks
