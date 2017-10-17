var express = require("express");
var app     = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/frontend'));


app.get('/',function(req,res){
  res.sendFile('frontend/index.html');
});




//Socket.io part
var clientsInRoom =[];

var chat = io
    .of('/chat')
    .on('connection', function (socket) {
        socket.on('join', function(roomId, username){
            socket.join(roomId)
            socket.room = roomId;
            socket.username = username;
            console.log(username, "joins room", roomId)

            //save connected user to room
            if (clientsInRoom[roomId] === undefined){
                clientsInRoom[roomId] = [];
            }
            clientsInRoom[roomId].push({[username] : {name: username}})
            io.of('/chat').to(roomId).emit('updateUserConnected', clientsInRoom[roomId])
        })

        socket.on('sendChat', function(message){
            console.log("emitting to room", socket.room, "the message", message)
            socket.broadcast.to(socket.room).emit("updateChat", socket.username, message)
        })
    });

var game_data = io
    .of('/game_data')
    .on('connection', function (socket) {
        socket.on('room', function(roomId){
            console.log("joining room", roomId)
            socket.join(roomId)
            
        })
    });

  
  console.log("Running at Port 3000");
  