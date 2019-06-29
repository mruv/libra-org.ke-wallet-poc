import {
    Typography, Button, CircularProgress
} from '@material-ui/core'
import { AddSharp } from '@material-ui/icons'
import { Account } from '../components'

export default ({ isCreatingWallet, onCreateWallet, account, history }) => {

    // console.log(history)
    const handleSend = () => {
        history.push('/send')
    }

    if (account) {
        return (
            <Account
                onSend={handleSend}
                address={account.address}
                balance={account.balance} />)
    } else {
        return (
            <Button variant="contained" onClick={onCreateWallet}>
                <AddSharp color="secondary" fontWeight="700" fontSize="small" />
                <Typography variant="body1">Create Your Account</Typography>
            </Button>
        )
    }

    /*if (isCreatingWallet) {
        return <CircularProgress size={28} />
    } else {

        
    }*/
}