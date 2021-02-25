const mongoose = require('mongoose')



mongoose.connect('mongodb+srv://broccoli:DnkiaozXrTkRti5f@cluster0.o6fdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})


//OLD ONE THAT WORKS FOR LOCAL DATABASE
// mongoose.connect('mongodb://127.0.0.1:27017/CIAAdb', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })