import { FullScreenContainer } from "./components"
import { Switch as RouterSwitch, Route, Redirect } from "react-router"
import { createContext, useReducer, useEffect } from 'react'
import { loadCSS } from 'fg-loadcss'
import { Home, SendLibra, ReceiveLibra } from "./pages"

const setLibraAccount = (state, newAcct) => newAcct
const LibraAccountContext = createContext(null)

const LibraKePocWallet = () => {

    const [libraAccount, setLibraAccountDispatch] = useReducer(setLibraAccount,
        {
            address: "987092e9a29cc9579189d0bb38187e609216ed86ab7abd3a95025fad44f2e139",
            balance: "200000.000000"
        })

    useEffect(() => {
            loadCSS(
              'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
              document.querySelector('#font-awesome-css'),
            );
          }, [])

    return (
        <FullScreenContainer>
            <LibraAccountContext.Provider
                value={{ account: libraAccount, setAccount: setLibraAccountDispatch }}>
                <RouterSwitch>
                    <Route path="/" exact render={(props) => <Home {...props} />} />
                    <Route path="/send" render={(props) => <SendLibra {...props} />} />
                    <Route path="/receive" render={(props) => <ReceiveLibra {...props} />} />
                    <Route render={() => <Redirect to="/" />} />
                </RouterSwitch>
            </LibraAccountContext.Provider>
        </FullScreenContainer>
    )
}

LibraKePocWallet.AccountContext = LibraAccountContext

export default LibraKePocWallet