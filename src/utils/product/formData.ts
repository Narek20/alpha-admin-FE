import { ICreateProduct } from 'types/product.types'

export const getFromData = (
  imageFiles: File[],
  productData: ICreateProduct
): FormData => {
  const formData = new FormData()

  imageFiles.forEach((file) => {
    formData.append('images', file)
  })

  if (productData.color) {
    formData.append('color', productData.color)
  }

  formData.append('title', productData.title)
  formData.append('category', productData.category)
  formData.append('brand', productData.brand)
  formData.append('price', productData.price + '')
  formData.append(
    'sizes',
    Array.isArray(productData.sizes)
      ? productData.sizes.join(',')
      : productData.sizes
  )

  return formData
}
