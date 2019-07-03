import { Fragment, useState } from "react"
import { Box, TextField, Button, Icon } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import classNames from 'classnames'
import { ErrorRounded, ErrorOutlineRounded, DoneOutlineRounded } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
    button: {
        // margin: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    leftIcon: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
}))

export default () => {

    const classes = useStyles()
    const [formConf, setFormConf] = useState({ email: "", phone: "", address: "" })
    const onInputChange = name => ({ target }) => {
        const { name, value } = target
        setFormConf({ ...formConf, [name]: value })
    }

    return (
        <Fragment>
            <Box pb={4} width="80%" border={1} height={100}>

            </Box>
            <Box p={2} width="80%">
                <TextField
                    name="address"
                    value={formConf.email}
                    label="or Send to address" placeholder="Libra Address"
                    fullWidth onChange={onInputChange('address')}
                    InputLabelProps={{ shrink: true }} />
            </Box>
            <Box p={2} width="80%">
                <TextField
                    name="email"
                    value={formConf.phone}
                    label="or Send to email" placeholder="E-mail Address"
                    fullWidth onChange={onInputChange('email')}
                    InputLabelProps={{ shrink: true, }} />
            </Box>
            <Box p={2} width="80%">
                <TextField
                    name="phone"
                    value={formConf.phone}
                    label="or Send to Mobile number" placeholder="Mobile Number"
                    fullWidth onChange={onInputChange('phone')}
                    InputLabelProps={{ shrink: true, }} />
            </Box>
            <Box p={2} width="80%">
                <Button fullWidth size="small" variant="contained" color="primary">
                    <Icon fontSize="small" className={classNames("far fa-check-circle", classes.leftIcon)} />
                    Confirm
                </Button>
            </Box>
            <Box p={2} width="80%">
                <Button fullWidth size="small" variant="contained" color="default">
                    <ErrorOutlineRounded fontSize="small" className={classes.leftIcon} />
                    Cancel
                </Button>
            </Box>
        </Fragment>
    )
}