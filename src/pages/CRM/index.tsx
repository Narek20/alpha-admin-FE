import { Box } from '@mui/material'
import CustomersTable from '@features/CRM/CustomersTable'

import styles from './styles.module.scss'

const CRM = () => {
  return (
    <Box className={styles.crm}>
      <CustomersTable />
    </Box>
  )
}

export default CRM
