import { FC } from 'react'
import { Box, Typography } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  question: string
  date: string
  img: string
}

const Question: FC<IProps> = ({ question, img, date }) => {
  return (
    <Box className={styles.questionContainer}>
      <img className={styles.img} src={img} alt="question_img" />
      <Box className={styles.question}>
        <Typography className={styles.questionText}>{question}</Typography>
        <Typography className={styles.date}>{date}</Typography>
      </Box>
    </Box>
  )
}

export default Question
