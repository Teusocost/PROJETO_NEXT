const jwt = require('jsonwebtoken')

const Auth = {
    createAuth(email, pass) {
        const secret = process.env.SECRET_JWT

        const token = jwt.sign({
            email: email,
            password: pass
        }, secret)

        return token
    }
}

module.exports = { ...Auth }