import { Box, Typography } from '@mui/material'
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';

import styles from './styles.module.scss'

const EmptyResults = () => {
  return (
    <Box className={styles.emptyResults}>
      <Typography className={styles.text}>Արդյունքներ չեն գտնվել</Typography>
      <SearchOffOutlinedIcon />
    </Box>
  )
}

export default EmptyResults