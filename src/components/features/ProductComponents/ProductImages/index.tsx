import { FC, useState, useEffect, ChangeEvent, useRef } from 'react'
import { IconButton, Typography, Box } from '@mui/material'
import SectionHeader from '@shared/SectionTitle'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import styles from './styles.module.scss'

interface IProps {
  images: File[]
  changeImages: (images: File[]) => void
}

const NewProductImages: FC<IProps> = ({ images, changeImages }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isEdited, setIsEdited] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      changeImages([...images, file])
      setImageUrls([...imageUrls, URL.createObjectURL(file)])
      setIsEdited(true)
    }
  }

  const removeImage = (index: number) => {
    changeImages(images.filter((_, ind) => ind !== index))
    setImageUrls(imageUrls.filter((_, ind) => ind !== index))
  }

  useEffect(() => {
    const imageUrls: string[] = []

    images.forEach((image) => {
      if (typeof image === 'string') {
        imageUrls.push(image)
      } else {
        imageUrls.push(URL.createObjectURL(image))
      }
    })

    isEdited &&
      images.length &&
      imgRef.current?.scrollIntoView({ behavior: 'smooth' })
    setImageUrls(imageUrls)
  }, [images])

  return (
    <>
      <SectionHeader title="Նկարներ" />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-image"
        type="file"
        onChange={handleImageUpload}
      />
      <Box className={styles.images}>
        {imageUrls.map((image, index) => (
          <Box key={image} className={styles.imageContainer}>
            <img
              src={
                image.includes('blob')
                  ? image
                  : process.env.REACT_APP_BASE_URL + image
              }
              className={styles.image}
              alt={'ապրանք նկար' + index}
            />
            <IconButton
              className={styles.removeBtn}
              onClick={() => removeImage(index)}
            >
              <DeleteOutlineOutlinedIcon sx={{ color: 'red' }} />
            </IconButton>
          </Box>
        ))}
        <label htmlFor="upload-image" className={styles.imageLabel}>
          <Box className={styles.imageAddContainer} ref={imgRef}>
            <AddPhotoAlternateIcon sx={{ color: 'black' }} />
            <Typography className={styles.imageTitle}>
              Ընտրեք նկարներ
            </Typography>
          </Box>
        </label>
      </Box>
    </>
  )
}

export default NewProductImages
