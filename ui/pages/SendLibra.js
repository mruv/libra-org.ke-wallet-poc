import { Fragment, useState } from "react"
import {
    Box, TextField, Button, Icon, Stepper, Step,
    StepLabel, StepContent, Typography, CircularProgress, IconButton, Snackbar
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { ErrorOutlineRounded, CloseOutlined } from "@material-ui/icons"
import Axios from "axios"
import { Progress, SendDone } from "../components"
import QrReader from 'react-qr-scanner'
import {
    isValidEmailAddress, isValidLibraAddress,
    isValidMobileNumber, isValidAmount
} from "../LibraKePocWallet"

Axios.defaults.timeout = 1000 * 30

const useStyles = makeStyles(theme => ({
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

const validatePostData = (data) => {
    const { email = "", phone = "", address = "" } = data

    if (email) {
        return { isValid: isValidEmailAddress(email), type: 'email' }
    } else if (phone) {
        return { isValid: isValidMobileNumber(phone), type: 'phone' }
    } else if (address) {
        return { isValid: isValidLibraAddress(address), type: 'address' }
    } else {
        return { isValid: false }
    }
}

export default ({ history, setAccount, account }) => {

    const classes = useStyles()
    const [formConf, setFormConf] = useState({ email: "", phone: "", address: "", amount: 10 })
    const [formConfErrs, setFormConfErrs] = useState({ email: false, phone: false, address: false, amount: false })
    const [isNextDisabled, setIsNextDisabled] = useState(true)
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitOk, setIsSubmitOk] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [isVerifying, setIsVerifying] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const onInputChange = name => ({ target }) => {
        const { name, value } = target
        let newFormConf = { ...formConf }
        if (formConf[name] == "" && name != 'amount') {
            setFormConfErrs({ ...formConfErrs, email: false, phone: false, address: false })
        }

        if (name == 'amount') {
            newFormConf.amount = value
            setFormConfErrs({ ...formConfErrs, 'amount': !isValidAmount(value, account.balance) })
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

    const onNext = (e) => {
        const { type = "", isValid } = validatePostData(formConf)
        if (type) {
            setFormConfErrs({ ...formConfErrs, [type]: !isValid })
        }

        if (isValid) {
            if (type == "email" || type == "phone") {
                setIsNextDisabled(true)
                setIsConfirmDisabled(true)
                setIsVerifying(true)
                Axios.post("/v1/verifyLogin", { login: formConf[type] }).then(res => {
                    setIsVerifying(false)
                    setIsNextDisabled(false)
                    setIsConfirmDisabled(false)
                    setActiveStep(1)
                    setFormConfErrs({ ...formConfErrs, [type]: false })
                }).catch(error => {
                    setIsVerifying(false)
                    setIsNextDisabled(false)
                    setIsOpen(true)
                    setFormConfErrs({ ...formConfErrs, [type]: true })
                })
            } else {
                setActiveStep(1)
                setIsConfirmDisabled(false)
            }
        }
    }

    const onGoBack = e => history.goBack()
    const onConfirmTransfer = e => {

        setIsNextDisabled(true)
        if (isValidAmount(formConf.amount, account.balance)) {
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
                    setIsNextDisabled(false)
                    setIsSubmitting(false)
                    setIsSubmitted(true)
                    setIsSubmitOk(isSuccess)

                    if (isSuccess) {
                        setAccount(account)
                    }
                })
            }
        }
    }

    const handleScan = (content) => {
        if (content) {
            const newFormConf = { ...formConf }
            newFormConf.address = content
            setFormConf(newFormConf)
            setActiveStep(1)
            setIsConfirmDisabled(false)
        }
    }

    if (isSubmitting) {
        return <Progress label="Processing request ..." />
    } else if (isSubmitted) {
        return <SendDone isSuccess={isSubmitOk} onGoBack={onGoBack} />
    } else {
        return (
            <Fragment>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                    open={isOpen}
                    autoHideDuration={3000}
                    onClose={() => setIsOpen(false)}
                    ContentProps={{ 'aria-describedby': 'message-id', }}
                    message="Libra account not found"
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => setIsOpen(false)}>
                            <CloseOutlined />
                        </IconButton>]} />
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
                                    onError={(error) => { }}
                                    onScan={handleScan} />
                            </Box>
                            <Box pt={2} width="100%">
                                {formConfErrs.address ?
                                    <TextField
                                        error
                                        name="address"
                                        value={formConf.address}
                                        label="or Send to address" placeholder="Libra Address"
                                        fullWidth onChange={onInputChange('address')}
                                        inputProps={{ className: classes.input }}
                                        InputLabelProps={{ shrink: true, className: classes.label }} /> :
                                    <TextField
                                        name="address"
                                        value={formConf.address}
                                        label="or Send to address" placeholder="Libra Address"
                                        fullWidth onChange={onInputChange('address')}
                                        inputProps={{ className: classes.input }}
                                        InputLabelProps={{ shrink: true, className: classes.label }} />
                                }
                            </Box>
                            <Box pt={2} width="100%">
                                {formConfErrs.email ?
                                    <TextField
                                        error
                                        name="email"
                                        value={formConf.email}
                                        label="or Send to email" placeholder="E-mail Address"
                                        fullWidth onChange={onInputChange('email')}
                                        inputProps={{ className: classes.input }}
                                        InputLabelProps={{ shrink: true, className: classes.label }} /> :
                                    <TextField
                                        name="email"
                                        value={formConf.email}
                                        label="or Send to email" placeholder="E-mail Address"
                                        fullWidth onChange={onInputChange('email')}
                                        inputProps={{ className: classes.input }}
                                        InputLabelProps={{ shrink: true, className: classes.label }} />
                                }
                            </Box>
                            <Box pt={2} width="100%">
                                {formConfErrs.phone ?
                                    <TextField
                                        error
                                        color="default"
                                        name="phone"
                                        value={formConf.phone}
                                        label="or Send to Mobile number" placeholder="Mobile Number"
                                        fullWidth onChange={onInputChange('phone')}
                                        inputProps={{ className: classes.input }}
                                        InputLabelProps={{ shrink: true, className: classes.label }} /> :
                                    <TextField
                                        color="default"
                                        name="phone"
                                        value={formConf.phone}
                                        label="or Send to Mobile number" placeholder="Mobile Number"
                                        fullWidth onChange={onInputChange('phone')}
                                        inputProps={{ className: classes.input }}
                                        InputLabelProps={{ shrink: true, className: classes.label }} />
                                }
                            </Box>
                            <Box pt={2} width="100%">
                                <Button
                                    disabled={isNextDisabled} fullWidth size="small"
                                    variant="contained" color="primary" onClick={onNext}>
                                    {isVerifying ? (
                                        <Box
                                            width="100%"
                                            alignItems="center"
                                            display="flex"
                                            justifyContent="space-between">
                                            <Box><CircularProgress size={16} color="inherit" /></Box>
                                            <Box flexGrow={1}><Typography variant="body2">Verifying account ...</Typography></Box>
                                        </Box>) :
                                        <Typography variant="body2">Next</Typography>}
                                </Button>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Amount of Libra to be send.</StepLabel>
                        <StepContent>
                            <Box pt={2} width="100%">
                                {formConfErrs.amount ?
                                    <TextField
                                        error
                                        name="amount"
                                        value={formConf.amount}
                                        label="Amount" placeholder="Amount"
                                        fullWidth onChange={onInputChange('amount')}
                                        type="number"
                                        inputProps={{ className: classes.input }}
                                        InputLabelProps={{ shrink: true, className: classes.label }} /> :
                                    <TextField
                                        name="amount"
                                        value={formConf.amount}
                                        label="Amount" placeholder="Amount"
                                        fullWidth onChange={onInputChange('amount')}
                                        type="number"
                                        inputProps={{ className: classes.input }}
                                        InputLabelProps={{ shrink: true, className: classes.label }} />
                                }
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
                <Box pt={2} width="100%">
                    <Button
                        disabled={isConfirmDisabled} fullWidth size="small"
                        variant="contained" color="primary" onClick={onConfirmTransfer}>
                        <Box
                            width="100%"
                            alignItems="center"
                            display="flex"
                            justifyContent="space-between">
                            <Box><Icon fontSize="small" className="far fa-check-circle" /></Box>
                            <Box flexGrow={1}><Typography variant="body2">Confirm</Typography></Box>
                        </Box>
                    </Button>
                </Box>
                <Box pt={2} width="100%">
                    <Button style={{ backgroundColor: "#adadad" }} onClick={onGoBack} fullWidth size="small" variant="contained" color="default">
                        <Box
                            width="100%"
                            alignItems="center"
                            display="flex"
                            justifyContent="space-between">
                            <Box><ErrorOutlineRounded fontSize="small" /></Box>
                            <Box flexGrow={1}><Typography variant="body2">Cancel</Typography></Box>
                        </Box>
                    </Button>
                </Box>
            </Fragment>
        )
    }
}