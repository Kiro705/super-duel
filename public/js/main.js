var game = new Phaser.Game(800, 600, Phaser.AUTO)

//environment
var gamesToWin = 3 //3 as a default, can change in game
var inputDelay = 10 // Delay on menu inputs
var powerupTimer = 400 // How long powerups last
var characterArray = ['Chow', 'EvilChow', 'Kagu']

//Player 1
var score = 0
var character = 0
var weapon = 0

//Player 2
var score2 = 0
var character2 = 1
var weapon2 = 0


game.state.add('GameState', GameState)
game.state.add('PreloadState', PreloadState)
game.state.add('BootState', BootState)
game.state.add('MenuState', MenuState)
game.state.add('DuelOptionState', DuelOptionState)
game.state.start('BootState')