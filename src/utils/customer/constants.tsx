import { CustomerInfoKeys } from 'types/customer.types'
import PersonIcon from '@mui/icons-material/Person'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import HomeIcon from '@mui/icons-material/Home'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import NoteIcon from '@mui/icons-material/Note'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import PercentIcon from '@mui/icons-material/Percent'
import InventoryIcon from '@mui/icons-material/Inventory'
import PaidIcon from '@mui/icons-material/Paid'

export const customerInformation = [
  {
    label: 'Անուն ազգանուն։',
    key: CustomerInfoKeys.FULL_NAME,
    icon: <PersonIcon />,
  },
  { label: 'Հեռախոս:', key: CustomerInfoKeys.PHONE, icon: <LocalPhoneIcon /> },
  { label: 'Հասցե:', key: CustomerInfoKeys.ADDRESS, icon: <HomeIcon /> },
  {
    label: 'Հասցե 2:',
    key: CustomerInfoKeys.ADDRESS2,
    icon: <HomeOutlinedIcon />,
  },
  { label: 'Նշում:', key: CustomerInfoKeys.NOTES, icon: <NoteIcon /> },
  {
    label: 'Նշում 2:',
    key: CustomerInfoKeys.NOTES2,
    icon: <NoteOutlinedIcon />,
  },
  {
    label: 'Քեշբեք(%):',
    key: CustomerInfoKeys.CASHBACK,
    icon: <LocalOfferIcon />,
  },
  {
    label: 'Զեղծված գումարը:',
    key: CustomerInfoKeys.CASHBACK_MONEY,
    icon: <PercentIcon />,
  },
  {
    label: 'Ընդհանուր ապրանքները:',
    key: CustomerInfoKeys.TOTAL_QTY,
    icon: <InventoryIcon />,
  },
  {
    label: 'Ընդհանուր գումարը։',
    key: CustomerInfoKeys.TOTAL_PRICE,
    icon: <PaidIcon />,
  },
]
