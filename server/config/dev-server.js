var env = require('./env')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var defaultErrorHandler = require('./handlers').defaultErrorHandler
var corsOptions = require('./handlers').corsOptions
var api = require('../models')
var session = require('../authentication/sessions')
var Auth = require('../authentication/auth')

// ENABLE ROUTES IF USING app SIDE ROUTING
// import routes from './routes'

let app = express()
let server = require('http').createServer(app)

function Validate(req, res, next) {
    // ONLY ALLOW GET METHOD IF NOT LOGGED IN 
    console.log(req.session)
    if (req.method !== 'GET' && !req.session.uid) {
        return res.status(401).send({ error: 'Please Login or Register to continue' })
    }
    return next()
}

function logger(req, res, next) {
    console.log('INCOMING REQUEST', req.url)
    next()
}

// REGISTER MIDDLEWARE
app.use(session)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('*', logger)
app.use('*', cors(corsOptions))
app.use('/', Auth)

// LOCKS API TO REQUIRE USER AUTH
app.use(Validate)
app.use('/api', api)
app.use('/', defaultErrorHandler)

//region ****** CAREFUL SOCKETS BELOW **********
let io = require('socket.io')(server, {
    origins: '*:*'
})


let connectedUsers = {}
let rooms = {
    general: {
        name: 'General',
        users: {},
        moderators: {},
        banned: {}
    }
}

function Room(name, client) {
    this.name = name
    this.users = {}
    this.moderators = {}
    this.moderators[client.userId] = client
    this.users[client.userId] = client
    this.banned = {}
    rooms[name.toLowerCase()] = this
}

function joinRoom(socket, roomName, client) {
    var room = rooms[roomName.toLowerCase()] || new Room(roomName, client)
    socket.join(room.name)
    room.users[client.userId] = client
    socket.to(room.name).emit('userJoined', {
        userId: client.userId,
        name: client.name
    })
    socket.emit('joinedRoom', room)
    return room
}

io.on('connection', function (socket) {
    var client = {}
    var activeRoom = {}

    socket.emit('CONNECTED', {
        socket: socket.id,
        message: 'you made it to sockets',
        connectedUsers
    })

    socket.on('setUser', (user) => {
        client = {
            userId: user._id,
            name: user.name
        }
        connectedUsers[user._id] = client
        joinRoom(socket, client.userId, client)
        activeRoom = joinRoom(socket, rooms.general.name, client)
        socket.broadcast.emit('userConnected', client)
    })

    socket.on('update', payload => {
        socket.broadcast.emit('receiveUpdate', payload)
    })

    socket.on('joinRoom', roomName => {
        activeRoom = joinRoom(socket, roomName, client)
    })

    socket.on('leaveRoom', roomName => {
        if (roomName.toLowerCase() == 'general' || roomName == client.userId) { return }
        socket.leave(roomName)
        socket.to(roomName).emit('userLeft', client)
        socket.emit('leftRoom', rooms.general)
    })

    socket.on('disconnect', () => {
        delete connectedUsers[client._id]
        //CLEANUP ROOM USERs
        socket.broadcast.emit('userDisconnected', client._id)
    })

})

//endregion

module.exports = server