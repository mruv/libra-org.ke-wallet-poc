import { Switch, Route, Redirect } from "react-router"
import Home from "./Home"
import Send from "./Send"

export default ({ isCreatingWallet, onCreateWallet, account }) => {

    return (
        <Switch>
            <Route
                path="/"
                exact
                render={(props) => (
                    <Home
                        isCreatingWallet={isCreatingWallet}
                        onCreateWallet={onCreateWallet}
                        account={account}
                        {...props} />)} />
            <Route path="/send" render={(props) => <Send account={account} {...props} />} />
            <Route render={() => <Redirect to="/" />} />
        </Switch>
    )
}