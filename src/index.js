const express = require('express')
require('./database/app')
const UserRouter = require('./router/user')
const TaskRouter = require('./router/task')


const app = express()
const port = process.env.PORT  || 5000



app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)



app.listen(port, (req,res)=>{
    console.log('Server is running at '+ port)
})


// const Task = require('./model/task')

// const main = async ()=>{

//     const task = await Task.findById('613f019b52843541f21ef9e3')
//     await task.populate('owner')
//     console.log(task.owner)

// }

// main()


// const User = require('./model/user')

// const main = async ()=>{

//     const user = await User.findById('613f017852843541f21ef9d5')
//     await user.populate('tasks')
//     console.log(user.tasks)

// }
// main()