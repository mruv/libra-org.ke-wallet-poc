import { Box, ListItemText, Button } from "@material-ui/core"


export default ({ address, balance }) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            minWidth="75%"
            justifyContent="center">
            <Box p={1}>
                <ListItemText primary="Address" secondary={address} />
            </Box>
            <Box p={1}>
                <ListItemText primary="Balance" secondary={balance} />
            </Box>
            <Box p={1}>
                <Button fullWidth variant="contained" size="large" color="secondary">
                    Send
                </Button>
            </Box>
        </Box>
    )
}