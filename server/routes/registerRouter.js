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
            const token = jwt.sign({ userId: newRegister._id }, process.env.JWT_SECRET, { expiresIn: '30m' })
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 30 * 60 * 1000
            })
            res.status(201).json({ message: 'Account created successfully' })
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err })
    }
})

module.exports = router