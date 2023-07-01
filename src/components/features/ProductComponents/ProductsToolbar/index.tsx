import { FC } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined'

import styles from './styles.module.scss'

interface IProps {
  isBig: boolean
  changeDisplay: (isBig: boolean) => void
}

const ProductsToolbar: FC<IProps> = ({ isBig, changeDisplay }) => {
  return (
    <Box className={styles.toolbar}>
      <Box className={styles.leftBar}>
        <IconButton onClick={() => changeDisplay(true)}>
          <GridViewOutlinedIcon sx={{ color: isBig ? '#f6c71e' : 'black' }} />
        </IconButton>
        <IconButton onClick={() => changeDisplay(false)}>
          <ViewCompactOutlinedIcon
            sx={{ color: isBig ? 'black' : '#f6c71e' }}
          />
        </IconButton>
      </Box>
      <Box className={styles.rightBar}>
        <Button className={styles.button}>Ավելացնել</Button>
        <Button className={styles.button}>Բոլոր ապրանքները</Button>
        <Button className={styles.button}>Առանց նկարի</Button>
        <Button className={styles.button}>նախագծեր</Button>
      </Box>
    </Box>
  )
}

export default ProductsToolbar
