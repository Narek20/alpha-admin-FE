import { ICreateProduct, ProductKeys, Sizes } from 'types/product.types'
import { productKeys } from './constants'

export const getFormData = (
  productData: ICreateProduct,
): FormData => {
  const formData = new FormData()

  productKeys.forEach((key) => {
    if (key === ProductKeys.ADDITIONAL_INFO) {
      formData.append(key, JSON.stringify(productData[key]))
    } else {
      formData.append(key, productData[key] as string)
    }
  })

  if (productData.images.length) {
    productData.images.forEach((file) => {
      formData.append('images', file)
    })
  }

  if (productData.sizes.length) {
    formData.append('sizes', JSON.stringify(productData.sizes))
  }

  return formData
}
