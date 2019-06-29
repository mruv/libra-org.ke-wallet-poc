import { Account } from '../components'

export default ({ account, history }) => {

    // console.log(history)
    const handleSend = () => {
        history.push('/send')
    }

    return (
        <Account
            onSend={handleSend}
            address={account.address}
            balance={account.balance} />
    )
}