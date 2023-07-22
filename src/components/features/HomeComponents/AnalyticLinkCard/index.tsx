import { FC } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography/Typography'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'

import styles from './styles.module.scss'

interface IProps {
  title: string
  link: string
  color: string
}

const AnalyticLinkCard: FC<IProps> = ({ title, link, color }) => {
  return (
    <Link
      className={styles.linkContainer}
      to={link}
      style={{
        background: color,
      }}
    >
      <Typography className={styles.title}>
        {title}
        <ArrowForwardIosOutlinedIcon sx={{ width: 10, height: 10 }} />
      </Typography>
    </Link>
  )
}

export default AnalyticLinkCard
