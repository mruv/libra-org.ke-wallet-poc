import { Fragment } from "react"
import {
    Box, ListItemText, ListItem, Avatar, Icon, Button
} from "@material-ui/core"
import QRCode from 'qrcode.react'
import { ShareOutlined, ChevronLeftRounded } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: '50%'
    }
}))

export default ({ history }) => {

    const onBack = e => history.goBack()
    return (
        <Fragment>
            <Box width="90%" mt={2}>
                <QRCode
                    size={150}
                    value="987092e9a29cc9579189d0bb38187e609216ed86ab7abd3a95025fad44f2e139" />
            </Box>
            <Box width="90%">
                <ListItemText
                    primaryTypographyProps={{
                        variant: "body1",
                        noWrap: true,
                        style: {
                            fontWeight: 500
                        }
                    }}
                    secondaryTypographyProps={{
                        variant: "body1",
                        noWrap: true,
                        style: {
                            fontWeight: 400, fontSize: 11, color: '#aaa'
                        }
                    }}
                    primary="My Account Address"
                    secondary="987092e9a29cc9579189d0bb38187e609216ed86ab7abd3a95025fad44f2e139" />
            </Box>
            <Box width="90%">
                <ListItem>
                    <Avatar>
                        <Icon fontSize="small" className="far fa-clone" />
                    </Avatar>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: "body1",
                            noWrap: true,
                            style: {
                                fontWeight: 500
                            }
                        }}
                        secondaryTypographyProps={{
                            variant: "body1",
                            noWrap: true,
                            style: {
                                fontWeight: 400, fontSize: 11, color: '#aaa'
                            }
                        }}
                        primary="Copy Address" secondary="Copy address to clipboard" />
                </ListItem>
            </Box>
            <Box width="90%">
                <ListItem>
                    <Avatar>
                        <ShareOutlined fontSize="small" />
                    </Avatar>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: "body1",
                            noWrap: true,
                            style: {
                                fontWeight: 500
                            }
                        }}
                        secondaryTypographyProps={{
                            variant: "body1",
                            noWrap: true,
                            style: {
                                fontWeight: 400, fontSize: 11, color: '#aaa'
                            }
                        }}
                        primary="Share account address" secondary="Copy address to clipboard" />
                </ListItem>
            </Box>
            <Box mt={4} width="90%">
                <Button onClick={onBack} variant="outlined" fullWidth size="small">
                    <ChevronLeftRounded fontSize="small" /> Back
                </Button>
            </Box>
        </Fragment>
    )
}