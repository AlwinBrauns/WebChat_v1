const express = require('express')
const app = express()
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket=>{
    console.log('A new Client connected with the Server');
    
    if(msg.length > 256)
    {
        alert('Nachricht zu groß!');
        return;
    }
    socket.on('msgSend', msg=>{
        console.log(msg);
        socket.broadcast.emit('newMsg', msg);
    });
});

server.listen(process.env.PORT || 3000, ()=>{
    console.log('Server startet');
});