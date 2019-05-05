var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection',function(socket){

    socket.on('newplayer', function()
    {
        socket.player = {
            id: server.lastPlayderID++,
            x: Math.floor(Math.random()*1280),
            y: Math.floor(Math.random()*720)
        };
        console.log("Player ID: " + socket.player.id);
        console.log("Player x: " + socket.player.x + ", Player y: " + socket.player.y);
        socket.emit('allplayers', getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('newLocation', function(data){
            console.log('player new location: ' + data.x + ', ' + data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move',socket.player);
        });

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });

    socket.on('test',function(){
        console.log('test received');
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player)
            players.push(player);
    });
    return players;
}
