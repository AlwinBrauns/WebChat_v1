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
    
    
    socket.on('msgSend', msg=>{
        if((msg.message + msg.username + msg.date.toString()).length > 1024)
        {
            //alert('Nachricht zu groß!');
            console.log("MESSAGE TO BIG");
        }else{
            console.log(msg);
            console.log((msg.message + msg.username + msg.date.toString()).length)
            socket.broadcast.emit('newMsg', msg);
            socket.emit('newMsg', msg);
        }
    });
});

server.listen(process.env.PORT || 3000, ()=>{
    console.log('Server startet');
});