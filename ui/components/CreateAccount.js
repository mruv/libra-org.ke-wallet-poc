import {
    Box, TextField, Button
} from "@material-ui/core"
import { useState, Fragment } from "react"
import Axios from 'axios'
import { Progress } from "."

// REQ timeout = 30 secs
Axios.defaults.timeout = 1000 * 30

export default ({ setAccount }) => {

    const [formConf, setFormConf] = useState({ email: "", phone: "" })
    const [isCreating, setIsCreating] = useState(false)
    const onInputChange = name => ({ target }) => {
        const { name, value } = target
        setFormConf({ ...formConf, [name]: value })
    }

    const onCreate = e => {
        setIsCreating(true)
        Axios.post('/v1/accounts', { mobileNumber: formConf.phone, emailAddress: formConf.email }).then(res => {
            setIsCreating(true)
            if (res.status == 201) {
                setAccount(res.data)
            }
        })
    }

    return isCreating ? <Progress label="Setting up your account ..." /> : (
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
                <Button fullWidth size="small" variant="contained" color="primary" onClick={onCreate}>
                    Create Account
            </Button>
            </Box>
        </Fragment>
    )
}