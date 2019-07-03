import overrides from './overrides'
import props from './props'
import { responsiveFontSizes, createMuiTheme } from '@material-ui/core/styles'

const createLibraKeTheme = () => {

    const theme = createMuiTheme({
        palette: {
            // primary: { main: "#00b1a8" },
            primary: { main: "#0000ff" },
            secondary: { main: "#e06666" }
        },
        typography: {
            // fontSize: 16,
            // fontWeightRegular: 600,
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            /*body1: {
                fontSize: '1rem',
            }*/
        },
        ...overrides,
        ...props
    })

    return responsiveFontSizes(theme)
}

export default createLibraKeTheme