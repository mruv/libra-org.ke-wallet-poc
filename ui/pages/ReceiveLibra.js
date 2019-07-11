import { Fragment, useState } from "react"
import {
    Box, ListItemText, ListItem, Avatar, Icon, Button, Snackbar, IconButton
} from "@material-ui/core"
import QRCode from 'qrcode.react'
import { ShareOutlined, ChevronLeftRounded, CloseOutlined } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: '50%'
    },
    primaryText: {
        fontWeight: 500
    },
    secondaryText: {
        fontWeight: 400,
        fontSize: 11,
        color: '#aaa'
    },
    listItem: {
        padding: 0,
        cursor: "pointer"
    },
    listItemText: {
        padding: 0
    }
}))

export default ({ history, account }) => {

    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false)
    const onBack = e => history.goBack()

    const onCopy = e => {
        navigator.clipboard.writeText(account.address).then(() => {
            setIsOpen(true)
        }, error => {
            console.log(error)
        })
    }

    return (
        <Fragment>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                open={isOpen}
                autoHideDuration={3000}
                onClose={() => setIsOpen(false)}
                ContentProps={{ 'aria-describedby': 'message-id', }}
                message="Address copied successfully"
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setIsOpen(false)}>
                        <CloseOutlined />
                    </IconButton>]} />
            <Box width="90%" mt={2}>
                <QRCode
                    size={150}
                    value={account.address} />
            </Box>
            <Box width="90%">
                <ListItemText
                    className={classes.listItemText}
                    primaryTypographyProps={{
                        variant: "body1",
                        noWrap: true,
                        className: classes.primaryText
                    }}
                    secondaryTypographyProps={{
                        variant: "body1",
                        noWrap: true,
                        className: classes.secondaryText
                    }}
                    primary="My Account Address"
                    secondary={account.address} />
            </Box>
            <Box width="90%">
                <ListItem className={classes.listItem} onClick={onCopy}>
                    <Avatar>
                        <Icon fontSize="small" className="far fa-clone" />
                    </Avatar>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: "body1",
                            noWrap: true,
                            className: classes.primaryText
                        }}
                        secondaryTypographyProps={{
                            variant: "body1",
                            noWrap: true,
                            className: classes.secondaryText
                        }}
                        primary="Copy Address" secondary="Copy address to clipboard" />
                </ListItem>
            </Box>
            <Box width="90%">
                <ListItem className={classes.listItem}>
                    <Avatar>
                        <ShareOutlined fontSize="small" />
                    </Avatar>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: "body1",
                            noWrap: true,
                            className: classes.primaryText
                        }}
                        secondaryTypographyProps={{
                            variant: "body1",
                            noWrap: true,
                            className: classes.secondaryText
                        }}
                        primary="Share account address" secondary="Copy address to clipboard" />
                </ListItem>
            </Box>
            <Box mt={4} width="90%">
                <Button onClick={onBack} variant="outlined" fullWidth size="small">
                    <ChevronLeftRounded fontSize="small" />
                    {"Back"}
                </Button>
            </Box>
        </Fragment>
    )
}