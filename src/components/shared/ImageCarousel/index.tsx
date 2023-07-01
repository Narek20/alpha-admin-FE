import { FC } from 'react'
import Slider from 'react-slick'
import { Box } from '@mui/material'
import styles from './styles.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface IProps {
  slides: string[]
  size: number
}

const ImageCarousel: FC<IProps> = ({ slides, size }) => {
  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
  }

  return (
    <Slider className={styles.slider} {...settings} arrows autoplay>
      {slides.map((slide) => (
        <Box>
          <img
            key={slide}
            style={{ width: `${size}px`, height: `${size}px` }}
            src={slide}
            alt="նկար"
          />
        </Box>
      ))}
    </Slider>
  )
}

export default ImageCarousel
