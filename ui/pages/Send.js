import { TextField, Button, Box, Typography } from '@material-ui/core'
import { Fragment } from 'react';
import { ArrowBackOutlined, ArrowForwardOutlined } from '@material-ui/icons';

export default ({ address, amount, onChange }) => {

    return (
        <Fragment>
            <Box
                display="flex"
                flexDirection="column"
                minWidth="75%"
                justifyContent="center">
                <Box p={1}>
                    <Typography variant="h6">
                        Transfer Libra Coins
                    </Typography>
                </Box>
                <Box p={2}>
                    <TextField
                        label="Address"
                        placeholder="Libra address"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box p={2}>
                    <TextField
                        label="Amount"
                        placeholder="amount"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box
                    p={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between">
                    <Button size="large" variant="outlined" color="secondary">
                        <ArrowBackOutlined />
                        <Typography variant="body1" style={{ paddingLeft: "16px" }}>Cancel</Typography>
                    </Button>
                    <Button size="large" variant="outlined" color="primary">
                        <Typography variant="body1" style={{ paddingRight: "16px" }}>Send</Typography>
                        <ArrowForwardOutlined />
                    </Button>
                </Box>
            </Box>
        </Fragment>
    )
}