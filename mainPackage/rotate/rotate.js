
var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload()
{
    game.load.image('background','map.png');
    game.load.image('bullet', 'assets/sprites/shmup-bullet.png');
    game.load.spritesheet('player', 'move.png', 72, 62, 4);
}

var cursors;
var weapon;
var fireButton;

function create()
{
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'bullet');
    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 600;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 100;

    player = this.add.sprite(400, 300, 'player');
    player.anchor.set(0.5);

    game.physics.arcade.enable(player);
    player.body.drag.set(70);
    player.body.maxVelocity.set(200);
    var walk = player.animations.add('walk', [0,1], 12, true);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(player, 0, 0, true);
    game.camera.follow(player);

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

function update()
{
    if (cursors.up.isDown) {
        game.physics.arcade.accelerationFromRotation(player.rotation, 300, player.body.acceleration);
        player.play('walk');
    }
    else {
        player.body.acceleration.set(0);
    }
    if (cursors.left.isDown) {
        player.body.angularVelocity = -300;
        player.play('walk');
    }
    else if (cursors.right.isDown) {
        player.body.angularVelocity = 300;
        player.play('walk');
    }
    else {
        player.body.angularVelocity = 0;
    }
    if (fireButton.isDown) {
        weapon.fire();
    }
    game.world.wrap(player, 16);
}

//debug info
function render() {
    weapon.debug();
}
