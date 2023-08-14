import BorderColorIcon from '@mui/icons-material/BorderColor'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'

export const navlinks = [
  {
    title: 'Պատվերներ',
    link: '/orders',
    icon: BorderColorIcon,
  },
  {
    title: 'Ապրանքներ',
    link: '/products',
    icon: LocalGroceryStoreIcon,
  },
  {
    title: 'Անալիտիկա',
    link: '/analytics',
    icon: LeaderboardIcon,
  },
  {
    title: 'Առաքիչներ',
    link: '/drivers',
    icon: DirectionsRunIcon,
  },
  {
    title: 'CRM',
    link: '/crm',
    icon: AccountTreeIcon,
  },
]
