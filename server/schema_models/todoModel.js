const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    task: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() }
})

const TodoModel = mongoose.model('todoDetails', TodoSchema)

module.exports = TodoModel