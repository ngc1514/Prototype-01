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

var locList = [];
var starList = [];

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
    makeStone();
    makeStar();
    // console.log("listen and make stones:\n" + locList);
    //console.log("StarList: " + starList);
});

io.on('connection', function(socket)
{
    socket.on('getStones', function(){
        socket.emit('giveStones', locList);
    });

    socket.on('getStars', function(){
        socket.emit('giveStars', starList)
    });

    socket.on('newplayer', function()
    {
        socket.player = {
            id: server.lastPlayderID++,
            x: rndInRange(100, 1400),
            y: rndInRange(100,1400),
            level: 1
        };
        console.log("Player ID: " + socket.player.id);
        console.log("Player x: " + socket.player.x + ", Player y: " + socket.player.y);

        socket.emit('allplayers', getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('newLocation', function(data){
            // console.log('player new location: ' + data.x + ', ' + data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move', socket.player);

            for(var i = 0; i < starList.length; i++){
                if (starList[i][0] >= data.x - 70 && starList[i][0] <= data.x + 70 && starList[i][1] <= data.y + 70 && starList[i][1] >= data.y - 70){
                    starList.splice(i,1);
                    socket.player.level += 1;
                    makeStarOne();
                    socket.broadcast.emit('resetStars');
                    socket.emit('giveStars', starList);
                    socket.emit('levelup', socket.player);

                    var rankList = [];
                    var playerData = getAllPlayers();
                    for(i=0; i<Object.keys(playerData).length; i++)
                    {
                        rankList.push([playerData[i].id, playerData[i].level])
                    }
                    rankList.sort(function(x, y) {
                        if (x[1] < y[1]) {
                            return 1;
                        }
                        if (x[1] > y[1]) {
                            return -1;
                        }
                        return 0;
                    });
                    //console.log("ranking: " + rankList);
                    io.emit('rankList', rankList);
                    // console.log("stars remaining: " + starList);
                    // console.log("Player " + socket.player.id + "'s level is:" + socket.player.level + "\n");
                }
            }
        });

        socket.on('disconnect',function(){
            console.log('Player ' + socket.player.id + " disconnected. \n");
            io.emit('remove', socket.player.id);
        });
    });

    socket.on('test',function(){
        console.log('test received');
    });
});

function makeStone(){
    for(i=0; i<8; i++){
        var x = rndInRange(100, 1300);
        var y = rndInRange(100, 1300);
        locList.push([x,y]);
    }
}

function makeStar(){
    for(var i=0; i < 1; i++){
        //starID =starID + 1
        var x = rndInRange(150, 1300);
        var y = rndInRange(150, 1300);
        starList.push([x,y]);
    }
}

function makeStarOne(){
    var x = rndInRange(300, 1200);
    var y = rndInRange(300, 1200);
    starList.push([x,y]);
    //console.log('Make new ');
}

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player)
            players.push(player);
    });
    return players;
}

function rndInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

