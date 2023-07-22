import { Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'
import AnalyticsSection from '@features/Analytics/AnalyticsSection'
import { analyticsSections } from '@utils/analytics/constants'

import styles from './styles.module.scss'

const AnalyticsPage = () => {
  return (
    <Box className={styles.analyticsPage}>
      <SectionHeader title="Անալիտիկա" />
      <Box className={styles.sections}>
        {analyticsSections.map((section, index) => (
          <AnalyticsSection key={section.title} {...section} index={index} />
        ))}
      </Box>
    </Box>
  )
}

export default AnalyticsPage
