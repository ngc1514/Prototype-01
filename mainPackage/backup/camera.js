
var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload()
{
    game.load.image('background','map.png');
    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.spritesheet('player', 'move.png', 72, 62, 4);
}

var facing = 'up'; //Its a string - left right up down
var player;
var cursors;
var weapon;

function create()
{
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'bullet');
    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 1600;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 250;

    player = this.add.sprite(game.world.centerX, game.world.centerY, 'player');
    player.anchor.set(0.5);

    game.physics.arcade.enable(player);
    var walk = player.animations.add('walk', [0,1], 12, true);

    weapon.trackSprite(player, 0, 0);
    game.camera.follow(player);

    cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // text = game.add.text(player.x, player.y, "- facing: \n", {
    //     font: "25px Arial",
    //     fill: "#ff0044",
    //     align: "center"
    // });
    // text.anchor.setTo(0.5, 0.5);
}

function update()
{
    //player.body.setZeroVelocity();
    if(cursors.up.isDown){
        facing = 'up';
        player.y -= 5;
        //player.body.moveUp(300);
        player.play('walk');
    }
    if(cursors.down.isDown){
        facing = 'down';
        player.y += 5;
        //player.body.moveDown(300);
        player.play('walk');
    }
    if(cursors.left.isDown){
        facing = 'left';
        player.x -= 5;
        //player.body.velocity.x = -300;
        player.play('walk');
    }
    if(cursors.right.isDown){
        facing = 'right';
        player.x += 5;
        //player.body.moveRight(300);
        player.play('walk');
    }
    if (this.spaceKey.isDown) {
        player.tint = 0xff0000;
        if (facing == "left") {
            weapon.fireAngle = Phaser.ANGLE_LEFT;
        } else if (facing == "right") {
            weapon.fireAngle = Phaser.ANGLE_RIGHT;
        } else if (facing == "up") {
            weapon.fireAngle = Phaser.ANGLE_UP;
        } else if (facing == "down") {
            weapon.fireAngle = Phaser.ANGLE_DOWN;
        }
        weapon.fire();
    }
    else if(this.spaceKey.isUp){
        player.tint = 0xffffff;
    }
}

//show script for debuggin
// function showFacing() {
//     text.setText("- facing: \n" + facing)
// }

//debug info
function render() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 600);
    game.debug.text(facing, 600, 32);
    //game.debug.text(cursors.up.isDown, 500, 80);
    weapon.debug(1000, 32);
}
