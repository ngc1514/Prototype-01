//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures
var game = new Phaser.Game(1280, 720, Phaser.AUTO, document.getElementById('game')); //window.innerWidth, window.innerHeight
game.state.add('Game',Game);
game.state.start('Game');
//test upload