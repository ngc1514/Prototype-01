var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("Enter key test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y){
    Client.socket.emit('click',{x:x,y:y});
};

Client.sendLocation = function(x,y){
  Client.socket.emit('newLocation', {x:x, y:y});
};

Client.getStones = function(){
    Client.socket.emit('getStones');
};
Client.socket.on('giveStones', function(data){
    for(var i =0; i< data.length; i++){
        Game.addNewStone(data[i][0], data[i][1]);
    }
});

Client.socket.on('resetStars', function () {
    Game.resetGroup();
});

Client.socket.on('giveStars', function(data){
    //need to reset star list
    for(var i = 0; i < data.length; i++){
        Game.addNewStar(data[i][0], data[i][1]);
    }
});

Client.getStars = function(){
    Client.socket.emit('getStars');
};

Client.socket.on('rankList', function (rankList) {
    Game.showRanking(rankList);
});

Client.levelUp = function(starData){
    Client.socket.emit('levelup', starData);
};

Client.socket.on('levelup', function(data){
    Game.levelup(data.id, data.level);
});

Client.socket.on('newplayer', function(data){
    Game.addNewPlayer(data.id, data.x, data.y);
});

//data is a list of all players
Client.socket.on('allplayers',function(data)
{
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }

    Client.socket.on('move', function(data){
        Game.movePlayer(data.id, data.x, data.y);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});
