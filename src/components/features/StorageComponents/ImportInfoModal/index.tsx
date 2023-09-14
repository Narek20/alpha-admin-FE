import { FC } from 'react'
import { Box, Typography, IconButton, Modal } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { IStorageImport } from 'types/storage.types'

import styles from './styles.module.scss'

interface IProps {
  importData: IStorageImport
  onClose: () => void
}

const ImportInfoModal: FC<IProps> = ({ importData, onClose }) => {
  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <Box className={styles.modalContent}>
        <Box className={styles.header}>
          <Typography className={styles.title}>Ներկրման ինֆորմացիան</Typography>
          <IconButton onClick={onClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box className={styles.infoContainer}>
          <Box className={styles.info}>
            <Typography className={styles.label}>Պահեստ։ </Typography>
            <Typography className={styles.value}>{importData.title}</Typography>
          </Box>
          <Box className={styles.info}>
            <Typography className={styles.label}>Ներկրման օրը: </Typography>
            <Typography className={styles.value}>
              {importData.importDate}
            </Typography>
          </Box>
          <Box className={styles.info}>
            <Typography className={styles.label}>Ապրանքը: </Typography>
            <Typography className={styles.value}>
              {importData.product}
            </Typography>
          </Box>
          <Box className={styles.info}>
            <Typography className={styles.label}>Քանակը: </Typography>
            <Typography className={styles.value}>
              {importData.quantity} Հատ
            </Typography>
          </Box>
          <Box className={styles.info}>
            <Typography className={styles.label}>Չափսը: </Typography>
            <Typography className={styles.value}>
              {importData.size}
            </Typography>
          </Box>
          <Box className={styles.info}>
            <Typography className={styles.label}>Ներկրողը։ </Typography>
            <Typography className={styles.value}>
              {importData.user?.fullName}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ImportInfoModal
