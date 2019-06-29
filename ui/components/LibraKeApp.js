import { Fragment, useState, useEffect } from "react"
import {
    AppBar, Toolbar, Typography, Grid, Box, CircularProgress
} from '@material-ui/core'
import Axios from 'axios'
import { Home, Send } from "../pages"
import { Switch, Route } from "react-router"

Axios.defaults.timeout = 1000 * 30

export default () => {

    const [acct, setAcct] = useState(null)
    const [isInitializing, setIsInitializing] = useState(true)
    const [loadingLabel, setLoadingLabel] = useState("Initializing your account ...")

    useEffect(() => {
        Axios.get('/v1/initialize').then(res => {
            const { data } = res
            if (data.found) {
                setAcct(data.account)
                setIsInitializing(false)
            } else {
                setLoadingLabel("Creating a new account ...")
                Axios.post("/v1/createwallet").then(res => {
                    setAcct(res.data)
                    setIsInitializing(false)
                }).catch(e => console.log(e))
            }
        })
    }, [])

    return (
        <Fragment>
            <AppBar
                elevation={0}
                color="inherit"
                position="fixed">
                <Toolbar>
                    <Grid container>
                        <Grid item md={5}>
                            <Typography variant="h6" color="textSecondary">Libra KE POC Wallet</Typography>
                        </Grid>
                        {/*<Grid item md={7}>
                            <Box display="flex" flexDirection="row">
                                <Box pr={2}>Home</Box>
                                <Box pr={2}>Stats</Box>
                                <Box pr={2}>Wallet</Box>
                            </Box>
                            </Grid>*/}
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box mt={12} display="flex" justifyContent="center">
                <Box
                    display="flex" width="75%" bgcolor="#fff" minHeight="500px"
                    borderRadius={2} justifyContent="center" alignItems="center">
                    {isInitializing ? (
                        <Box
                            display="flex" flexDirection="column" minWidth="100%"
                            justifyContent="center" alignItems="center">
                            <Box p={2}>
                                <CircularProgress size={48} />
                            </Box>
                            <Box p={2}>
                                <Typography variant="body1">{loadingLabel}</Typography>
                            </Box>
                        </Box>
                    ) : (<Switch>
                        <Route
                            path="/" exact
                            render={(props) => (
                                <Home
                                    account={acct}
                                    {...props} />)} />
                        <Route path="/send" render={(props) => <Send updateAccount={setAcct} myBal={acct.balance} {...props} />} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>)
                    }
                </Box>
            </Box>
        </Fragment>
    )
}