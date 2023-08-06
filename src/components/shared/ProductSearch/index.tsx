import { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { IProduct } from 'types/product.types'
import { getAllProducts } from 'services/products.service'

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
  const searchProducts = async (searchKey: string) => {
    const data = await getAllProducts({
      title: searchKey,
      take: '10',
    })

    if (data.success) {
      setSearchedProducts(handleFilter ? handleFilter(data.data) : data.data)
    }
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      getOptionLabel={(option) => option.title + '-' + option.color}
      options={searchedProducts.map((product) => product)}
      onChange={onChange}
      value={null}
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
