const express = require('express')
const router = express.Router()
const registerModel = require('../schema_models/registerModel')

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await registerModel.findOne({ email })
        if (user) {
            res.status(302).json({ message: 'Account already exists' })
        } else {
            const newRegister = new registerModel({ name, email, password })
            await newRegister.save()
            res.status(201).json({ message: 'Account created successfully' })
        }
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
})

module.exports = router