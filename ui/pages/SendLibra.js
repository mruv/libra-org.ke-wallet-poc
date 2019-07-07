import { Fragment, useState } from "react"
import { Box, TextField, Button, Icon } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import classNames from 'classnames'
import { ErrorOutlineRounded } from "@material-ui/icons"
import Axios from "axios"

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

export default ({ history, setAccount }) => {

    const classes = useStyles()
    const [formConf, setFormConf] = useState({ email: "", phone: "", address: "" })
    const [isDisabled, setIsDisabled] = useState(true)
    const onInputChange = name => ({ target }) => {
        const { name, value } = target
        let newFormConf = { ...formConf }

        const fnames = ['phone', 'address', 'email']
        fnames.forEach(n => {
            newFormConf = {
                ...newFormConf,
                [name == n ? name : n]: name == n ? value : ''
            }
        })
        setIsDisabled(value == '')
        setFormConf(newFormConf)
    }

    const onCancel = e => history.goBack()
    const onConfirm = e => {
        const fnames = ['phone', 'address', 'email']
        let postData = null
        fnames.forEach(n => {
            if (formConf[n]) {
                postData = {
                    type: n,
                    value: formConf[n]
                }
            }
        })

        if (postData) {
            Axios.post("/v1/transfers", postData).then(res => {

                if (res.status == 200) {
                    // update balance
                } else if (res.status == 404) {
                    // destination account not found
                }
            })
        }
    }

    return (
        <Fragment>
            <Box pb={4} width="80%" border={1} height={100}>

            </Box>
            <Box p={2} width="80%">
                <TextField
                    name="address"
                    value={formConf.address}
                    label="or Send to address" placeholder="Libra Address"
                    fullWidth onChange={onInputChange('address')}
                    inputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: true, className: classes.label }} />
            </Box>
            <Box p={2} width="80%">
                <TextField
                    name="email"
                    value={formConf.email}
                    label="or Send to email" placeholder="E-mail Address"
                    fullWidth onChange={onInputChange('email')}
                    inputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: true, className: classes.label }} />
            </Box>
            <Box p={2} width="80%">
                <TextField
                    color="default"
                    name="phone"
                    value={formConf.phone}
                    label="or Send to Mobile number" placeholder="Mobile Number"
                    fullWidth onChange={onInputChange('phone')}
                    inputProps={{ className: classes.input }}
                    InputLabelProps={{ shrink: true, className: classes.label }} />
            </Box>
            <Box p={2} width="80%">
                <Button
                    disabled={isDisabled} fullWidth size="small"
                    variant="contained" color="primary" onClick={onConfirm}>
                    <Icon fontSize="small" className={classNames("far fa-check-circle", classes.leftIcon)} />
                    Confirm
                </Button>
            </Box>
            <Box p={2} width="80%">
                <Button onClick={onCancel} fullWidth size="small" variant="contained" color="default">
                    <ErrorOutlineRounded fontSize="small" className={classes.leftIcon} />
                    Cancel
                </Button>
            </Box>
        </Fragment>
    )
}