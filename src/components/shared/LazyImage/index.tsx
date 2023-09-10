import { CSSProperties, FC, useEffect, useState, useRef } from 'react'
import classes from './styles.module.scss'
interface IProps {
  src: string
  alt?: string
  styles?: CSSProperties
}

const LazyImage: FC<IProps> = ({ src, alt, styles }) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && imgRef.current) {
          // Load the image when it becomes visible
          imgRef.current.src = src
          observer.unobserve(imgRef.current)
        }
      })
    })

    // Start observing the image element
    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    // Handle image load event
    const handleImageLoad = () => {
      setImageLoaded(true)
    }

    if (imgRef.current) {
      imgRef.current.addEventListener('load', handleImageLoad)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
        imgRef.current.removeEventListener('load', handleImageLoad)
      }
    }
  }, [src])

  return (
    <img
      ref={imgRef}
      className={imageLoaded ? classes.lazyImageLoaded : classes.lazyImage}
      style={styles}
      src={src}
      alt={alt}
    />
  )
}

export default LazyImage
