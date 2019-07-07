import { FullScreenContainer } from "./components"
import { Switch as RouterSwitch, Route, Redirect } from "react-router"
import { createContext, useReducer, useEffect } from 'react'
import { loadCSS } from 'fg-loadcss'
import { Home, SendLibra, ReceiveLibra } from "./pages"
import Axios from "axios"

const setLibraAccount = (state, newAcct) => newAcct
const LibraAccountContext = createContext(null)

const LibraKePocWallet = () => {

    useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, [])

    const [libraAccount, setLibraAccountDispatch] = useReducer(setLibraAccount, null)

    useEffect(() => {

        Axios.get('/v1/initialize').then(res => {
            const { found, account = null } = res.data
            if (found) {
                setLibraAccountDispatch(account)
            }
        })
    }, [])

    return (
        <FullScreenContainer>
            <LibraAccountContext.Provider
                value={{ account: libraAccount, setAccount: setLibraAccountDispatch }}>
                <RouterSwitch>
                    <Route path="/" exact render={(props) => <Home {...props} />} />
                    <Route path="/send" render={(props) => <SendLibra {...props} setAccount={setAccount} />} />
                    <Route path="/receive" render={(props) => <ReceiveLibra {...props} />} />
                    <Route render={() => <Redirect to="/" />} />
                </RouterSwitch>
            </LibraAccountContext.Provider>
        </FullScreenContainer>
    )
}

LibraKePocWallet.AccountContext = LibraAccountContext

export default LibraKePocWallet