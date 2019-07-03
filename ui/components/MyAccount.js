import { Fragment } from "react"
import { Box, Typography, Icon, Button } from "@material-ui/core"
import { LibraSvgIcon } from "."
import { SendOutlined, RefreshOutlined } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"
import classNames from 'classnames'
import LibraKePocWallet from "../LibraKePocWallet";

const useStyles = makeStyles(theme => ({
    button: {
        // paddingLeft: theme.spacing(1),
        backgroundColor: theme.palette.primary.light,
        // color: '#aaa'
    },
    leftIcon: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    btnLabel: {
        fontWeight: 500, fontSize: 11, color: '#aaa', marginLeft: theme.spacing(2)
    },
    avatar: {

    }
}))

const formatLibra = amount => {
    return (parseFloat(amount))
        .toFixed(1)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
        .replace('.0', '')
}

export default ({ history }) => {

    const classes = useStyles()

    const onSendLibra = e => history.push('/send')
    const onReceiveLibra = e => history.push('/receive')

    return (
        <LibraKePocWallet.AccountContext.Consumer>
            {({ account }) => (
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
                                Current balance
                        </Typography>
                        </Box>
                        <Box alignItems="center" display="flex">
                            <Box pr={1}><LibraSvgIcon /></Box>
                            <Box>
                                <Typography variant="h4">
                                    {formatLibra(account.balance)}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Button variant="text" size="small" style={{ paddingLeft: 0, }}>
                                <RefreshOutlined
                                    fontSize="small"
                                    style={{ fontWeight: 500, fontSize: 11, color: '#aaa' }} />
                                <Typography
                                    variant="body1"
                                    style={{ paddingLeft: "8px", fontWeight: 500, fontSize: 11, color: '#aaa' }}>
                                    Click to Refresh
                            </Typography>
                            </Button>
                        </Box>
                    </Box>
                    <Box width="100%" mb={2}>
                        <Button onClick={onSendLibra} variant="contained" fullWidth color="primary" className={classes.button}>
                            <SendOutlined fontSize="small" className={classes.leftIcon} />
                            Send Libra/Payment
                            </Button>
                        <Typography variant="body2" className={classes.btnLabel}>
                            Send Libra as Payment or Money Transfer
                            </Typography>
                    </Box>
                    <Box width="100%" mb={2}>
                        <Button onClick={onReceiveLibra} variant="contained" fullWidth color="primary" className={classes.button}>
                            <Icon fontSize="small" className={classNames("fas fa-qrcode", classes.leftIcon)} />
                            Receive Libra
                        </Button>
                        <Typography variant="body2" className={classes.btnLabel}>
                            Receive / Accept Payment
                    </Typography>
                    </Box>
                    <Box width="100%" mb={2}>
                        <Button variant="contained" fullWidth color="primary" className={classes.button}>
                            <Icon fontSize="small" className={classNames("fas fa-money-bill-wave", classes.leftIcon)} />
                            Send to M-Pesa
                    </Button>
                        <Typography variant="body2" className={classes.btnLabel}>
                            Exchange your Libra via M-Pesa
                    </Typography>
                    </Box>
                </Fragment >
            )}
        </LibraKePocWallet.AccountContext.Consumer>
    )
}