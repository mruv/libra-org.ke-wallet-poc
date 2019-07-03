import {
    Box, TextField, Button, Grid
} from "@material-ui/core"
import { useState, Fragment } from "react"

export default () => {

    const [formConf, setFormConf] = useState({ email: "", phone: "" })
    const onInputChange = name => ({ target }) => {
        const { name, value } = target
        setFormConf({ ...formConf, [name]: value })
    }

    return (
        <Fragment>
            <Box pb={4}>
                <img width="100%" src="/images/libra-ke.png" />
            </Box>
            <Box p={2} width="80%">
                <TextField
                    name="email"
                    value={formConf.email}
                    label="Email Address" placeholder="Email Address"
                    fullWidth onChange={onInputChange('email')}
                    InputLabelProps={{ shrink: true }} />
            </Box>
            <Box p={2} width="80%">
                <TextField
                    name="phone"
                    value={formConf.phone}
                    label="Mobile Number" placeholder="Mobile Number"
                    fullWidth onChange={onInputChange('phone')}
                    InputLabelProps={{ shrink: true, }} />
            </Box>
            <Box p={2} width="80%">
                <Button fullWidth size="small" variant="contained" color="primary">
                    Create Account
                </Button>
            </Box>
        </Fragment>
    )
}