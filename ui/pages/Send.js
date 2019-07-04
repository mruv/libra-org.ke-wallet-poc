import { useState } from 'react'
import Axios from 'axios'
import { SendForm, SendDone, SendLoader, Progress } from '../components'

Axios.defaults.timeout = 1000 * 30

export default ({ myBal, history, updateAccount }) => {

    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({ address: '', amount: 0 })

    const handleCancel = () => {
        history.goBack()
    }

    const handleSend = () => {

        setIsSending(true)
        Axios.post("/v1/send", {
            rcvrAddress: formData.address,
            amount: formData.amount
        }).then(res => {
            const { isSuccess, account } = res.data
            if (isSuccess) {
                updateAccount(account)
            }
            setIsSending(false)
            setIsSent(true)
            setIsSuccess(isSuccess)
        })
    }

    const handleChange = name => e => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleGoBack = () => {
        history.goBack()
    }

    if (isSending)
        return <Progress label="Sending Libra ..." />

    if (isSent) {
        return <SendDone isSuccess={isSuccess} onGoBack={handleGoBack} />
    }

    return (
        <SendForm
            {...formData} myBal={myBal}
            handleSend={handleSend}
            handleChange={handleChange}
            handleCancel={handleCancel} />
    )
}