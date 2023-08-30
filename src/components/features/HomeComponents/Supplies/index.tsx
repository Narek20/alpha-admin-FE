import { FC, useContext } from 'react'
import { Box } from '@mui/material'
import StorageTable from '@features/ProductComponents/StorageTable'
import SectionHeader from '@shared/SectionTitle'
import { StorageContext } from 'contexts/storage.context'

import styles from './styles.module.scss'

interface IProps {}

const Supplies: FC<IProps> = () => {
  const { storageImports } = useContext(StorageContext)

  return (
    <Box className={styles.supplies}>
      <SectionHeader title="Պահեստ" />
      <Box className={styles.tableContainer}>
        <StorageTable
          data={storageImports}
          columns={['Պահեստ', 'Ապրանք', 'Ամսաթիվ']}
        />
      </Box>
    </Box>
  )
}

export default Supplies
