import { Fragment, useState } from "react"
import { Box, Typography, Icon, Button, Fab, CircularProgress } from "@material-ui/core"
import { LibraSvgIcon } from "."
import { SendOutlined, RefreshOutlined } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"
import Axios from "axios"

Axios.defaults.timeout = 1000 * 30

const useStyles = makeStyles(theme => ({
    button: { backgroundColor: theme.palette.primary.light, },
    leftIcon: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    btnLabel: {
        fontWeight: 500,
        fontSize: 11,
        color: '#aaa',
        marginLeft: theme.spacing(2)
    },
}))

const formatLibra = amount => {
    return (parseFloat(amount))
        .toFixed(1)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
        .replace('.0', '')
}

export default ({ history, account, setAccount }) => {

    const classes = useStyles()

    const [isRefreshing, setIsRefreshing] = useState(false)
    const onSendLibra = e => history.push('/send')
    const onReceiveLibra = e => history.push('/receive')

    const onRefresh = e => {
        setIsRefreshing(true)
        Axios.get("/v1/refresh").then(res => {
            if (res.status == 200) {
                setAccount(res.data)
            } else if (res.status == 401) {
                setAccount(null)
                history.push('/')
            }
            setIsRefreshing(false)
        })
    }

    return (
        <Fragment>
            <Box
                display="flex" flexDirection="column"
                pb={4} pt={4}
                width="75%">
                <Box display="flex">
                    <Box pr={1}><Icon fontSize="large" className="fas fa-qrcode" /></Box>
                    <Box flexGrow={1}>
                        <Typography variant="h5"
                            style={{ letterSpacing: 0, fontWeight: 500 }}>My Account</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body2" noWrap={true}
                        style={{ letterSpacing: 0, color: '#aaa', fontWeight: 400, fontSize: 12 }}>
                        {account.address}
                    </Typography>
                </Box>
            </Box>
            <Box
                display="flex" flexDirection="column"
                pb={4}
                width="75%">
                <Box>
                    <Typography variant="body2"
                        style={{ letterSpacing: 0, color: '#aaa', fontWeight: 400, fontSize: 13 }}>
                        {"Current balance"}
                    </Typography>
                </Box>
                <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="space-between">
                    <Box
                        alignItems="center"
                        display="flex"
                        flexGrow={1}
                        justifyContent="flex-start">
                        <Box pr={1}><LibraSvgIcon /></Box>
                        <Box>
                            <Typography variant="h4">
                                {formatLibra(account.balance)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        {isRefreshing ? <CircularProgress size={42} /> :
                            <Fab
                                color="primary" size="small"
                                aria-label="Refresh" onClick={onRefresh}>
                                <RefreshOutlined fontSize="small" />
                            </Fab>
                        }
                    </Box>
                </Box>
            </Box>
            <Box width="100%" mb={2}>
                <Button onClick={onSendLibra} variant="contained" fullWidth color="primary" className={classes.button}>
                    <Box
                        width="100%"
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between">
                        <Box><SendOutlined fontSize="small" /></Box>
                        <Box flexGrow={1}><Typography variant="body2">Send Libra/Payment</Typography></Box>
                    </Box>
                </Button>
                <Typography variant="body2" className={classes.btnLabel}>
                    Send Libra as Payment or Money Transfer
                </Typography>
            </Box>
            <Box width="100%" mb={2}>
                <Button onClick={onReceiveLibra} variant="contained" fullWidth color="primary" className={classes.button}>
                    <Box
                        width="100%"
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between">
                        <Box><Icon fontSize="small" className="fas fa-qrcode" /></Box>
                        <Box flexGrow={1}><Typography variant="body2">Receive Libra</Typography></Box>
                    </Box>
                </Button>
                <Typography variant="body2" className={classes.btnLabel}>Receive / Accept Payment</Typography>
            </Box>
            <Box width="100%" mb={2}>
                <Button variant="contained" fullWidth color="primary" style={{ backgroundColor: "#5d8035" }}>
                    <Box
                        width="100%"
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between">
                        <Box><Icon fontSize="small" className="fas fa-money-bill-wave" /></Box>
                        <Box flexGrow={1}><Typography variant="body2">Send to M-Pesa (Coming soon)</Typography></Box>
                    </Box>
                </Button>
                <Typography variant="body2" className={classes.btnLabel}>Exchange your Libra via M-Pesa</Typography>
            </Box>
        </Fragment >
    )
}