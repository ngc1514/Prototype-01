var text;
//var player;
var cursors;

var tempX;
var tempY;

var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function()
{
    game.load.image('background', 'assets/sprite/map.png');
    game.load.spritesheet('sprite', 'assets/sprite/move.png', 72, 62, 4);
    // game.load.image('sprite','assets/sprite/guy.png');
};

Game.create = function ()
{
    Game.playerMap = {};
    var testKey= game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);

    game.add.tileSprite(0, 0, 1280, 720, 'background');//; 5000, 5000, 'background');
    game.world.setBounds(0, 0, 1280, 720); //5000, 5000);

    player = this.add.sprite(Game.spawnPlayer()[0], Game.spawnPlayer()[1], 'sprite'); //game.world.centerX, game.world.centerY, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.enableBody = true;

    var walk = player.animations.add('walk', [0,1], 10, true);
    game.camera.follow(player); //camera will follow the player
    cursors = this.input.keyboard.createCursorKeys();

    text = game.add.text(1050, 30, "Current Location: \n", {
        font: "25px Arial",
        fill: "#ff0044",
        align: "center"
    });
    text.fixedToCamera = true;
    Client.askNewPlayer();
};

Game.addNewPlayer = function(id, x, y){
    Game.playerMap[id] = game.add.sprite(x, y,'sprite');
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    // var distance = Phaser.Math.distance(player.x,player.y,x,y);
    // var tween = game.add.tween(player);
    // var duration = distance*10;
    // tween.to({x:x,y:y}, duration);
    // tween.start();
    player.x = x;
    player.y = y;
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

//all the key listeners
Game.update = function()
{
    if(cursors.up.isDown){
        player.y -= 10;
        // player.play('walk');
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.down.isDown){
        player.y += 10;
        // player.play('walk');
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.left.isDown){
        player.x -= 10;
        // player.play('walk');
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.right.isDown){
        player.x += 10;
        // player.play('walk');
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if (game.input.activePointer.isDown) {
        Game.showText();
        player.tint = 0xff0000;
        Client.sendLocation(tempX, tempY);
    }
    else if (game.input.activePointer.isUp) {
        Game.showText();
        player.tint = 0xffffff;
        Client.sendLocation(tempX, tempY);
    }
};

//debug text
Game.showText = function () {
    text.setText("Current Location: \n" + player.x + ", " + player.y);
};

Game.spawnPlayer = function(){
    var x = Math.floor(Math.random()*1280);
    var y = Math.floor(Math.random()*720);
    return [x, y];
};

//debug info
Game.render = function() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 600);
    game.debug.spriteInfo(player, 32, 350);
};