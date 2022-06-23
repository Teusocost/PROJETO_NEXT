const jwt = require('jsonwebtoken')

const Auth = {
    createAuth(email, pass) {
        const secret = process.env.SECRET_JWT

        const token = jwt.sign({
            email: email,
            password: pass,
            feature: [1,2,3]
        }, secret)

        return token
    }
}

module.exports = { ...Auth }