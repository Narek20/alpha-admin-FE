import { Box, Typography } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

const WeeklySales = () => {
  return (
    <Box>
      <SectionHeader title="2.Շաբաթական դինամիկա և վաճառքի վերլուծություն" />
      <Typography>
        Շրջանառությունը այն ժամանակահատվածն է, որի ընթացքում վաճառվում է
        պահեստում առկա ապրանքների միջին պաշարը: Որքան ցածր է շրջանառությունը
        օրերով, որքան քիչ ժամանակ է վաճառվում ապրանքների միջին մնացորդը, այնքան
        լավ է այս ցուցանիշը:
      </Typography>
    </Box>
  )
}

export default WeeklySales
