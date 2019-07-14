require('dotenv').config()

const { streamWrite, streamEnd, onExit, chunksToLinesAsync, chomp } = require('@rauschma/stringio')
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const path = require('path')
const { LibraAccount, connectToDb } = require('./mongodb')

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const { spawn } = require('child_process')

app.use(bodyParser.json())
app.use(cors())
app.use(session(
    { 'secret': 'HHgsggsysalllkTThsg667ffsgagHgJkd' }
))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getLibraCli = () => {
    return spawn(
        'docker', ['run', '--mount', `type=bind,source=${__dirname}/wallet,target=/libravolume`, '--rm', '-i', 'libra_client'],
        { stdio: ['pipe', 'pipe', process.stderr] }
    )
}

// Load the SPA React.js UI
app.get('/', (req, res, next) => res.render('index'))

app.post("/v1/verifyLogin", async (req, res) => {
    const { login } = req.body
    const count = await LibraAccount.find()
        .or([{ emailAddress: login }, { mobileNumber: login }])
        .countDocuments()

    // console.log(count)
    res.sendStatus(count ? 200 : 404)
})

app.get("/v1/initialize", (req, res) => {

    if (req.session.account) {
        res.json({ found: true, account: req.session.account })
    } else {
        res.json({ found: false })
    }
})

// Create a Libra account and Mint some 200 coins
app.post('/v1/accounts', async (req, res) => {

    const { mobileNumber, emailAddress } = req.body
    const libra_cli = getLibraCli()

    await sleep(1000)
    await streamWrite(libra_cli.stdin, `account recover /libravolume/client.mnemonic\n`)
    await sleep(1000)
    await streamWrite(libra_cli.stdin, 'account create\n')
    await sleep(1000)

    let address, bal
    for await (const line of chunksToLinesAsync(libra_cli.stdout)) {
        if (-1 != line.search("Created/retrieved account #")) {
            address = line.split('address ')[1].replace('\n', '')
            await streamWrite(libra_cli.stdin, `account mint ${address} 200000\n`)
            await sleep(1000)
            await streamWrite(libra_cli.stdin, `query balance ${address}\n`)
            await sleep(1000)
            await streamWrite(libra_cli.stdin, `account write /libravolume/client.mnemonic\n`)
            await sleep(1000)
            await streamWrite(libra_cli.stdin, 'quit\n')
            await sleep(2000)
        } else if (-1 != line.search("Balance is: ")) {
            bal = line.split('Balance is: ')[1].replace('\n', '')
        }
    }

    // persist
    const newAccount = new LibraAccount({
        mobileNumber: mobileNumber,
        emailAddress: emailAddress,
        address: address
    })
    await newAccount.save()
    req.session.account = {
        address: address,
        balance: bal,
        mobileNumber: mobileNumber,
        emailAddress: emailAddress
    }

    res.status(201).json(req.session.account)
})

// Refresh account balance
app.get("/v1/refresh", async (req, res) => {
    const { address = '' } = req.session.account

    if (address) {
        const libra_cli = getLibraCli()
        await sleep(1000)
        await streamWrite(libra_cli.stdin, `query balance ${address}\n`)
        await sleep(1000)

        let balance
        for await (const line of chunksToLinesAsync(libra_cli.stdout)) {
            if (-1 != line.search("Balance is: ")) {
                balance = line.split('Balance is: ')[1].replace('\n', '')
                await streamWrite(libra_cli.stdin, 'quit\n')
                await sleep(1000)
            }
        }

        req.session.account = {
            ...req.session.account, ['balance']: balance
        }

        res.status(200).json(req.session.account)
    } else {
        res.status(401)
    }
})

// Transfer some coins
app.post("/v1/transfers", async (req, res) => {

    const { type, value, amount } = req.body
    const { address, balance } = req.session.account

    let dstAddr = ''
    switch (type) {
        case 'address':
            dstAddr = value
            break
        case 'phone':
        case 'email':
            const libraAcct = await LibraAccount.findOne({
                [type == 'email' ? 'emailAddress' : 'mobileNumber']: value
            })

            if (libraAcct) {
                dstAddr = libraAcct.address
            }
            break
    }

    const libra_cli = getLibraCli()

    await sleep(1000)
    await streamWrite(libra_cli.stdin, `account recover /libravolume/client.mnemonic\n`)
    await sleep(1000)
    await streamWrite(libra_cli.stdin, `transfer ${address} ${address} 0\n`)
    await sleep(2000)
    await streamWrite(libra_cli.stdin, `transfer ${address} ${dstAddr} ${amount}\n`)
    await sleep(2000)
    await streamWrite(libra_cli.stdin, `query balance ${address}\n`)
    await sleep(1000)

    let newBalance
    for await (const line of chunksToLinesAsync(libra_cli.stdout)) {
        if (-1 != line.search("Balance is: ")) {
            newBalance = line.split('Balance is: ')[1].replace('\n', '')
            await streamWrite(libra_cli.stdin, 'quit\n')
            await sleep(1000)
        }
    }

    // console.log("BALANCE : ", newBalance)
    if (newBalance == balance) {
        res.json({ isSuccess: false })
    } else {
        req.session.account.balance = newBalance
        res.json({ isSuccess: true, account: req.session.account })
    }
})

// connect to MongoDB first
connectToDb().then(async () => {
    // start service
    app.listen(PORT, HOST, () => {
        console.log(`Server is running on ${HOST} PORT: ${PORT}`)
    })
})