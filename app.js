require('dotenv').config()

const { streamWrite, streamEnd, onExit, chunksToLinesAsync, chomp } = require('@rauschma/stringio')
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const path = require('path')

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const { spawn } = require('child_process')

app.use(bodyParser.json())
app.use(cors())
app.use(session(
    {'secret': 'HHgsggsysalllkTThsg667ffsgagHgJkd'}
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

// Load the SPA React.js UI
app.get('/', function (req, res, next) {
    res.render('index')
})

app.get("/v1/initialize", (req, res) => {

    if (req.session.account) {
        res.json({found: true, account : req.session.account})
    } else {
        res.json({found : false})
    }
})

// Create a Libra address and Mint some 200 coins
app.post('/v1/createwallet', async (req, res) => {

    const libra_cli = spawn(
        'docker', ['run', '--mount', `type=bind,source=${__dirname}/wallet,target=/libravolume`, '--rm', '-i', 'libra_client'],
        { stdio: ['pipe', 'pipe', process.stderr] })

    await sleep(1000)
    await streamWrite(libra_cli.stdin, 'account create\n')
    await sleep(1000)
    await streamWrite(libra_cli.stdin, `account mint 0 200\n`)
    await sleep(1000)
    await streamWrite(libra_cli.stdin, `query balance 0\n`)
    await sleep(1000)

    let address, bal
    for await (const line of chunksToLinesAsync(libra_cli.stdout)) {
        if (-1 != line.search("Created/retrieved account #0")) {
            address = line.split('account #0 address ')[1].replace('\n', '')
            await streamWrite(libra_cli.stdin, `account write /libravolume/${address}\n`)
            await sleep(1000)
            await streamWrite(libra_cli.stdin, 'quit\n')
        } else if (-1 != line.search("Balance is: ")) {
            bal = line.split('Balance is: ')[1].replace('\n', '')
        }
        // console.log(line)
    }

    // wait till the container has stopped
    await sleep(3000)

    const account = { address: address, balance: bal }
    // keep track
    req.session.account = account

    res.json(account)
})

// Transfer some coins
app.post("/v1/send", async (req, res) => {

    // const { data} = req.
})

// start service
app.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST} PORT: ${PORT}`)
})