require('dotenv').config()
const jwt = require('jsonwebtoken')

const Auth = {
    createAuth(email, pass, idUser) {
        const secret = process.env.SECRET_JWT
        
        const token = jwt.sign(
            {
                email: email,
                password: pass,
                idUser: idUser
            },
            secret,
            { expiresIn: '4h' }
        )

        return token
    }
}

module.exports = { ...Auth }