import { Box, Button } from '@mui/material'
import Feedback from '@features/HomeComponents/Feedback'
import SectionHeader from '@shared/SectionTitle'
import koshik from '@assets/images/koshik.jpg'

import styles from './styles.module.scss'

const feedbacks = [
  {
    feedback: 'Շատ լավ կոշիկա',
    rate: 4.7,
    date: '20.06.2023',
    img: koshik,
  },
  {
    feedback: 'Կոշիկ',
    rate: 4,
    date: '21.06.2023',
    img: koshik,
  },
  {
    feedback: 'good good',
    rate: 5,
    date: '22.06.2023',
    img: koshik,
  },
  {
    feedback: 'Կայֆ',
    rate: 4,
    date: '23.06.2023',
    img: koshik,
  },
  {
    feedback: 'Ճղվածա եկելsssssssssssssssssssssssssssssssssssssssssssssssss',
    rate: 1,
    date: '24.06.2023',
    img: koshik,
  },
  {
    feedback: 'Good Good',
    rate: 3,
    date: '25.06.2023',
    img: koshik,
  },
]

const Feedbacks = () => {
  return (
    <Box className={styles.feedbacks}>
      <SectionHeader title="Հետադարձ Կապ" />
      <Box className={styles.feedbacksContainer}>
        {feedbacks.map((feedback) => (
          <Feedback key={feedback.feedback} {...feedback} />
        ))}
      </Box>
    </Box>
  )
}

export default Feedbacks
