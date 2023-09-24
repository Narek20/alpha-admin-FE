import { useRef, useState } from 'react'
import { Autocomplete, TextField, Chip } from '@mui/material'
import { IProduct } from 'types/product.types'
import { search } from 'services/products.service'
import { orderProductType } from 'types/order.types'

interface IProps {
  orderProducts: orderProductType[]
  setOrderProducts?: React.Dispatch<React.SetStateAction<orderProductType[]>>
  onChange: (value: orderProductType | orderProductType[]) => void
  multiple?: boolean
}

export const OrderProductSearch: React.FC<IProps> = ({
  orderProducts,
  onChange,
  multiple,
  setOrderProducts,
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
    const product = (values as IProduct[]).at(-1)
    if (!product) {
      return
    }
    const newProduct = {
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

    onChange([...orderProducts, newProduct])
    setSearchedProducts([])
  }

  return (
    <Autocomplete
      noOptionsText="Ոչինչ չի գտնվել"
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
      defaultValue={multiple ? orderProducts.map((op) => op.product) : null}
      renderTags={() =>
        orderProducts.map((orderProduct, index) => (
          <Chip
            variant="outlined"
            key={orderProduct.product.title + orderProduct.size}
            label={orderProduct.product.title}
            sx={{ marginRight: 0.5 }}
            onDelete={() =>
              setOrderProducts &&
              setOrderProducts((prev) => prev.filter((_, ind) => ind !== index))
            }
          />
        ))
      }
      onInputChange={(_, value) => searchProducts(value)}
      renderInput={(params) => (
        <TextField {...params} label="Ապրանքի Որոնում" />
      )}
    />
  )
}
