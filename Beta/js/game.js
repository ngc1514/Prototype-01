var text;
var player;
var cursors;

var star;
var stars;
var starList = [];

var level = 0;

var stone;
var stones;

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
    game.load.spritesheet('swamp', 'assets/sprite/swamp.png');
    game.load.spritesheet('swamp2', 'assets/sprite/swamp2.jpg');
    game.load.image('star', 'assets/sprite/star.png');
};

Game.create = function ()
{
    Client.getStones();
    Client.getStars();

    Game.playerMap = {};
    var testKey= game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);

    game.add.tileSprite(0, 0, 1600, 1600, 'background');
    game.world.setBounds(0, 0, 1600, 1600);

    stones = game.add.group();
    stones.enableBody = true;

    stars = game.add.group();
    stars.enableBody = true;

    player = this.add.sprite(Game.spawnPlayer()[0], Game.spawnPlayer()[1], 'sprite'); //game.world.centerX, game.world.centerY, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.enableBody = true;
    game.camera.follow(player);
    player.renderable = false;
    // player.addChild(level);

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
    var newPlayer = Game.playerMap[id];
    newPlayer.x = x;
    newPlayer.y = y;
};

Game.addNewStone = function(x,y){
    var random_boolean = Math.random() >= 0.5;
    if(random_boolean){
        stone = stones.create(x, y, 'swamp');
        game.physics.enable(stone, Phaser.Physics.ARCADE);
        stone.body.immovable = true;
        stone.scale.setTo(0.3,0.3);
    }
    else{
        stone = stones.create(x, y, 'swamp');
        game.physics.enable(stone, Phaser.Physics.ARCADE);
        stone.body.immovable = true;
        stone.scale.setTo(0.3,0.3);
    }
};

Game.addNewStar = function(x,y){
    star = stars.create(x, y, 'star');
    starList += star;
    game.physics.enable(star, Phaser.Physics.ARCADE);
    star.body.immovable = true;
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

//all the key listeners
Game.update = function()
{
    // var hitPlatform = game.physics.arcade.collide(player, stones);
    var hitPlatform = game.physics.arcade.collide(player, stones);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    var hitButt = game.physics.arcade.collide(player, stars);
    if(cursors.up.isDown && (hitPlatform === false)){
        player.y -= 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.down.isDown && (hitPlatform === false)){
        player.y += 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.left.isDown && (hitPlatform === false)){
        player.x -= 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.right.isDown && (hitPlatform === false)){
        player.x += 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if (cursors.up.isDown && hitPlatform) {
        player.y -= 1;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if (cursors.down.isDown && hitPlatform) {
        player.y += 1;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if (cursors.right.isDown && hitPlatform) {
        player.x += 1;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if (cursors.left.isDown && hitPlatform) {
        player.x -= 1;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.up.isDown && hitButt){
        player.y -= 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.down.isDown && hitButt){
        player.y += 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.left.isDown && hitButt){
        player.x -= 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.right.isDown && hitButt){
        player.x += 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if (game.input.activePointer.isDown) {
        Game.showText();
        player.tint = 0xff0000;
        Client.sendLocation(player.x, player.y);
    }
    else if (game.input.activePointer.isUp) {
        Game.showText();
        player.tint = 0xffffff;
        Client.sendLocation(player.x, player.y);
    }
};

function collectStar (player, star) {
    star.kill();
}

//debug text
Game.showText = function () {
    text.setText("Current Location: \n" + player.x + ", " + player.y + "\nTotal player: \n" + Object.keys(Game.playerMap).length);
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