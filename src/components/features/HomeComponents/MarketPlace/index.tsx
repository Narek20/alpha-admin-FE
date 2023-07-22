import { FC, useState, useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import SectionHeader from '@shared/SectionTitle'

import styles from './styles.module.scss'

interface IProps {}

const marketPlaceData = {
  averageTime: 40,
  sold: 12,
  tasks: [
    {
      title: 'Նորեր',
      amount: 10,
    },
    {
      title: 'Փաթեթավորվում են',
      amount: 1,
    },
    {
      title: 'Ճանապարհին են',
      amount: 3,
    },
    {
      title: 'Սորտավորվում են',
      amount: 4,
    },
    {
      title: 'Կրկին առաքումվում են',
      amount: 1,
    },
  ],
}

const MarketPlace: FC<IProps> = () => {
  const [offset, setOffset] = useState(0)
  const shippingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shippingRef.current) {
      setOffset(
        (+shippingRef.current?.offsetWidth / 100) * marketPlaceData.averageTime
      )
    }
  }, [shippingRef.current?.offsetWidth])

  return (
    <Box className={styles.marketPlace}>
      <SectionHeader title="Մարկետփլեյս" />
      <Typography className={styles.averageTimeTitle}>
        Առաքման միջին ժամանակը
      </Typography>
      <Typography className={styles.averageTime}>
        ~{marketPlaceData.averageTime} ժ․
      </Typography>
      <Box className={styles.shippingContainer} ref={shippingRef}>
        <Box className={styles.truck} style={{ left: offset }}>
          <LocalShippingOutlinedIcon />
        </Box>
        <Box className={styles.hours}>
          <Typography>0</Typography>
          <Typography>50</Typography>
          <Typography>100</Typography>
        </Box>
        <Box className={styles.indicator} />
      </Box>
      <Typography className={styles.tasksTitle}>Առաջադրանքները</Typography>
      <Box className={styles.tasks}>
        <Box className={styles.task}>
          <Typography className={styles.taskTitle}>Նորեր</Typography>
          <Typography className={styles.taskAmount}>
            {
              marketPlaceData.tasks.find((data) => data.title === 'Նորեր')
                ?.amount
            }
          </Typography>
        </Box>
        <Box className={styles.task}>
          <Typography className={styles.taskTitle}>Փաթեթավորվում են</Typography>
          <Typography className={styles.taskAmount}>
            {
              marketPlaceData.tasks.find(
                (data) => data.title === 'Փաթեթավորվում են'
              )?.amount
            }
          </Typography>
        </Box>
        <Box className={styles.task}>
          <Typography className={styles.taskTitle}>Ճանապարհին են</Typography>
          <Typography className={styles.taskAmount}>
            {
              marketPlaceData.tasks.find(
                (data) => data.title === 'Ճանապարհին են'
              )?.amount
            }
          </Typography>
        </Box>
        <Box className={styles.horizontalTask}>
          <Typography className={styles.horizontalTaskTitle}>
            Սորտավորվում են
          </Typography>
          <Typography className={styles.horizontalTaskAmount}>
            {
              marketPlaceData.tasks.find(
                (data) => data.title === 'Սորտավորվում են'
              )?.amount
            }
          </Typography>
        </Box>
        <Box className={styles.horizontalTask}>
          <Typography className={styles.horizontalTaskTitle}>
            Կրկին առաքումվում են
          </Typography>
          <Typography className={styles.horizontalTaskAmount}>
            {
              marketPlaceData.tasks.find(
                (data) => data.title === 'Կրկին առաքումվում են'
              )?.amount
            }
          </Typography>
        </Box>
      </Box>
      <Typography className={styles.sold}>
        Վաճառված է։ {marketPlaceData.sold}
      </Typography>
    </Box>
  )
}

export default MarketPlace
