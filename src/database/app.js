const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/New-Task', {        // task-app...it is a database name
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify:false
})


