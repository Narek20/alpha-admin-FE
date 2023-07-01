import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined'
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined'

import styles from './styles.module.scss'

interface IProps {
  feedback: string
  rate: number
  date: string
  img: string
}

const rateNumbers = [1, 2, 3, 4, 5]

const Feedback: FC<IProps> = ({ feedback, img, rate, date }) => {
  const rateStarts = rateNumbers.map((num, index) => {
    if (rate > num && rate < rateNumbers[index + 1]) {
      return <StarHalfOutlinedIcon sx={{ color: '#FF773C' }} />
    }

    if (num <= rate) {
      return <StarOutlinedIcon sx={{ color: '#FF773C' }} />
    }

    return <StarBorderPurple500OutlinedIcon sx={{ color: '#FF773C' }} />
  })

  return (
    <Box className={styles.feedbackContainer}>
      <img className={styles.img} src={img} alt="feedback_img" />
      <Box className={styles.feedback}>
        <Box className={styles.stars}>
          {rateStarts.map((star, index) => (
            <React.Fragment key={index}>{star}</React.Fragment>
          ))}
        </Box>
        <Typography className={styles.date}>{date}</Typography>
        <Typography className={styles.feedbackText}>{feedback}</Typography>
      </Box>
    </Box>
  )
}

export default Feedback
