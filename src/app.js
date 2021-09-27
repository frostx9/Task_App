const express = require('express')
require('./database/app')
const UserRouter = require('./router/user')
const TaskRouter = require('./router/task')

const app = express()

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)


module.exports = app



