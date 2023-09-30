import { useMediaQuery, useTheme } from '@mui/material'

export default () => {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down(1001))
  return isTablet
}
