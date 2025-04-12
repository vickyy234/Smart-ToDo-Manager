const express = require('express')
const router = express.Router()
const TodoModel = require('../schema_models/todoModel')
const authMiddleware = require('../authentication/auth')

router.get('/', authMiddleware, async (req, res) => {
    const todos = await TodoModel.find({ userId: req.userId })
    res.json(todos);
})

router.post('/', authMiddleware, async (req, res) => {
    const { task, isCompleted } = req.body;
    const newtask = new TodoModel(({ userId: req.userId, task, isCompleted }))
    await newtask.save()
    res.json(newtask)
})

router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const updated = await TodoModel.findByIdAndU(id, req.body, { new: true })
    res.json(updated)
})

router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    await TodoModel.findByIdAndDelete(id)
    res.json({ Message: 'Task deleted' })
})

module.exports = router