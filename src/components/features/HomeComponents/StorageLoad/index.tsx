import { FC } from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'
import { indicatorColor, percentColor } from '@utils/storageLoad/constants'

import styles from './styles.module.scss'

interface IProps {}

const regions = [
  {
    title: 'Արմավիր',
    load: 12,
  },
  {
    title: 'Երևան',
    load: 90,
  },
  {
    title: 'Արտաշատ',
    load: 46,
  },
  {
    title: 'Արագածոտն',
    load: 58,
  },
  {
    title: 'Սյունիք',
    load: 24,
  },
  {
    title: 'Տավուշ',
    load: 98,
  },
  {
    title: 'Լոռի',
    load: 1,
  },
  {
    title: 'Գյումրի',
    load: 0,
  },
  {
    title: 'Գեղարքունիք',
    load: 100,
  },
  {
    title: 'Արարատ',
    load: 13,
  },
  {
    title: 'Վայոց Ձոր',
    load: 14,
  },
  {
    title: 'Վայոց Ձոր',
    load: 80,
  },
  {
    title: 'Վայոց Ձոր',
    load: 68,
  },
  {
    title: 'Վայոց Ձոր',
    load: 17,
  },
  {
    title: 'Վայոց Ձոր',
    load: 67,
  },
  {
    title: 'Վայոց Ձոր',
    load: 82,
  },
]

const StorageLoad: FC<IProps> = () => {
  return (
    <Box className={styles.storageLoad}>
      <SectionHeader title="Պատվերները ըստ հասցե դաշտի" />
      <Box className={styles.regions}>
        {regions.map(({ title, load }) => (
          <Box className={styles.region} key={title}>
            <Typography className={styles.title}>{title}</Typography>
            <Box className={styles.loadContainer}>
              <LinearProgress
                className={styles[indicatorColor(load)]}
                value={load}
                variant="determinate"
              />
              <Typography className={styles[percentColor(load)]}>
                {load}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default StorageLoad
