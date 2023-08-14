import { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { IProduct } from 'types/product.types'
import { search } from 'services/products.service'

interface IProps {
  searchedProducts: IProduct[]
  setSearchedProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
  handleFilter?: (data: IProduct[]) => IProduct[]
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: IProduct | null,
  ) => void
}

export const ProductSearch: React.FC<IProps> = ({
  searchedProducts,
  setSearchedProducts,
  handleFilter,
  onChange,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const searchProducts = async (searchKey: string) => {
    setIsLoading(true)
    const data = await search(searchKey)
    setIsLoading(false)

    if (data.success) {
      setSearchedProducts(data.data)
    }
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      getOptionLabel={(option) =>
        `${option.title}${option.color ? `-${option.color}` : ''}`
      }
      filterOptions={(options) =>
        handleFilter ? handleFilter(options) : options
      }
      loading={isLoading}
      options={searchedProducts}
      onChange={onChange}
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
