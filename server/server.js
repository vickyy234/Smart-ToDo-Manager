const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log("Server started at port", process.env.PORT);
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB connected")
    })
    .catch((err) => {
        console.log("DB not connected")
    })

app.get('/', (req, res) => {
    (mongoose.connection.readyState === 1) ?
        res.send(`<h1>Server is Running</h1> <h1 style="color:green">Database connnected successfully!!</h1>`) :
        res.send(`<h1>Server is Running</h1> <h1 style="color:red;">Database not connnected! Check connection string</h1>`)
})

const registerRoute = require('./routes/registerRouter')
app.use('/api', registerRoute)

const loginRoute = require('./routes/loginRouter')
app.use('/api', loginRoute)

const TodoModel = require('./schema_models/todoModel')
app.use('/todos',TodoModel)