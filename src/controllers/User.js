const { createAuth } = require('../services/authentication')
const UserModel = require('../models/User')

const User = {
    async login(req, res) {
        const { email, password } = req.body

        if(email && password) {
            const searchedUser = await UserModel.find({ email: email, password: password })
            if(searchedUser.length === 1) {
                const token = createAuth(email, password)
                res.status(200).json({ code: 200, message: "Usuário autenticado com sucesso", token })
                return
            } else {
                return res.status(401).json({ code: 401, message: "Falha na autenticação, verifique os dados e tente novamente" })
            }
        }

        res.status(400).send({ code: 400, message: "Os campos de email e senha são obrigatórios, preencha e tente novamente" })
    },

    async register(req, res) {
        const { email, password, name } = req.body

        if(email && password && name) {
            const user = await UserModel.find({ email: email })

            if(user.length > 0) {
                return res.status(200).json({ code: 200, status: false, message: 'Esse e-mail já está em uso' })
            }
            
            await UserModel.create({ email, password, name })

            res.status(201).json({ code: 201, status: true, message: "Usuário cadastrado com sucesso" })
            return 
        }

        res.status(400).send({ code: 400, status: false, message: "Estão faltando dados obrigatórios, preencha e tente novamente" })
    }
}

module.exports = User