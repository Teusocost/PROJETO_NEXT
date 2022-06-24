const mongoose = require('mongoose')

// Defining the model
const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    company_name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    symbol: {
        type: String,
        require: true
    },
    currency: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
}, { timestamps: true })

// Collection
module.exports = mongoose.model('posts', PostSchema)

