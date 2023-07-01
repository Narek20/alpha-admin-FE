import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'
import TableComponent from '@shared/Table'

import styles from './styles.module.scss'

const turnovers = [
  {
    name: 'Ապրանք 1',
    turnover: '10%',
    qty: 10,
  },
  {
    name: 'Ապրանք 2',
    turnover: '20%',
    qty: 20,
  },
  {
    name: 'Ապրանք 3',
    turnover: '30%',
    qty: 30,
  },
  {
    name: 'Ապրանք 4',
    turnover: '2%',
    qty: 2,
  },
  {
    name: 'Ապրանք 5',
    turnover: '12%',
    qty: 2,
  },
  {
    name: 'Ապրանք 6',
    turnover: '16%',
    qty: 16,
  },
  {
    name: 'Ապրանք 7',
    turnover: '10%',
    qty: 10,
  },
  {
    name: 'Ապրանք 8',
    turnover: '5%',
    qty: 5,
  },
  {
    name: 'Ապրանք 9',
    turnover: '5%',
    qty: 5,
  },
]

const Turnover = () => {
  return (
    <Box className={styles.turnover}>
      <SectionHeader title="Շրջանառություն" />
      <Box className={styles.tableContainer}>
        <TableComponent
          data={turnovers.sort(
            (turnover, nextTurnover) => nextTurnover.qty - turnover.qty
          )}
          columns={['Ապրանք', 'Շրջանառություն', 'քանակ']}
        />
      </Box>
    </Box>
  )
}

export default Turnover
