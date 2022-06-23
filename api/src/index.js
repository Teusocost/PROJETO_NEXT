var { expressjwt: jwt_middleware } = require("express-jwt");
const express = require('express')
require('dotenv').config()

const app = express()
app.use(express.json())

const UserController = require('./controllers/User')

app.post('/api/users/login', UserController.login)

app.use('/api/users/posts', jwt_middleware({ secret: process.env.SECRET_JWT, algorithms: ["HS256"] }))

function MiddlewareSession(req, res, next) {
    console.log('Middleware')
    next()
}

const port = process.env.PORT || 4100

app.listen(port, () => console.log('The server is running on port: ' + port))