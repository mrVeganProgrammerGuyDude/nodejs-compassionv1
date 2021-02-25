const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const missionRouter = require('./routers/mission')
const cors = require('cors')

const app = express()
const port = process.env.PORT


app.use(cors()) //The order matters here. I needed to put this above the other app.use cocksuckers




app.use(express.json())
app.use(userRouter)
app.use(missionRouter)
 
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE')
//         return res.status(200).json({});
//     }
//     next()
// })

console.log('you suck. This is in index.js in the node files.')

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const Mission = require('./models/mission')
// const User = require('./models/user')

// const main = async () => {
//     const mission = await Mission.findById('601bd7e031cf29241c7007e6')
//     await mission.populate('author').execPopulate()
//     console.log(mission.author.username)
// }
// const main = async () => {
// const user = await User.findById('6010189b1b0ff8421851f955')
// await user.populate('userMissions').execPopulate()
// console.log(user.userMissions, 'eat poo')
// }
// main()