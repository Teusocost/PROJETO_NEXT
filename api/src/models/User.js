const mongoose = require('mongoose')

// Defining the model
const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true })

// Collection
module.exports = mongoose.model('users', UserSchema)

