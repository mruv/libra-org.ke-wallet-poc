import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import createLibraKeTheme from './theme/createLibraKeTheme'
import LibraKePocWallet from './LibraKePocWallet'


const theme = createLibraKeTheme()

ReactDOM.render(
    <HashRouter>
        <ThemeProvider theme={theme}>
            <LibraKePocWallet />
        </ThemeProvider>
    </HashRouter>, document.getElementById('app'))