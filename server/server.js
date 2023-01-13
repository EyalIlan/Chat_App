const express = require('express')
const app = express()
const dotnev = require('dotenv')

const http = require('http')
dotnev.config()

const cors = require('cors')

const Mongo = require('./utils/Db/db')
const Socket = require('./utils/common/socket.io')

const UserRoute = require('./Routes/user')
const LoginRoute = require('./Routes/login')
const MessageRoute = require('./Routes/message')
const RoomRoute = require('./Routes/room')
//



const server = http.createServer(app)
const io = Socket.CreateServer(server)

//....
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

Socket.SocketEvents(io)

app.use(LoginRoute)
app.use('/user',UserRoute)
app.use('/message',MessageRoute)
app.use('/room', RoomRoute)


Mongo.mongoConnect()
//
//
app.use((err,req,res,next) =>{
    console.log(err);
    res.status(400).json({error:err.message})
    next()
})
////..

server.listen(process.env.PORT || 5000,(req,res) =>{
    console.log('Server is running on port 5000');
})


//////