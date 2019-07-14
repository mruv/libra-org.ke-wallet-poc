import { FullScreenContainer } from "./components"
import { Switch as RouterSwitch, Route, Redirect } from "react-router"
import { createContext, useReducer, useEffect } from 'react'
import { loadCSS } from 'fg-loadcss'
import { Home, SendLibra, ReceiveLibra } from "./pages"
import Axios from "axios"
import { CssBaseline } from "@material-ui/core"

export const isValidEmailAddress = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

export const isValidLibraAddress = (address) => {
    const re = /^[a-z0-9]{64}$/
    return re.test(address)
}

export const isValidMobileNumber = (mobileNumber) => {
    const re = /^\+(?:[0-9] ?){6,14}[0-9]$/
    return re.test(mobileNumber)
}

export const isValidAmount = (amount, balance) => {
    if (Math.sign(amount) == 1) {
        // Must be:
        //  - a number
        //  - positive
        //  - less than or equal to current account balance
        return parseFloat(amount) <= parseFloat(balance) 
    }

    return false
}

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
            <CssBaseline />
            <LibraAccountContext.Provider
                value={{ account: libraAccount, setAccount: setLibraAccountDispatch }}>
                <RouterSwitch>
                    <Route path="/" exact render={(props) => <Home {...props} />} />
                    <Route path="/send" render={(props) => <SendLibra account={libraAccount} {...props} setAccount={setLibraAccountDispatch} />} />
                    <Route path="/receive" render={(props) => <ReceiveLibra account={libraAccount} {...props} />} />
                    <Route render={() => <Redirect to="/" />} />
                </RouterSwitch>
            </LibraAccountContext.Provider>
        </FullScreenContainer>
    )
}

LibraKePocWallet.AccountContext = LibraAccountContext

export default LibraKePocWallet