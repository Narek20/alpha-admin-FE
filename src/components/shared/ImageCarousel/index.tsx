import { FC } from 'react'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface IProps {
  slides: string[]
  size?: number
}

const ImageCarousel: FC<IProps> = ({ slides, size }) => {
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      {slides.map((slide) => (
        <img
          key={slide}
          style={{ width: `${size}px`, height: `${size}px` }}
          src={slide}
          alt="նկար"
        />
      ))}
    </Carousel>
  )
}

export default ImageCarousel
