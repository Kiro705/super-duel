const DuelOptionState = {

    preload: function() {
    		//load characters
    		this.load.spritesheet('Chow', 'assets/Chow.png', 32, 42)
    		this.load.spritesheet('evilChow', 'assets/EvilChow.png', 32, 42)

        //environment
        this.selected = 0
        this.selectArray = ['DUEL', 'ADVENTURE', 'HOWTO']
        this.load.image('arrow 2', 'assets/arrow.png')
        this.canEditRounds = true
        this.roundsCounter = 0
        this.canMove = true
        this.moveCounter = 0
        this.canMove2 = true
        this.moveCounter2 = 0
    },

    create: function() {
        //Load Background and Title
        this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'city')
        rounds = game.add.text(160, 60, '-  ROUNDS TO WIN: ' + gamesToWin, {font: '42pt Impact', fill: 'black'})
        game.add.text(615, 60, '+', {font: '42pt Impact', fill: 'black'})
        game.add.text(260, 170, 'CHARACTER SELECT', {font: '28pt Impact', fill: 'black'})
        game.add.text(275, 350, 'WEAPON SELECT', {font: '28pt Impact', fill: 'gray'})
        game.add.text(330, 500, 'READY', {font: '42pt Impact', fill: 'gray'})
        arrow = game.add.sprite(120, 240, 'arrow')
        arrow.enableBody = true
        characterSelector = game.add.sprite(190, 240, characterArray[character])
        characterSelector.animations.add('waiting', [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6, 7, 8, 5, 6, 7, 8, 5, 6, 7, 8], 10, true)
        characterName = game.add.text(180, 300, characterArray[character], {font: '20pt Impact', fill: 'darkred'})

        //Reset Scores
        score = 0
        score2 = 0

        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys()
        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W)
        this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
        this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S)
        this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D)
        this.plusKey = this.game.input.keyboard.addKey(Phaser.Keyboard.EQUALS)
        this.minusKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE)
        this.backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE)
    },
    update: function(){
			//Select Rounds
			if (!this.canEditRounds){
          this.roundsCounter++
      }

      if (this.roundsCounter > inputDelay){
          this.canEditRounds = true
          this.roundsCounter = 0
      }

			if (this.plusKey.isDown && this.canEditRounds && gamesToWin < 5){
				gamesToWin++
				rounds.destroy()
				rounds = game.add.text(160, 60, '-  ROUNDS TO WIN: ' + gamesToWin, {font: '42pt Impact', fill: 'black'})
				this.canEditRounds = false
			}

			if (this.minusKey.isDown && this.canEditRounds && gamesToWin > 1){
				gamesToWin--
				rounds.destroy()
				rounds = game.add.text(160, 60, '-  ROUNDS TO WIN: ' + gamesToWin, {font: '42pt Impact', fill: 'black'})
				this.canEditRounds = false
			}

			//character select
			characterSelector.animations.play('waiting')

      //Start mode
      if (this.spaceBar.isDown){
      	this.state.start('PreloadState')
          // let selection = this.selectArray[this.selected]
          // if (selection === 'DUEL'){
          //     this.state.start('PreloadState')
          // } else if (selection === 'ADVENTURE'){
          //     alert('No Adventure Mode yet.')
          // } else if (selection === 'HOWTO'){
          //     alert('No How to Play yet.')
          // }
      }

      //Back to Menu
      if (this.backspace.isDown){
      	this.state.start('MenuState')
      }
    }
}