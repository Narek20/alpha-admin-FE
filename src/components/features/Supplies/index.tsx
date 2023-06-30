import { FC } from 'react'
import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'
import TableComponent from '@shared/Table'

import styles from './styles.module.scss'

interface IProps {}

const supplies = [
  {
    date: '23.06.23',
    storage: 'Երևան',
    qty: 23,
    status: 'Ընդունված է',
  },
  {
    date: '24.06.23',
    storage: 'Մարտունի',
    qty: 100,
    status: 'Չեղարկված է',
  },
  {
    date: '25.06.23',
    storage: 'Սևան',
    qty: 1,
    status: 'Սպասման մեջ է',
  },
  {
    date: '26.06.23',
    storage: 'Գեղարքունիք',
    qty: 12,
    status: 'Ընդունված է',
  },
  {
    date: '27.06.23',
    storage: 'Վայոց ձոր',
    qty: 234,
    status: 'Ընդունված է',
  },
]

const Supplies: FC<IProps> = () => {
  return (
    <Box className={styles.supplies}>
      <SectionHeader title="Պահեստ" />
      <Box className={styles.tableContainer}>
        <TableComponent
          data={supplies}
          columns={['Ամսաթիվ', 'Պահեստ', 'Ապրանքների քն․', 'Կարգավիճակ']}
        />
      </Box>
    </Box>
  )
}

export default Supplies
