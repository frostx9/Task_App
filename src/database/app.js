const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/task-app', {        // task-app...it is a database name
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify:false
})



