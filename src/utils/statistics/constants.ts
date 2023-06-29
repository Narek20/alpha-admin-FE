import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'

export const commonStatistics = [
  {
    title: 'Առաքման վարկանիշը',
    icon: LocalShippingOutlinedIcon,
    qty: '99%',
    percentage: true,
  },
  {
    title: 'Պատվերները շաբաթում',
    icon: TrendingDownIcon,
    qty: '+10%',
    percentage: true,
  },
  {
    title: 'Եկամուտը շաբաթում',
    icon: MonetizationOnOutlinedIcon,
    qty: '+20%',
    percentage: true,
    percentagesOver: true,
  },
  {
    title: 'Ծախված ապրանքները',
    icon: ShoppingBagOutlinedIcon,
    qty: 928,
  },
  {
    title: 'Թերություններով ապրանքները',
    icon: BrokenImageOutlinedIcon,
    qty: 12,
  },
  {
    title: 'Վարկանիշը հետադարձ կապով',
    icon: StarBorderOutlinedIcon,
    qty: 4.8,
  },
  {
    title: 'Հետադարձ կապերը',
    icon: ChatOutlinedIcon,
    qty: 15,
  },
  {
    title: 'Գնորդների հարցերը',
    icon: HelpOutlineOutlinedIcon,
    qty: 21,
  },
]
