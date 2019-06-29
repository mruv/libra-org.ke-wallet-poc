import { Switch, Route, Redirect } from "react-router"
import Home from "./Home"
import Send from "./Send"

export default ({ account }) => {

    return (
        <Switch>
            <Route
                path="/"
                exact
                render={(props) => (
                    <Home
                        account={account}
                        {...props} />)} />
            <Route path="/send" render={(props) => <Send myBal={account.balance} {...props} />} />
            <Route render={() => <Redirect to="/" />} />
        </Switch>
    )
}