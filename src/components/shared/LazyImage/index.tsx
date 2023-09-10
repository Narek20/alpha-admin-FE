import { CSSProperties, FC, useEffect, useState, useRef } from 'react'
import classes from './styles.module.scss'
interface IProps {
  src: string
  alt?: string
  styles?: CSSProperties
}

const LazyImage: FC<IProps> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && containerRef.current) {
          // Load the image when it becomes visible
          const image = new Image()
          image.src = src
          image.onload = () => {
            if (containerRef.current) {
              containerRef.current.style.backgroundImage = `url(${src})`
              setImageLoaded(true)
            }
          }
          observer.unobserve(containerRef.current)
        }
      })
    })

    // Start observing the container element
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [src])

  return (
    <div
      ref={containerRef}
      className={
        imageLoaded
          ? classes['lazy-image-container-loaded']
          : classes['lazy-image-container']
      }
    >
      <img
        className={
          imageLoaded ? classes['lazy-image-visible'] : classes['lazy-image']
        }
        src={src}
        alt={alt}
      />
    </div>
  )
}

export default LazyImage
