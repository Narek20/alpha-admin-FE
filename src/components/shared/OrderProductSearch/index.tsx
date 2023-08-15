import { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { IProduct } from 'types/product.types'
import { search } from 'services/products.service'
import { orderProductType } from 'types/order.types'

interface IProps {
  orderProducts: orderProductType[]
  onChange: (value: orderProductType) => void
}

export const OrderProductSearch: React.FC<IProps> = ({
  orderProducts,
  onChange,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])

  const searchProducts = async (searchKey: string) => {
    if (!searchKey.trim()) {
      return
    }
    setIsLoading(true)
    const data = await search(searchKey)
    setIsLoading(false)

    if (data.success) {
      setSearchedProducts(data.data)
    }
  }

  const handleFilter = (data: IProduct[]) =>
    data.filter(
      (product: IProduct) =>
        product.sizes?.some(
          (size) =>
            !orderProducts.some(
              (orderProduct) =>
                orderProduct.product.id === product.id &&
                orderProduct.size === size.size,
            ),
          // && size.quantity
        ),
    )

  const handleChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: IProduct | null,
  ) => void = (evt, value) => {
    if (!value) {
      return
    }
    const newOrderProduct = {
      id: NaN,
      product: value,
      quantity: 1,
      size: value.sizes?.find(
        (size) =>
          !orderProducts.some(
            (orderProduct) =>
              orderProduct.product.id === value.id &&
              orderProduct.size === size.size,
          ),
        // && size.quantity
      )?.size,
    }
    onChange(newOrderProduct)
    setSearchedProducts([])
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      getOptionLabel={(option) =>
        `${option.title}${option.color ? `-${option.color}` : ''}`
      }
      filterOptions={(options) => handleFilter(options)}
      loading={isLoading}
      options={searchedProducts}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ապրանքի Որոնում"
          onChange={(evt) => searchProducts(evt.target.value)}
        />
      )}
    />
  )
}
