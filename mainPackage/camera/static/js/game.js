var text;
var player;
var cursors;

// single objects
var tank;
var stones;
var enemy;

var enemies; // a list with all enemies
var enemyBullets;
var enemiesTotal = 0;
var enemiesAlive = 0;

var bullets;
var fireRate = 300;
var nextFire = 0;

var infoDict = {
    "playerID": "",
    "playerHP": 0,
    "currentLoc": [0,0], //[3000, 3000],
    "isAlive": true
};
var playerID;
var playerHP;
var isAlive;

var tempX;
var tempY;

//create Enemy objects
Enemy = function (index, game, tank, bullets) {
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.health = 2;
    this.enemy = tank;
    this.bullets = bullets;
    this.fireRate = 700;
    this.nextFire = 0;
    this.alive = true;

    this.tank = game.add.sprite(x, y, 'enemy');
    this.tank.anchor.set(0.5);
    this.tank.name = index.toString();
    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);
    this.tank.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);
};
Enemy.prototype.damage = function()
{
    this.health -= 1;
    if (this.health <= 0) {
        this.alive = false;
        this.tank.kill();
        return true;
    }
    return false;
};
Enemy.prototype.update = function()
{
    if (this.game.physics.arcade.distanceBetween(this.tank, this.enemy) < 300)
    {
        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.enemy, 500);
        }
    }
};


var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function url_for(category, assetName) {
    // the returned urls should point to a static file handler (nginx, flask, etc)
    return category + assetName;
}

function preload() {
    game.load.image('background', url_for('static/image/', 'map.png'));
    game.load.image('bullet', url_for('static/image/', 'fireball.png'));
    game.load.spritesheet('player', url_for('static/image/', 'move.png'), 72, 62, 4); //size 72, 62, 4 fps
    game.load.spritesheet('enemy', url_for('static/image/', 'ghost.png'));
    game.load.spritesheet('stone', url_for('static/image/', 'stone.png'));
}

//create instances and variables that are necessary for the game
function create()
{
    game.add.tileSprite(0, 0, 2000, 2000, 'background');//; 5000, 5000, 'background');
    game.world.setBounds(0, 0, 2000, 2000); //5000, 5000);

    tank = game.add.sprite(0, 0, 'enemy');
    game.physics.enable(tank, Phaser.Physics.ARCADE);
    //game.physics.startSystem(Phaser.Physics.ARCADE);
    tank.body.collideWorldBounds = true;

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(5, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    //  The enemies bullet group
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(100, 'bullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  Create enemies
    enemies = [];
    enemiesTotal = 30;
    enemiesAlive = 30;
    for (var i = 0; i < enemiesTotal; i++) {
        enemies.push(new Enemy(i, game, tank, enemyBullets));
    }

    player = this.add.sprite(spawnPlayer()[0], spawnPlayer()[1], 'player'); //game.world.centerX, game.world.centerY, 'player');
    player.anchor.set(0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.enableBody = true;
    playerHP = 2;
    isAlive = player.alive;

    //create stones
    stones = game.add.group();
    stones.enableBody = true;
    for(var i=0; i < 20; i++){
        stone = stones.create(game.world.randomX, game.world.randomY, 'stone');
        game.physics.enable(stone, Phaser.Physics.ARCADE);
        stone.body.immovable = true;
        stone.scale.setTo(0.5,0.5);
    }

    var walk = player.animations.add('walk', [0,1], 10, true);
    game.camera.follow(player); //camera will follow the player

    cursors = this.input.keyboard.createCursorKeys();
    text = game.add.text(game.world.centerX, game.world.centerY, "Current_loc: \n", {
        font: "25px Arial",
        fill: "#ff0044",
        align: "center"
    });
    text.fixedToCamera = true;
    text.cameraOffset.setTo(500, 400);
}

//all the key listeners
function update()
{
    var hitPlatform = game.physics.arcade.collide(player, stones);
    game.physics.arcade.overlap(enemyBullets, tank, bulletHitPlayer, null, this);
    enemiesAlive = 0;
    for (var i = 0; i < enemies.length; i++)
    {
        if (enemies[i].alive)
        {
            enemiesAlive++;
            game.physics.arcade.collide(stones, enemies[i].tank);
            game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
            enemies[i].update();
        }
    }
    game.physics.arcade.overlap(bullets, stones, bulletHitStone, null, this);

    if(cursors.up.isDown){
        showText();
        player.y -= 4;
        updateStatus();
        player.play('walk');
        tempX = player.x;
        tempY = player.y;
    }
    if(cursors.down.isDown){
        showText();
        player.y += 4;
        updateStatus();
        player.play('walk');
        tempX = player.x;
        tempY = player.y;
    }
    if(cursors.left.isDown){
        showText();
        player.x -= 4;
        updateStatus();
        player.play('walk');
        tempX = player.x;
        tempY = player.y;
    }
    if(cursors.right.isDown){
        showText();
        player.x += 4;
        updateStatus();
        player.play('walk');
        tempX = player.x;
        tempY = player.y;
    }
    if (game.input.activePointer.isDown) {
        showText();
        player.tint = 0xff0000;
        updateStatus();
        fire();
    }
    if (cursors.up.isDown && hitPlatform) {
        txt();
        player.x = tempX;
        player.y = tempY + 23;
    }
    if (cursors.down.isDown && hitPlatform) {
        txt();
        player.x = tempX;
        player.y = tempY - 23;
    }
    if (cursors.right.isDown && hitPlatform) {
        txt();
        player.x = tempX - 23;
        player.y = tempY;
    }
    if (cursors.left.isDown && hitPlatform) {
        txt();
        player.x = tempX + 23;
        player.y = tempY;
    }
    else if (game.input.activePointer.isUp) {
        showText();
        player.tint = 0xffffff;
        updateStatus();
    }
}

//debug text
function showText() {
    text.setText("Current_loc: \n" + player.x + ", " + player.y + "\n" +
        "playerHp is: " + playerHP + ", " + isAlive + "\n" +
        "enemies[0] HP is: " + enemies[0].health + ", " + enemies[0].alive);
}

function txt(){
    text.setText('aaaaaaaaaaa');
}

//spawn player randomly
function spawnPlayer(){
    var x = Math.floor(Math.random()*5000);
    var y = Math.floor(Math.random()*5000);
    return [x, y];
}

function fire() {
    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(player.x - 8, player.y - 8);
        game.physics.arcade.moveToPointer(bullet, 800);
    }
}

function bulletHitEnemy (tank, bullet) {
    tank.tint = 0xff0000;
    bullet.kill();
    enemies[tank.name].damage();
}
function bulletHitPlayer (tank, bullet) {
    playerHP--;
    if(playerHP <= 0) {
        bullet.kill();
        player.kill();
    }
    else{
        bullet.kill();
    }
}
function bulletHitStone (bullet) {
    bullet.kill();
}

//return a json string with player information
function toJson()
{
    return JSON.stringify(infoDict);
}
function updateStatus(){
    infoDict['playerID'] = playerID;
    infoDict['playerHP'] = playerHP;
    infoDict['currentLoc'] = [player.x, player.y];
    infoDict['isAlive'] = player.alive;
}
function postData(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/update", true);
    xhr.setRequestHeader("Content-Type", toJson());
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // var json = JSON.parse(xhr.responseText);
            // console.log(json.email + ", " + json.password);
        }
    };
    var data = JSON.stringify(infoDict);
    xhr.send(data);
}


//debug info
function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 600);
    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 900, 60);
    game.debug.spriteInfo(player, 32, 350);
    game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 900, 32);
}