const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')

const routes = require('./routes')
const app = express()
//Unindo servidor Express com servidores websocket
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUser = {} 

io.on('connection', socket => {
    const { user } = socket.handshake.query
    connectedUser[user] = socket.id
})
mongoose.connect("mongodb+srv://tindevnodejs:root@cluster0-bafbu.mongodb.net/test?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// Middleware que intercepta a conexao para poder inserir valores como socke.io id.
app.use((req, res, next) => {
    req.io = io
    req.connectedUser = connectedUser
    
    return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)