import { ICreateProduct, Sizes } from 'types/product.types'
import { productKeys } from './constants'

export const getFormData = (
  productData: ICreateProduct,
  colorProduct?: {
    color: string
    images: File[]
    sizes: Sizes[]
  }
): FormData => {
  const formData = new FormData()

  productKeys.forEach((key) => {
    formData.append(key, productData[key] as string)
  })

  if(productData.images.length) {
    productData.images.forEach((file) => {
      formData.append('images', file)
    })
  }

  if(colorProduct) {

    formData.append('color', colorProduct.color)
    formData.append('sizes', JSON.stringify(colorProduct.sizes))
  
    colorProduct.images.forEach((file) => {
      formData.append('images', file)
    })
  }


  return formData
}
