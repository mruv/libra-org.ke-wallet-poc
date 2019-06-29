import { Fragment, useState } from "react"
import {
    AppBar, Toolbar, Typography,
    Grid, Box, Button, CircularProgress
} from '@material-ui/core'
import Axios from 'axios'
import { Account } from ".";
import UiRoutes from "../pages/UiRoutes";


const http = Axios.create({ timeout: 1000 * 30 })

export default () => {

    const [isCreatingWallet, setIsCreatingWallet] = useState(false)
    const [acct, setAcct] = useState(null)

    const handleCreateWallet = () => {
        setIsCreatingWallet(true)

        http.post("/v1/createwallet").then(res => {
            setAcct(res.data)
            setIsCreatingWallet(false)
        }).catch(e => console.log(e))
    }

    const handleSend = () => {
        history.go('/send')
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
                            <Typography variant="h6" color="textSecondary">Libra.Org.KE</Typography>
                        </Grid>
                        <Grid item md={7}>
                            <Box display="flex" flexDirection="row">
                                <Box pr={2}>Home</Box>
                                <Box pr={2}>Stats</Box>
                                <Box pr={2}>Wallet</Box>
                            </Box>
                        </Grid>
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
                    <UiRoutes
                        isCreatingWallet={isCreatingWallet}
                        onCreateWallet={handleCreateWallet}
                        account={acct}
                    />
                </Box>
            </Box>
        </Fragment>
    )
}