import { Fragment, useState, useEffect } from "react"
import {
    AppBar, Toolbar, Typography, Grid, Box, CircularProgress
} from '@material-ui/core'
import Axios from 'axios'
import UiRoutes from "../pages/UiRoutes"


const http = Axios.create({ timeout: 1000 * 30 })

export default () => {

    const [isCreatingWallet, setIsCreatingWallet] = useState(false)
    const [acct, setAcct] = useState(null)
    const [isInitializing, setIsInitializing] = useState(true)
    const [loadingLabel, setLoadingLabel] = useState("Initializing your account ...")

    useEffect(() => {
        http.get('/v1/initialize').then(res => {
            const { data } = res
            // console.log(data.found)
            if (data.found) {
                setAcct(data.account)
                setIsInitializing(false)
            } else {
                setLoadingLabel("Creating a new account ...")
                http.post("/v1/createwallet").then(res => {
                    setAcct(res.data)
                    setIsInitializing(false)
                    // console.log(res.data)
                }).catch(e => console.log(e))
            }
        })
    }, [])

    const handleCreateWallet = () => {
        setIsCreatingWallet(true)
    }

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
                    display="flex"
                    width="75%"
                    bgcolor="#fff"
                    minHeight="500px"
                    borderRadius={2}
                    justifyContent="center"
                    alignItems="center">
                    {isInitializing ? (
                        <Fragment>
                            <Box>
                                <CircularProgress size={32} />
                            </Box>
                            <Box>
                                <Typography variant="body1">{loadingLabel}</Typography>
                            </Box>
                        </Fragment>) : (
                            <UiRoutes
                                isCreatingWallet={isCreatingWallet}
                                onCreateWallet={handleCreateWallet}
                                account={acct}
                            />)}
                </Box>
            </Box>
        </Fragment>
    )
}