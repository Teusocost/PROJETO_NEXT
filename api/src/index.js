// Dependencies and configs
require('dotenv').config()

const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
const db = require('./database/config')

var { expressjwt: jwt_middleware } = require("express-jwt");
const JWT_CONFIG = { secret: process.env.SECRET_JWT, algorithms: ["HS256"] }

// Controllers
const UserController = require('./controllers/User')
const PostController = require('./controllers/Post')

// Server
const app = express()
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send('Hello world'))

app.post('/api/login', UserController.login)
app.post('/api/users', UserController.register)
app.post('/api/posts', jwt_middleware(JWT_CONFIG), PostController.createPost)
app.get('/api/posts', jwt_middleware(JWT_CONFIG), PostController.readPosts)

// Start the server
const port = process.env.PORT || 4100
app.listen(port, () => console.log('> The server is running on port: ' + port + '\n'))

// Connect to the database
mongoose.connect(db.uri).then(() => {
    console.log("> Succesfully connected to the database")
}).catch((err) => {
    console.log("Have an error to connect to the database: " + err)
})
