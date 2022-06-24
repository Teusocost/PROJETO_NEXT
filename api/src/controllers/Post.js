const PostModel = require('../models/Post')

const Post = {
    async createPost(req, res) {
        const { name, company_name, description, currency, price, userId } = req.body
        let { symbol } = req.body

        if (name && company_name && description && symbol && currency && price && userId) {
            symbol = symbol.toUpperCase()
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
        let { symbol } = req.query

        if(symbol) {
            symbol = symbol.toUpperCase()

            const post = await PostModel.find({ symbol: symbol })

            let results = {}
            results[symbol] = post[0] || { error: true, message: "Não foi possível encontrar nenhuma ação com o símbolo buscado" }

            return res.status(200).json({ code: 200, message: 'ok', results: results, by: 'symbol' })
        }

        res.status(400).json({ code: 400, message: 'É obrigatório o envio de um símbolo'})
    }
}

module.exports = Post