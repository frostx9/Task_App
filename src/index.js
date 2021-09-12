const express = require('express')
require('./database/app')
const UserRouter = require('./router/user')
const TaskRouter = require('./router/task')



const app = express()
const port = process.env.PORT  || 5000

// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send("Get Request is disabled")
//     }else{
//         next()
//     }
// })



app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)



app.listen(port, (req,res)=>{
    console.log('Server is running at '+ port)
})
