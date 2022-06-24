const PostModel = require('../models/Post')

const Post = {
    async createPost(req, res) {
        const { name, company_name, description, symbol, currency, price, userId } = req.body

        if (name && company_name && description && symbol && currency && price && userId) {
            const post = await PostModel.find({ symbol: symbol })

            if (post.length > 0) {
                return res.status(400).json({ code: 400, message: 'Já existe uma ação cadastrada com esse símbolo' })
            }

            await PostModel.create({ name, company_name, description, symbol, currency, price, userId })
            return res.status(201).json({ code: 201, message: 'Ação cadastrada com sucesso!' })
        }

        res.status(400).json({ code: 400, message: 'Algum(s) dados obrigatórios não foram preenchidos, verifique e tente novamente' })
    },

    async readPosts(req, res) {
        const { symbol } = req.query
    }
}

module.exports = Post