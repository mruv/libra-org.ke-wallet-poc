import { createMuiTheme } from "@material-ui/core"
import overrides from './overrides'
import props from './props'

const createLibraKeTheme = () => createMuiTheme({
    palette: {
        primary: { main: "#00b1a8" },
        secondary: { main: "#e06666" }
    },
    typography: {
        fontSize: 14,
        fontWeightRegular: 500,
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
        body1: {
            fontSize: '1rem',
        }
    },
    ...overrides,
    ...props
})

export default createLibraKeTheme