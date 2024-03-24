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
  1000: '#C7D1DB',
  1100: '#FFFFFF'
}

const colorScheme = extendTheme({
  typography: {
    fontFamily: ['Manrope', 'Jetbrains Mono'].join(', ')
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: lightNeutral[1000]
        },
        secondary: {
          main: lightNeutral[0]
        },
        common: {
          white: lightNeutral[0],
          black: lightNeutral[1000]
        },
        background: {
          default: lightNeutral[100],
          paper: lightNeutral[200]
        },
        action: {
          hover: lightNeutral[0],
          selected: lightNeutral[200]
        },
        text: {
          primary: lightNeutral[1000],
          disabled: lightNeutral[800]
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: darkNeutral[1000]
        },
        secondary: {
          main: darkNeutral[0]
        },
        common: {
          white: darkNeutral[1100],
          black: darkNeutral[0]
        },
        background: {
          default: darkNeutral[100],
          paper: darkNeutral[200]
        },
        action: {
          hover: darkNeutral[0],
          selected: darkNeutral[200]
        },
        text: {
          primary: darkNeutral[1000],
          disabled: darkNeutral[800]
        }
      }
    }
  }
})

export default colorScheme
