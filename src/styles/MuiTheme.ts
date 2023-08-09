import { createTheme } from '@mui/material/styles'

export const THEME = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: 'black',
          borderColor: 'black',
          '& .MuiInput-underline': {
            borderBottomColor: 'black',
          },
          '& .MuiOutlinedInput-root': {
            borderColor: 'black',

            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
          '& fieldset': {
            borderColor: 'black',
          },
          '& label.Mui-focused': {
            color: 'black',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: 'black',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'white',
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
          color: 'black',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline': {
            borderBottomColor: 'black',
          },
          '& .MuiOutlinedInput-root': {
            borderColor: 'black',

            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
          '& input': {
            color: 'black',
          },
          '& div': {
            color: 'black',
          },
          '& fieldset': {
            borderColor: 'black',
          },
          '& label.Mui-focused': {
            color: 'black',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: 'black',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '& fieldset': {
            borderColor: 'black',
            backgroundColor: 'transparent',
          },
        },
        iconOutlined: {
          // Change the color of the arrow icon for outlined variant
          color: 'black',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: 'black',
        },
        displayedRows: {
          color: 'black',
        },
        selectIcon: {
          color: 'black',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          color: 'black',
        },
        paper: {
          color: 'black',
        },
        noOptions: {
          color: 'black',
        },
      },
    },
  },
  palette: {
    background: {
      default: 'white',
      paper: 'white',
    },
  },
})
