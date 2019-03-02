var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var facing = 'up'; //Its a string - left right up down
var player;
var cursors;
var weapon;

var playerID;
var HP;
var currentLoc;
var isAlive;
var playerX;
var playerY;

var bullets;
var nextFire = 0;
var fireRate = 100;


function preload() {
    game.load.image('background','map.png');
    game.load.image('bullet', 'fireball.png');
    game.load.spritesheet('player', 'move.png', 72, 62, 4); //size 72, 62, 4 fps
}

//create instances and variables that are necessary for the game
function create()
{
    game.add.tileSprite(0, 0, 5000, 5000, 'background');
    game.world.setBounds(0, 0, 5000, 5000);

    // weapon = game.add.weapon(30, 'bullet');
    // weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    // weapon.bulletSpeed = 1300;
    // weapon.fireRate = 250;

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(10, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    player = this.add.sprite(spawnPlayer()[0], spawnPlayer()[1], 'player'); //game.world.centerX, game.world.centerY, 'player');
    player.anchor.set(0.5);

    game.physics.arcade.enable(player); //use arcade physics package
    var walk = player.animations.add('walk', [0,1], 10, true);

    //weapon.trackSprite(player, 0, 0);
    game.camera.follow(player); //camera will follow the player

    cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

//all the key listeners
function update()
{
    if(cursors.up.isDown){
        facing = 'up';
        player.y -= 5;
        player.play('walk');
    }
    if(cursors.down.isDown){
        facing = 'down';
        player.y += 5;
        player.play('walk');
    }
    if(cursors.left.isDown){
        facing = 'left';
        player.x -= 5;
        player.play('walk');
    }
    if(cursors.right.isDown){
        facing = 'right';
        player.x += 5;
        player.play('walk');
    }
    // if (this.spaceKey.isDown) {
    //     player.tint = 0xff0000;
    //     if (facing == "left") {
    //         weapon.fireAngle = Phaser.ANGLE_LEFT;
    //     } else if (facing == "right") {
    //         weapon.fireAngle = Phaser.ANGLE_RIGHT;
    //     } else if (facing == "up") {
    //         weapon.fireAngle = Phaser.ANGLE_UP;
    //     } else if (facing == "down") {
    //         weapon.fireAngle = Phaser.ANGLE_DOWN;
    //     }
    //     weapon.fire();
    // }
    // if(this.spaceKey.isUp){
    //     player.tint = 0xffffff;
    // }
    if (game.input.activePointer.isDown)
    {
        fire();
    }
}

//spawn player. Location will be random.
function spawnPlayer(){
    var x = Math.floor(Math.random()*5000);
    var y = Math.floor(Math.random()*5000);
    return [x, y];
}

//debug info
function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 600);
    game.debug.text(facing, 600, 32);
    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 600, 600);
    game.debug.spriteInfo(player, 32, 450);
}

//send player json data to server
function sendJson(player)
{
    var returnDict = {
        "PlayerID": "",
            "Current_HP": HP,
            "Current_location": [player.x, player.y], //[3000, 3000],
            "Held_weapon": "NA",
            "current_ammo": 0,
            "isAlive": true
    }
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(player.x - 8, player.y - 8);
        game.physics.arcade.moveToPointer(bullet, 500);
    }

}

