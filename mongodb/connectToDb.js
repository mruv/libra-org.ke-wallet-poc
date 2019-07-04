const Mongoose = require('mongoose')

module.exports.connectToDb = () => {
    return Mongoose
        .connect(
            'mongodb://librawallet:LIBRA2019#mruv@localhost:27017/LibraWallet',
            { useNewUrlParser: true }
        )
}