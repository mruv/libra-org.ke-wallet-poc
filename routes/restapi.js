const express = require('express')
const libracore = require('libra-core')
const router = express.Router()


router.post("/createwallet", (req, res, next) => {

    const wallet = new libracore.LibraWallet({
        mnemonic: 'upgrade salt toy stable drop paddle'
    });

    // generate a new account
    const account = wallet.newAccount()

    res.json(account)
})

module.exports = router