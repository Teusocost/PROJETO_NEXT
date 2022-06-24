require('dotenv').config()

module.exports = {
    uri: `mongodb+srv://projeto-3-utfpr:${process.env.DB_PASS}@project-3.hmd9b.mongodb.net/?retryWrites=true&w=majority`
};