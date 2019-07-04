import LibraKePocWallet from '../LibraKePocWallet'
import { CreateAccount, MyAccount } from '../components'

export default ({ history }) => {

    return (
        <LibraKePocWallet.AccountContext.Consumer>
            {({ account }) => !account ? <MyAccount history={history} /> : <CreateAccount />}
        </LibraKePocWallet.AccountContext.Consumer>
    )
}