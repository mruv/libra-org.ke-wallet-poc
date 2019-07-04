import LibraKePocWallet from '../LibraKePocWallet'
import { CreateAccount, MyAccount } from '../components'

export default ({ history }) => {

    return (
        <LibraKePocWallet.AccountContext.Consumer>
            {({ account, setAccount }) => account ? (
                <MyAccount history={history} account={account} setAccount={setAccount} />) : (
                    <CreateAccount account={account} setAccount={setAccount} />)}
        </LibraKePocWallet.AccountContext.Consumer>
    )
}