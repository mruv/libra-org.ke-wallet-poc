import { Fragment, useState } from "react"
import {
    Box, TextField, Button, Icon, Stepper, Step,
    StepLabel, StepContent, Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import classNames from 'classnames'
import { ErrorOutlineRounded } from "@material-ui/icons"
import Axios from "axios"
import { Progress, SendDone } from "../components"
import QrReader from 'react-qr-scanner'

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
    const [formConf, setFormConf] = useState({ email: "", phone: "", address: "", amount: 0 })
    const [isConfirmDisabled, setisConfirmDisabled] = useState(true)
    const [isNextDisabled, setIsNextDisabled] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitOk, setIsSubmitOk] = useState(false)
    const [activeStep, setActiveStep] = useState(0)

    const onInputChange = name => ({ target }) => {
        const { name, value } = target
        let newFormConf = { ...formConf }

        if (name == 'amount') {
            newFormConf.amount = value
            setisConfirmDisabled(value == '')
        } else {
            const fnames = ['phone', 'address', 'email']
            fnames.forEach(n => {
                newFormConf = {
                    ...newFormConf,
                    [name == n ? name : n]: name == n ? value : ''
                }
            })
            setIsNextDisabled(value == '')
        }
        setFormConf(newFormConf)
    }

    const onGoBack = e => history.goBack()
    const onConfirmTransfer = e => {
        const fnames = ['phone', 'address', 'email']
        let postData = { amount: formConf.amount }
        fnames.forEach(n => {
            if (formConf[n]) {
                postData = {
                    ...postData,
                    type: n,
                    value: formConf[n]
                }
            }
        })

        if (postData['type']) {
            setIsSubmitting(true)
            Axios.post("/v1/transfers", postData).then(res => {
                const { account = null, isSuccess } = res.data
                setIsSubmitting(false)
                setIsSubmitted(true)
                setIsSubmitOk(isSuccess)

                if (isSuccess) {
                    setAccount(account)
                }
            })
        }
    }

    const handleScan = (content) => {
        if (content) {
            const newFormConf = { ...formConf }
            newFormConf.address = content
            setFormConf(newFormConf)
            setActiveStep(1)
        }
    }

    if (isSubmitting) {
        return <Progress label="Processing request ..." />
    } else if (isSubmitted) {
        return <SendDone isSuccess={isSubmitOk} onGoBack={onGoBack} />
    } else {
        return (
            <Fragment>
                <Stepper
                    style={{ width: '100%', paddingLeft: 0, paddingRight: 0 }}
                    activeStep={activeStep}
                    orientation="vertical">
                    <Step>
                        <StepLabel>Select Mode</StepLabel>
                        <StepContent>
                            <Box pb={4} width="100%" border={1}>
                                <QrReader
                                    style={{ height: 300, width: '100%' }}
                                    onError={(error) => console.log(error)}
                                    onScan={handleScan} />
                            </Box>
                            <Box pt={2} width="100%">
                                <TextField
                                    name="address"
                                    value={formConf.address}
                                    label="or Send to address" placeholder="Libra Address"
                                    fullWidth onChange={onInputChange('address')}
                                    inputProps={{ className: classes.input }}
                                    InputLabelProps={{ shrink: true, className: classes.label }} />
                            </Box>
                            <Box pt={2} width="100%">
                                <TextField
                                    name="email"
                                    value={formConf.email}
                                    label="or Send to email" placeholder="E-mail Address"
                                    fullWidth onChange={onInputChange('email')}
                                    inputProps={{ className: classes.input }}
                                    InputLabelProps={{ shrink: true, className: classes.label }} />
                            </Box>
                            <Box pt={2} width="100%">
                                <TextField
                                    color="default"
                                    name="phone"
                                    value={formConf.phone}
                                    label="or Send to Mobile number" placeholder="Mobile Number"
                                    fullWidth onChange={onInputChange('phone')}
                                    inputProps={{ className: classes.input }}
                                    InputLabelProps={{ shrink: true, className: classes.label }} />
                            </Box>
                            <Box pt={2} width="100%">
                                <Button
                                    disabled={isNextDisabled} fullWidth size="small"
                                    variant="contained" color="primary" onClick={() => setActiveStep(1)}>
                                    <Typography variant="body2">Next</Typography>
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Amount of Libra to be send.</StepLabel>
                        <StepContent>
                            <Box pt={2} width="100%">
                                <TextField
                                    name="amount"
                                    value={formConf.amount}
                                    label="Amount" placeholder="Amount"
                                    fullWidth onChange={onInputChange('amount')}
                                    type="number"
                                    inputProps={{ className: classes.input }}
                                    InputLabelProps={{ shrink: true, className: classes.label }} />
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
                <Box pt={2} width="100%">
                    <Button
                        disabled={isConfirmDisabled} fullWidth size="small"
                        variant="contained" color="primary" onClick={onConfirmTransfer}>
                        <Icon fontSize="small" className={classNames("far fa-check-circle", classes.leftIcon)} />
                        <Typography variant="body2">Confirm</Typography>
                    </Button>
                </Box>
                <Box pt={2} width="100%">
                    <Button onClick={onGoBack} fullWidth size="small" variant="contained" color="default">
                        <ErrorOutlineRounded fontSize="small" className={classes.leftIcon} />
                        <Typography variant="body2">Cancel</Typography>
                    </Button>
                </Box>
            </Fragment>
        )
    }
}