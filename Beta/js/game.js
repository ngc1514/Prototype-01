var text;
var player;
var cursors;

var bullets;
var fireRate = 300;
var nextFire = 0;

var stone;
var stones;
var stoList = [];

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
    game.load.spritesheet('stone', 'assets/sprite/stone.png');
    game.load.image('bullet', 'assets/sprite/fireball.png');
};

Game.create = function ()
{
    Client.getStones();

    Game.playerMap = {};
    var testKey= game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);

    game.add.tileSprite(0, 0, 1500, 1500, 'background');
    game.world.setBounds(0, 0, 1500, 1500);

    stones = game.add.group();
    stones.enableBody = true;

    player = this.add.sprite(Game.spawnPlayer()[0], Game.spawnPlayer()[1], 'sprite'); //game.world.centerX, game.world.centerY, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.enableBody = true;

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

Game.addNewStone = function(x,y){
    stone = stones.create(x, y, 'stone');
    game.physics.enable(stone, Phaser.Physics.ARCADE);
    stone.body.immovable = true;
    stone.scale.setTo(0.5,0.5);
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
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
    var hitPlatform = game.physics.arcade.collide(player, stones);

    if(cursors.up.isDown){
        player.y -= 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.down.isDown){
        player.y += 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.left.isDown){
        player.x -= 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if(cursors.right.isDown){
        player.x += 7;
        tempX = player.x;
        tempY = player.y;
        Client.sendLocation(tempX, tempY);
    }
    if (cursors.up.isDown && hitPlatform) {
        player.x = tempX;
        player.y = tempY + 20;
        Client.sendLocation(player.x, player.y);
    }
    if (cursors.down.isDown && hitPlatform) {
        player.x = tempX;
        player.y = tempY - 20;
        Client.sendLocation(player.x, player.y);
    }
    if (cursors.right.isDown && hitPlatform) {
        player.x = tempX - 20;
        player.y = tempY;
        Client.sendLocation(player.x, player.y);
    }
    if (cursors.left.isDown && hitPlatform) {
        player.x = tempX + 20;
        player.y = tempY;
        Client.sendLocation(player.x, player.y);
    }
    if (game.input.activePointer.isDown) {
        Game.showText();
        // fire();
        player.tint = 0xff0000;
        Client.sendLocation(player.x, player.y);
    }
    else if (game.input.activePointer.isUp) {
        Game.showText();
        player.tint = 0xffffff;
        Client.sendLocation(player.x, player.y);
    }
};

Game.fire = function () {
    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(player.x - 8, player.y - 8);
        game.physics.arcade.moveToPointer(bullet, 800);
    }
};

Game.bulletHitStone = function (bullet) {
    bullet.kill();
};

//debug text
Game.showText = function () {
    text.setText("Current Location: \n" + player.x + ", " + player.y + "\nTotal player: \n" + Game.playerMap.length);
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