var game = new Phaser.Game(800, 600, Phaser.AUTO)

//environment
var gamesToWin = 5
//var stars

//Player 1
var score = 0

//Player 2
var score2 = 0


game.state.add('GameState', GameState)
game.state.add('PreloadState', PreloadState)
game.state.add('BootState', BootState)
game.state.start('BootState')