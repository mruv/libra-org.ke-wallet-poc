import { Box, Typography, TextField, Button } from "@material-ui/core"
import { ArrowBackOutlined, ArrowForwardOutlined } from "@material-ui/icons"

export default ({ amount, address, myBal, handleSend, handleCancel, handleChange }) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            minWidth="75%"
            justifyContent="center">
            <Box p={1}>
                <Typography variant="h4">
                    Transfer Libra Coins
                </Typography>
            </Box>
            <Box p={2}>
                <TextField
                    name="address" value={address} label="Address" placeholder="Libra address"
                    fullWidth margin="normal" variant="outlined"
                    onChange={handleChange('address')} InputLabelProps={{ shrink: true }} />
            </Box>
            <Box p={2}>
                <TextField
                    name="amount" value={amount} type="number" label="Amount" placeholder="amount"
                    fullWidth margin="normal" variant="outlined" onChange={handleChange('amount')}
                    InputLabelProps={{ shrink: true, }}
                    inputProps={{ max: myBal, min: "1" }} />
            </Box>
            <Box p={2} display="flex" flexDirection="row" justifyContent="space-between">
                <Button size="large" variant="outlined" color="secondary" onClick={handleCancel}>
                    <ArrowBackOutlined />
                    <Typography variant="body1" style={{ paddingLeft: "16px" }}>Cancel</Typography>
                </Button>
                <Button size="large" variant="outlined" color="primary" onClick={handleSend}>
                    <Typography variant="body1" style={{ paddingRight: "16px" }}>Send</Typography>
                    <ArrowForwardOutlined />
                </Button>
            </Box>
        </Box>
    )
}