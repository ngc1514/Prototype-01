//Don't run this for now. This is the wrong code.
//Use the camera package.

var platforms;
var score = 0;
var scoreText;

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0}, //300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
function preload ()
{
    this.load.image('sky', 'assets/map.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/move.png',
        { frameWidth: 72, frameHeight: 62 } //32 48 //72 62
    );
}

function create ()
{
    this.add.image(640, 360, 'sky');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(0);//300)

    //game.camera.follow(player); //camera will follow the player

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'up_down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 12,
        repeat: -1
    });


    //stars
    for(var i=0; i<2; i++) {
        stars = this.physics.add.group({
            key: 'star',
            setXY: {x: randomX(), y: randomY(), stepX: randomStep(300, 500), stepY: randomStep(300, 500)} //70 }
        });
    }
    scoreText = this.add.text(16, 16, 'Player X,Y: 0, 0', { fontSize: '32px', fill: '#000' });
    testText = this.add.text(16, 50, 'Waiting for key pressed...', { fontSize: '32px', fill: '#000' });
}

function fireGun(player){
    player.setTint(0xff0000);
}
function releaseGun(player){
    player.setTint();
}

function collectStar (player, star)
{
    //star.disableBody(true, true);
    // score += 10;
    scoreText.setText('Player X,Y: ' + player.x + ", " + player.y);
}

function displayXY(player){
    scoreText.setText('Player X,Y: ' + player.x + ", " + player.y);
}

function displayKeyPressed(bool1){
    testText.setText("Is pressed? " + bool1.toString());
}

function randomX(){
    var x = Math.floor(Math.random() * 1280);
    return x
}
function randomY(){
    var y = Math.floor(Math.random() * 720);
    return y
}

function randomStep(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function hitBomb (player, bomb)
{
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

function update ()
{
    //solve multiple keys problem
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        displayXY(player)
        player.x -= 4;
        player.anims.play('left', true);
    }
    if (cursors.right.isDown) {
        displayXY(player)
        player.x += 4;
        player.anims.play('right', true);
    }
    else if (cursors.up.isDown) {
        displayXY(player);
        player.y -= 4;
        player.anims.play('up_down', true);
    }
    else if (cursors.down.isDown) {
        displayXY(player)
        player.y += 4;
        player.anims.play('up_down', true);
    }
    else if(cursors.space.isDown) {
        fireGun(player);
        displayKeyPressed(true);
    }
    else{
        releaseGun(player);
        displayKeyPressed(false);
        player.anims.play('turn', true);
    }
}