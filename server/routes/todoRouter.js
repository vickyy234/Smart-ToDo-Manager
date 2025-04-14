const express = require('express')
const router = express.Router()
const TodoModel = require('../schema_models/todoModel')
const registerModel = require('../schema_models/registerModel')
const authMiddleware = require('../authentication/auth')

router.get('/', authMiddleware, async (req, res) => {
    const todos = await TodoModel.find({ userId: req.userId })
    const User = await registerModel.findById(req.userId)
    res.json({todos , userName: User.name});
})

router.post('/', authMiddleware, async (req, res) => {
    const { task } = req.body;
    const newtask = new TodoModel(({ userId: req.userId, task }))
    await newtask.save()
    res.json(newtask)
})

router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const updated = await TodoModel.findByIdAndUpdate(id, req.body, { new: true })
    res.json(updated)
})

router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    await TodoModel.findByIdAndDelete(id)
    res.json({ Message: 'Task deleted' })
})

module.exports = router