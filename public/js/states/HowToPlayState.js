const HowToPlayState = {

    preload: function() {

    },

    create: function() {
        //Load Background and Text
        this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'city')
        game.add.text(62, 58, 'W,A,S,D for Player 1 and Arrow Keys for Player 2', {font: '24pt Impact', fill: 'black'})
        game.add.text(62, 138, 'Move Left or Right with those Arrow Keys', {font: '24pt Impact', fill: 'black'})
        game.add.text(62, 218, 'Jump or Double Jump with the Up Arrow', {font: '24pt Impact', fill: 'black'})
        game.add.text(62, 298, 'Down + Left or Down + Right to Attack in that direction', {font: '24pt Impact', fill: 'black'})
        game.add.text(62, 378, 'Get the Power-Ups to help defeat your opponent', {font: '24pt Impact', fill: 'black'})
        game.add.text(62, 458, 'Spacebar to select and Backspace to go back', {font: '24pt Impact', fill: 'black'})
        game.add.text(65, 60, 'W,A,S,D for Player 1 and Arrow Keys for Player 2', {font: '24pt Impact', fill: 'white'})
        game.add.text(65, 140, 'Move Left or Right with those Arrow Keys', {font: '24pt Impact', fill: 'white'})
        game.add.text(65, 220, 'Jump or Double Jump with the Up Arrow', {font: '24pt Impact', fill: 'white'})
        game.add.text(65, 300, 'Down + Left or Down + Right to Attack in that direction', {font: '24pt Impact', fill: 'white'})
        game.add.text(65, 380, 'Get the Power-Ups to help defeat your opponent', {font: '24pt Impact', fill: 'white'})
        game.add.text(65, 460, 'Spacebar to select and Backspace to go back', {font: '24pt Impact', fill: 'white'})

        //  Controls.
        this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE)
    },
    update: function(){

        //Start mode
        if (this.backspace.isDown){
        	this.state.start('MenuState')
        }
    }
}
