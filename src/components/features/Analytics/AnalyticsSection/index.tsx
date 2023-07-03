import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import styles from './styles.module.scss'

interface IProps {
  title: string
  description: string
  image: string
  index: number
  link: string
}

const AnalyticsSection: FC<IProps> = ({
  title,
  link,
  description,
  image,
  index,
}) => {
  return (
    <Link to={link} className={styles.section}>
      <Box className={styles.info}>
        <Typography className={styles.title}>
          {`${index + 1}. ` + title}
        </Typography>
        <Typography className={styles.description}>{description}</Typography>
      </Box>
      <img className={styles.img} src={image} alt={"image" + index} />
    </Link>
  )
}

export default AnalyticsSection
