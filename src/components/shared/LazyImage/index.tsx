import { CSSProperties, FC, useEffect, useRef } from 'react';

interface IProps {
  src: string
  alt?: string
  styles?: CSSProperties
}

const  LazyImage:FC<IProps> = ({ src, alt, styles }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && imgRef.current) {
          // Load the higher-quality image when it becomes visible
          imgRef.current.src = src;
          observer.unobserve(imgRef.current);
        }
      });
    });

    // Start observing the image element
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      className="lazy-image"
      style={styles}
      src={src}
      alt={alt}
    />
  );
}

export default LazyImage;
