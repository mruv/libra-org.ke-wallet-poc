import { Box, ListItemText, Button, Typography, Link } from "@material-ui/core"


export default ({ address, balance, onSend }) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            minWidth="75%"
            justifyContent="center">
            <Box p={1}>
                <Typography variant="h4" color="textPrimary">
                    My Account
                </Typography>
            </Box>
            <Box p={1}>
                <ListItemText
                    primary="Address"
                    secondary={(
                        <Link
                            target="_blank" rel="noopener noreferrer"
                            href={`https://libranaut.io/accounts/${address}`}>{address}</Link>)} />
            </Box>
            <Box p={1}>
                <ListItemText primary="Balance" secondary={balance} />
            </Box>
            <Box p={1}>
                <Button
                    fullWidth variant="contained" size="large"
                    color="secondary" onClick={onSend}>
                    Send
                </Button>
            </Box>
        </Box>
    )
}