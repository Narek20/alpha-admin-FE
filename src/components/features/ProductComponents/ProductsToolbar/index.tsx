import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Drawer,
  TextField,
  ButtonGroup,
  InputAdornment,
} from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ClearIcon from '@mui/icons-material/Clear'
import useTablet from '@utils/hooks/useTablet'
import ProductSettings from '../ProductSettings'
import ProductsSidebar from '../ProductsSidebar'
import AddStorageProduct from '../../StorageComponents/AddStorageProduct'
import { AuthContext } from 'contexts/auth.context'
import { ProductsContext } from 'contexts/products.context'
import { UserStatus } from 'types/user.types'
import { ProductKeys } from 'types/product.types'

import styles from './styles.module.scss'

interface IProps {
  isBig: boolean
  changeDisplay: (isBig: boolean) => void
}

const NameSearch = () => {
  const [value, setValue] = useState('')
  const { setFilters } = useContext(ProductsContext)
  const inputRef = useRef<HTMLDivElement>(null)

  const onSubmit = () => {
    setFilters((filters) => ({ ...filters, [ProductKeys.TITLE]: value }))
  }

  const handleRollBack = () => {
    setFilters({})
    setValue('')
  }

  return (
    <Box width="100%">
      <ButtonGroup fullWidth sx={{ marginBottom: 2, gap: 1 }}>
        <TextField
          fullWidth
          label="Անուն"
          value={value}
          inputRef={inputRef}
          InputProps={{
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton onClick={handleRollBack}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
          onChange={(evt) => setValue(evt.target.value)}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              onSubmit()
              inputRef.current?.blur()
            }
          }}
        />
        {/* <Button fullWidth={false} color="inherit" onClick={onSubmit}>
          Search
        </Button> */}
      </ButtonGroup>
    </Box>
  )
}

const ProductsToolbar: FC<IProps> = ({ isBig, changeDisplay }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showTabletFilter, setShowTabletFilter] = useState(false)

  const navigate = useNavigate()
  const { pagination, getProducts } = useContext(ProductsContext)
  const { userData } = useContext(AuthContext)

  const isTablet = useTablet()

  useEffect(() => {
    if (!isTablet) {
      setShowTabletFilter(false)
    }
  }, [isTablet])

  const handleAdd = () => {
    navigate('/new-product')
  }

  const changeItemsCount = (count: string) => {
    pagination.take = +count
    pagination.skip = 0
    getProducts()
  }

  return (
    <>
      {isTablet && (
        <Drawer
          open={showTabletFilter}
          onClose={() => setShowTabletFilter(false)}
          anchor="left"
          variant="temporary"
          keepMounted
        >
          <ProductsSidebar />
        </Drawer>
      )}
      {isTablet && <NameSearch />}
      <Box className={styles.toolbar}>
        <Box className={styles.leftBar}>
          {isTablet && (
            <IconButton onClick={() => setShowTabletFilter(true)}>
              <FilterAltIcon />
            </IconButton>
          )}
          <IconButton onClick={() => changeDisplay(true)}>
            <GridViewOutlinedIcon sx={{ color: isBig ? 'black' : 'gray' }} />
          </IconButton>
          <IconButton onClick={() => changeDisplay(false)}>
            <ViewCompactOutlinedIcon sx={{ color: isBig ? 'gray' : 'black' }} />
          </IconButton>
          <FormControl className={styles.form}>
            <Select
              value={pagination.take || 10}
              onChange={(evt) => changeItemsCount(evt.target.value as string)}
            >
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="100">100</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {userData?.status !== UserStatus.USER && (
          <Box className={styles.rightBar}>
            <Button className={styles.button} onClick={handleAdd}>
              Ավելացնել
            </Button>
            <Button className={styles.button} onClick={() => setIsOpen(true)}>
              Ապրանքի ընդունում
            </Button>
            <Button
              className={styles.button}
              onClick={() => setIsSettingsOpen(true)}
            >
              Կարգավորումներ
            </Button>
          </Box>
        )}
        {isOpen && <AddStorageProduct onClose={() => setIsOpen(false)} />}
        {isSettingsOpen && (
          <ProductSettings onClose={() => setIsSettingsOpen(false)} />
        )}
      </Box>
    </>
  )
}

export default ProductsToolbar
