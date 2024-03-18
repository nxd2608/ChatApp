import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const lightNeutral = {
  0: '#FFFFFF',
  100: '#F7F8F9',
  200: '#F1F2F4',
  300: '#DCDFE4',
  400: '#B3B9C4',
  500: '#8590A2',
  600: '#758195',
  700: '#626F86',
  800: '#44546F',
  900: '#2C3E5D',
  1000: '#172B4D'
}

const darkNeutral = {
  0: '#161A1D',
  100: '#1D2125',
  200: '#22272B',
  300: '#2C333A',
  400: '#454F59',
  500: '#596773',
  600: '#738496',
  700: '#8C9BAB',
  800: '#9FADBC',
  900: '#B6C2CF',
  1000: '#C7D1DB'
}

const colorScheme = extendTheme({
  typography: {
    fontFamily: ['Manrope', 'Jetbrains Mono'].join(', ')
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: lightNeutral[0],
          contrastText: lightNeutral[1000]
        },
        secondary: {
          main: lightNeutral[100],
          contrastText: lightNeutral[1000]
        },
        background: {
          default: lightNeutral[100],
          paper: lightNeutral[200]
        },
        text: {
          primary: lightNeutral[1000],
          secondary: lightNeutral[0],
          disabled: lightNeutral[800]
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: darkNeutral[100],
          contrastText: darkNeutral[1000]
        },
        secondary: {
          main: darkNeutral[200],
          contrastText: darkNeutral[1000]
        },
        background: {
          default: darkNeutral[300],
          paper: darkNeutral[300]
        },
        text: {
          primary: darkNeutral[1000],
          secondary: darkNeutral[0],
          disabled: darkNeutral[800]
        }
      }
    }
  }
})

export default colorScheme
