var express = require("express")
var cors = require('cors')
var socket = require('socket.io')
var itemsRouter = require( './routes/items')

// App setup : create server
const app = express()
const port = 3000
const server = app.listen(port, function(){
    console.log('Listening to requests on port ' + port)
})

app.use(cors())
app.use('/items', itemsRouter)

// Socket setup : reference to a socket connection made on the server
var io = socket(server)
// Look for a connection and execute a callback function which fires
io.on('connection', function(socket){
    console.log('a user connected')

    socket.on('GET_READY', function(){
        console.log('READY')
        io.emit('BE_READY')

        // get random time between 2s and 6s
        const milliseconds = 1000 * Math.round(Math.random() * (6 - 2) + 2)
        const date = Date.now() + milliseconds
        setTimeout(() => {
            io.emit('GAME_ON', date)
        }, 2500)
    })

    socket.on('LAUNCH_GAME', function(){
        console.log('GAME')

        // get random time between 2s and 6s
        const milliseconds = 1000 * Math.round(Math.random() * (6 - 2) + 2)
        const date = Date.now() + milliseconds

        io.emit('GAME_ON', date)
    })

    socket.on('SET_WINNER', function(id){
        console.log('WINNER')
        io.emit('GET_WINNER', id)
    })

    socket.on('SET_LOOSER', function(id){
        console.log('LOOSER')
        io.emit('GET_LOOSER', id)
    })
})
