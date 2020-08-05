import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
    typography: {
        fontFamily: ['Montserrat, sans-serif, Roboto, Helvetica']
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#42b6f6'
        },
        background: {
            default: '#192b41'
        }
    },
    status: {},
    app: {
        error: {
            main: '#F38370',
            dark: '#C26959'
        },
        success: {
            main: '#00ce7d'
        },
        ctaPrimary: {
            main: '#3B6798',
            dark: '#3F5B7A'
        },
        ctaSecondary: {
            main: '#445C79',
            dark: '#3E4D60'
        },
        ctaDefault: {
            main: '#B3B3B3',
            dark: '#8F8F8F'
        },
        loadMore: {
            main: '#1C344E',
            dark: '#172A3F'
        },
        background: {
            100: '#192b41',
            200: '#1d334b',
            300: '#213b58',
            primaryGradient: 'linear-gradient(294deg, #2b3352 10%, #0091ff 150%)',
            primaryGradientInverted: 'linear-gradient(#0091ff  0%, #2b3352 100%)',
            secondaryGradient: 'linear-gradient(to right, #c9da2a 0%, #31953e 100%)',
            secondaryGradientInverted: 'linear-gradient(#31953e 0%, #c9da2a 100%)'
        },
        hover: '#274567'
    }
})
