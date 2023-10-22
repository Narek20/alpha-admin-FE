import { FC } from 'react'
import { Carousel } from 'react-responsive-carousel'

import styles from './styles.module.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface IProps {
  slides: string[]
}

const ImageCarousel: FC<IProps> = ({ slides }) => {
  return (
    <Carousel
      className={styles.carousel}
      showThumbs={false}
      autoPlay
      infiniteLoop
    >
      {slides.map((slide) => (
        <div style={{ aspectRatio: 1 }}>
          <img
            className={styles.carouselImg}
            key={slide}
            src={slide}
            alt="նկար"
          />
        </div>
      ))}
    </Carousel>
  )
}

export default ImageCarousel
