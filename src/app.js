const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const missionRouter = require('./routers/mission')
const cors = require('cors')

const app = express()
app.use(cors()) //The order matters here. I needed to put this above the other app.use cocksuckers
app.use(express.json())
app.use(userRouter)
app.use(missionRouter)

console.log('you suck. This is in index.js in the node files.')

module.exports = app