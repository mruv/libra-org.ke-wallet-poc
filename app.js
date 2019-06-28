/*var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var restApiRouter = require('./routes/restapi');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/v1', restApiRouter)

module.exports = app;*/



require('dotenv').config()

const { streamWrite, streamEnd, onExit, chunksToLinesAsync, chomp } = require('@rauschma/stringio')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
const { spawn } = require('child_process')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// let libraClientCli

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

app.get('/', function (req, res, next) {
    res.render('index')
})

app.post('/v1/createwallet', async (req, res) => {

    const libra_cli = spawn(
        'docker', ['run', '--mount', `type=bind,source=${__dirname}/wallet,target=/libravolume`, '--rm', '-i', 'libra_client'],
        {stdio: ['pipe', 'pipe', process.stderr]})

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
        console.log(line)
    }

    // console.log(address)
    // if (address) {
    //    await streamWrite(libra_cli.stdin, `account write /wallet_data/${address}\n`)
    // }
    // await streamWrite(libra_cli.stdin, 'quit\n')
    await sleep(3000)

    res.json({ address: address, balance: bal })
})

app.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST} PORT: ${PORT}`)
})