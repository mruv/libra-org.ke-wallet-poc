const Mongoose = require('mongoose')

const LibraAccountSchema = new Mongoose.Schema({
    mobileNumber: {
        type: String,
        unique: true
    },
    address: {
        type: String,
        unique: true
    },
    emailAddress: {
        type: String,
        unique: true
    }
})

LibraAccountSchema.statics.findByLogin = async (login) => {

    let account = await this.findOne({ address: login })
    if (!account) {
        account = await this.findOne({ emailAddress: login })
    }

    if (!account) {
        account = await this.findOne({ mobileNumber: login })
    }

    return account
} 

module.exports.LibraAccount = Mongoose.model('LibraAccount', LibraAccountSchema)