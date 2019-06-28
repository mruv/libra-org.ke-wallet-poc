import { Fragment, useState } from "react"
import {
    AppBar, Toolbar, Typography,
    Grid, Box, Button, CircularProgress
} from '@material-ui/core'
import { AddSharp } from '@material-ui/icons'
import Axios from 'axios'


const http = Axios.create({timeout : 1000 * 10})

export default () => {

    const [isCreatingWallet, setIsCreatingWallet] = useState(false)

    const handleCreateWallet = (e) => {
        setIsCreatingWallet(true)

        http.post("/v1/createwallet").then(res => {
            console.log(res.data)
            setIsCreatingWallet(false)
        }).catch(e => console.log(e))
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
                    {isCreatingWallet ? <CircularProgress size={28} /> : (
                        <Button variant="contained" onClick={handleCreateWallet}>
                            <AddSharp color="secondary" fontWeight="700" fontSize="small" />
                            <Typography variant="body1">Create Your Account</Typography>
                        </Button>
                    )}
                </Box>
            </Box>
        </Fragment>
    )
}