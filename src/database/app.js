const mongoose = require('mongoose')



mongoose.connect(process.env.MONGODB_URL, {        // task-app...it is a database name
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify:false
})



