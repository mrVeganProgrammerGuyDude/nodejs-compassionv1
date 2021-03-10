const mongoose = require('mongoose')


//THIS WORKS FOR LIVE MONGO DATABASE
// mongoose.connect('mongodb+srv://broccoli:VpuHsmccA15DiqkG@cluster0.o6fdy.mongodb.net/CIAAdb?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })


//OLD ONE THAT WORKS FOR LOCAL DATABASE
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}) 