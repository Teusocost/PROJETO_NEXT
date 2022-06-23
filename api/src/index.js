// Dependencies and configs
var { expressjwt: jwt_middleware } = require("express-jwt");
const express = require('express')
const mongoose = require('mongoose')
const db = require('./database/config')
require('dotenv').config()

const port = process.env.PORT || 4100

// Controllers
const UserController = require('./controllers/User')

// Server
const app = express()
app.use(express.json())


// Routes
app.post('/api/users/login', UserController.login)
app.post('/api/users', UserController.register)

app.use('/api/users/posts', jwt_middleware({ secret: process.env.SECRET_JWT, algorithms: ["HS256"] }))

// Start server and connect database
app.listen(port, () => console.log('> The server is running on port: ' + port + '\n'))

mongoose.connect(db.uri).then(() => {
    console.log("> Succesfully connected to the database")
}).catch((err) => {
    console.log("Have an error to connect to the database: " + err)
})
