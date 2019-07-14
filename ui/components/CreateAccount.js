import {
    Box, TextField, Button
} from "@material-ui/core"
import { useState, Fragment } from "react"
import Axios from 'axios'
import { Progress } from "."
import { makeStyles } from "@material-ui/styles"
import { isValidEmailAddress, isValidMobileNumber } from "../LibraKePocWallet"

// REQ timeout = 30 secs
Axios.defaults.timeout = 1000 * 30

const useStyles = makeStyles(theme => ({
    button: {
        paddingLeft: theme.spacing(1)
    },
    leftIcon: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    input: {
        color: '#333',
        fontWeight: 400
    },
    label: {
        color: '#111',
        fontWeight: 500,
        fontSize: '1em',
        paddingBottom: '3px'
    }
}))

export default ({ setAccount }) => {

    const classes = useStyles()

    const [formConf, setFormConf] = useState({ email: "", phone: "" })
    const [formConfErrs, setFormConfErrs] = useState({ email: false, phone: false })
    const [isCreating, setIsCreating] = useState(false)
    const onInputChange = name => ({ target }) => {
        const { name, value } = target
        setFormConf({ ...formConf, [name]: value })
    }

    const onCreate = e => {

        const isValidEmail = isValidEmailAddress(formConf.email)
        const isValidMobile = isValidMobileNumber(formConf.phone)
        setFormConfErrs({ phone: !isValidMobile, email: !isValidEmail })

        if (isValidEmail && isValidMobile) {
            setIsCreating(true)
            Axios.post('/v1/accounts', { mobileNumber: formConf.phone, emailAddress: formConf.email }).then(res => {
                setIsCreating(true)
                if (res.status == 201) {
                    setAccount(res.data)
                }
            })
        }
    }

    return isCreating ? <Progress label="Setting up your account ..." /> : (
        <Fragment>
            <Box pb={4}>
                <img width="100%" src="/images/libra-ke.png" />
            </Box>
            <Box p={2} width="80%">
                {formConfErrs.email ?
                    <TextField
                        error
                        name="email"
                        value={formConf.email}
                        label="Email Address" placeholder="A valid email address"
                        fullWidth onChange={onInputChange('email')}
                        inputProps={{ className: classes.input }}
                        InputLabelProps={{ shrink: true, className: classes.label }} /> :
                    <TextField
                        name="email"
                        value={formConf.email}
                        label="Email Address" placeholder="A valid email address"
                        fullWidth onChange={onInputChange('email')}
                        inputProps={{ className: classes.input }}
                        InputLabelProps={{ shrink: true, className: classes.label }} />
                }
            </Box>
            <Box p={2} width="80%">
                {formConfErrs.phone ?
                    <TextField
                        error
                        name="phone"
                        value={formConf.phone}
                        label="Mobile Number" placeholder="A valid international phone number e.g. +254766553388"
                        fullWidth onChange={onInputChange('phone')}
                        inputProps={{ className: classes.input }}
                        InputLabelProps={{ shrink: true, className: classes.label }} /> :
                    <TextField
                        name="phone"
                        value={formConf.phone}
                        label="Mobile Number" placeholder="A valid international phone number e.g. +254766553388"
                        fullWidth onChange={onInputChange('phone')}
                        inputProps={{ className: classes.input }}
                        InputLabelProps={{ shrink: true, className: classes.label }} />
                }
            </Box>
            <Box p={2} width="80%">
                <Button fullWidth size="small" variant="contained" color="primary" onClick={onCreate}>
                    Create Account
            </Button>
            </Box>
        </Fragment>
    )
}