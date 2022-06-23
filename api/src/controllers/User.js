const { createAuth } = require('../services/authentication')

const User = {
    login(req, res) {
        const { email, password } = req.body

        if(email, password) {
            const token = createAuth(email, password)

            res.status(200).json({ code: 200, message: "User authenticated successfully", token })
            return
        }

        res.status(403).send({ code: 403, message: "Incorrect email / password try again" })
    }
}

module.exports = User