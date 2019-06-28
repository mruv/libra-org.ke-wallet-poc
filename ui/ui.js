import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { LibraKeApp } from './components'
import { ThemeProvider } from '@material-ui/styles'
import createLibraKeTheme from './theme/createLibraKeTheme'


const theme = createLibraKeTheme()

ReactDOM.render(
    <HashRouter>
        <ThemeProvider theme={theme}>
            <LibraKeApp />
        </ThemeProvider>
    </HashRouter>, document.getElementById('app'))