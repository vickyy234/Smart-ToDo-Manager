    const express = require('express')
    const router = express.Router()
    const jwt = require('jsonwebtoken')
    const registerModel = require('../schema_models/registerModel')

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await registerModel.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: 'Email not found!' })
            }
            if (user.password != password) {
                return res.status(401).json({ message: 'Incorrect password!' })
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , { expiresIn: '30m' })
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 30 * 60 * 1000
            })
            res.status(200).json({ message: 'Login successful'})
        }
        catch (err) {
            res.status(500).json({ message: 'Server error' })
        }
    })

    module.exports = router