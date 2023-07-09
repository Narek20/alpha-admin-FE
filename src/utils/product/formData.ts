import { ICreateProduct } from 'types/product.types'
import { productKeys } from './constants'

export const getFromData = (
  colorProduct: {
    color: string
    images: File[]
    sizes: string[]
    smSizes: string[]
  },
  productData: ICreateProduct
): FormData => {
  const formData = new FormData()

  productKeys.forEach((key) => {
    formData.append(key, productData[key] as string)
  })

  formData.append('color', colorProduct.color)
  formData.append('smSizes', colorProduct.smSizes.join(','))
  formData.append('sizes', colorProduct.sizes.join(','))

  colorProduct.images.forEach((file) => {
    formData.append('images', file)
  })

  return formData
}
