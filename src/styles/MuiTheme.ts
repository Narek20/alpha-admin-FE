import { createTheme } from '@mui/material/styles'

export const THEME = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#f6c71e',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#2B2B29',
      paper: "#2B2B29"
    },
  },
})
