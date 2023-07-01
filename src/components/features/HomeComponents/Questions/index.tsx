import { Box, Button } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'
import koshik from '@assets/images/koshik.jpg'
import Question from '../Question'

import styles from './styles.module.scss'

const questions = [
  {
    question: 'Հիմա էսի ոնց հագնեմ',
    date: '20.06.2023',
    img: koshik,
  },
  {
    question: 'Քանիսա ցավդ տանեմ?',
    date: '21.06.2023',
    img: koshik,
  },
  {
    question: 'Քանի օրում կհասնի',
    date: '22.06.2023',
    img: koshik,
  },
  {
    question: 'Վայլդբերիսում կա',
    date: '23.06.2023',
    img: koshik,
  },
  {
    question: 'Լավնա բայց ելի եմ ուզում հիմա զակազ տամ?',
    date: '24.06.2023',
    img: koshik,
  },
  {
    question: 'Բողկս չի աճում ինչ անեմ',
    date: '25.06.2023',
    img: koshik,
  },
]

const Questions = () => {
  return (
    <Box className={styles.questions}>
      <SectionHeader title="Հարցեր" />
      <Box className={styles.questionsContainer}>
        {questions.map((question) => (
          <Question key={question.question} {...question} />
        ))}
      </Box>
      <Button className={styles.seeMore}>Բոլոր հարցերը</Button>
    </Box>
  )
}

export default Questions
