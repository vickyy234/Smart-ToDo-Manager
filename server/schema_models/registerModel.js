const mongoose = require('mongoose')

const register_schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: Number, required: true }
})

const registerModel = mongoose.model('user_register_datas', register_schema)

module.exports = registerModel