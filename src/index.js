const express = require('express')
require('./database/app')



const app = express()
app.use(express.json())


const port = process.env.PORT  || 5000


const UserRouter = require('./router/user')
app.use(UserRouter)

const TaskRouter = require('./router/task')
app.use(TaskRouter)

app.listen(port, (req,res)=>{
    console.log('Server is running at '+ port)
})
