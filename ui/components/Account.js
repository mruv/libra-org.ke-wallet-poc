import { ListItem, Box, ListItemText, Avatar, Button } from "@material-ui/core"


export default ({ address, balance }) => {

    {/* <Avatar src="/images/libra.png" /> */ }
    return (
        <Box>
            <Box display="flex" justifyContent="center" justifyItems="center">
                <ListItemText primary="Address" secondary={address} />
            </Box>
            <Box display="flex" justifyContent="center" justifyItems="center">
                <ListItemText primary="Balance" secondary={balance} />
            </Box>
            <Box display="flex" justifyContent="center" justifyItems="center">
                <Button variant="contained">
                    Send
                </Button>
            </Box>
        </Box>
    )
}