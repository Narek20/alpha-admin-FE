import { Box, Button } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'
import AnalyticLinkCard from '../AnalyticLinkCard'

import styles from './styles.module.scss'

const analyticsLinks = [
  {
    title: 'Ամենօրյա դինամիկա և վաճառքի անալիտիկա',
    link: 'analytics/',
    color: '#FEE0E0',
  },
  {
    title: 'Հաշվետվություն պահեստի մնացորդներով',
    link: 'analytics/warehouse-remains',
    color: '#DCEFDB',
  },
  {
    title: 'Վաճառք',
    link: 'analytics/sales',
    color: '#E4EAFF',
  },
  {
    title: 'ամփոփում վաճառողի կողմից',
    link: 'analytics/summary-report',
    color: '#FFECC7',
  },
]

const Analytics = () => {
  return (
    <Box className={styles.analytics}>
      <SectionHeader title="Անալիտիկա" />
      <Box className={styles.links}>
        {analyticsLinks.map((analyticsLink) => (
          <AnalyticLinkCard key={analyticsLink.title} {...analyticsLink} />
        ))}
      </Box>
      <Button>Բոլոր Հաշվետվությունները</Button>
    </Box>
  )
}

export default Analytics
