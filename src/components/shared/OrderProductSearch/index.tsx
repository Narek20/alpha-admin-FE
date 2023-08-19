import { useRef, useState } from 'react'
import { Autocomplete, TextField, Chip } from '@mui/material'
import { IProduct } from 'types/product.types'
import { search } from 'services/products.service'
import { orderProductType } from 'types/order.types'

interface IProps {
  orderProducts: orderProductType[]
  onChange: (value: orderProductType | orderProductType[]) => void
  multiple?: boolean
}

export const OrderProductSearch: React.FC<IProps> = ({
  orderProducts,
  onChange,
  multiple,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])
  const abortControllerRef = useRef<AbortController>()

  const searchProducts = async (searchKey: string) => {
    if (!searchKey.trim()) {
      return
    }
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    setIsLoading(true)
    const data = await search(searchKey, abortControllerRef.current)
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

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: IProduct | IProduct[] | null,
  ) => {
    if (!value) {
      return
    }
    const product = value as IProduct
    const newOrderProduct = {
      id: NaN,
      product,
      quantity: 1,
      size: product.sizes?.find(
        (size) =>
          !orderProducts.some(
            (orderProduct) =>
              orderProduct.product.id === product.id &&
              orderProduct.size === size.size,
          ),
        // && size.quantity
      )?.size,
    }
    onChange(newOrderProduct)
    setSearchedProducts([])
  }

  const handleMultipleSearch = (
    event: React.SyntheticEvent<Element, Event>,
    values: IProduct | IProduct[] | null,
  ) => {
    const newOrderProducts: orderProductType[] = []
    ;(values as IProduct[]).forEach((product) => {
      const newProduct = {
        id: NaN,
        product,
        quantity: 1,
        size: product.sizes?.find(
          (size) =>
            !newOrderProducts.some(
              (orderProduct) =>
                orderProduct.product.id === product.id &&
                orderProduct.size === size.size,
            ),
          // && size.quantity
        )?.size,
      }
      newOrderProducts.push(newProduct)
    })
    onChange(newOrderProducts)
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
      onChange={multiple ? handleMultipleSearch : handleChange}
      multiple={multiple}
      renderTags={(_, getTagProps) =>
        orderProducts.map((orderProduct, index) => (
          <Chip
            variant="outlined"
            label={orderProduct.product.title}
            {...getTagProps({ index })}
          />
        ))
      }
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
