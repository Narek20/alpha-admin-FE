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
    MuiTextField: {
      styleOverrides: {
        root: {
          color: '#f6c71e',
          borderColor: '#f6c71e',
          '& .MuiInput-underline': {
            borderBottomColor: '#f6c71e',
          },
          '& .MuiOutlinedInput-root': {
            borderColor: '#f6c71e',

            '&.Mui-focused fieldset': {
              borderColor: '#f6c71e',
            },
          },
          '& fieldset': {
            borderColor: '#f6c71e',
          },
          '& label.Mui-focused': {
            color: '#f6c71e',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#f6c71e',
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: '#f6c71e',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#f6c71e',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline': {
            borderBottomColor: '#f6c71e',
          },
          '& .MuiOutlinedInput-root': {
            borderColor: '#f6c71e',

            '&.Mui-focused fieldset': {
              borderColor: '#f6c71e',
            },
          },
          '& input': {
            color: '#f6c71e',
          },
          '& div': {
            color: '#f6c71e',
          },
          '& fieldset': {
            borderColor: '#f6c71e',
          },
          '& label.Mui-focused': {
            color: '#f6c71e',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#f6c71e',
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: '#f6c71e',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#f6c71e',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '& fieldset': {
            borderColor: '#f6c71e',
            backgroundColor: 'transparent',
          },
        },
        iconOutlined: {
          // Change the color of the arrow icon for outlined variant
          color: '#f6c71e',
        },
      },
    },
    MuiMenuItem: {
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
      paper: '#2B2B29',
    },
  },
})
