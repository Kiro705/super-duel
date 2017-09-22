const GameState = {

    preload: function() {
        //environment
        this.gameOver = false
        this.gameOverCounter = 0

        //Player 1
        this.attackRight = undefined
        this.attackLeft = undefined
        this.attackCooldown = 0
        this.canAttack = true
        this.isAlive = true

        //Player 2
        this.attackRight2 = undefined
        this.attackLeft2 = undefined
        this.attackCooldown2 = 0
        this.canAttack = true
        this.isAlive2 = true
    },

    create: function() {

        this.background = this.add.tileSprite(0, 0,  this.game.world.width, this.game.world.height, 'city')

        // Adding scoreboard
        game.add.sprite(10, 12, 'title1')
        game.add.sprite(664, 12, 'title2')

        //Adding player1 orbs
        let titleSize = 98
        let orbSpaceing = 36

        for (var i = 1; i <= gamesToWin; i++) {
            if (score >= i){
                game.add.sprite(titleSize + orbSpaceing * i, 16, 'redOrb')
            } else {
                game.add.sprite(titleSize + orbSpaceing * i, 16, 'emptyOrb')
            }
        }

        //Adding player2 orbs
        let titleSize2 = 668
        let orbSpaceing2 = 36

        for (var i = 1; i <= gamesToWin; i++) {
            if (score2 >= i){
                game.add.sprite(titleSize2 - orbSpaceing2 * i, 16, 'blueOrb')
            } else {
                game.add.sprite(titleSize2 - orbSpaceing2 * i, 16, 'emptyOrb2')
            }
        }

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group()

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 70, 'ground')

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        //setTo(length, height)
        ground.scale.setTo(2, 2.5)

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true

        //  Create Ledges create(shift left, shift down, group)
        var ledge = platforms.create(600, 400, 'ground')
        ledge.scale.setTo(0.5, 0.5)
        ledge.body.immovable = true

        ledge = platforms.create(0, 400, 'ground')
        ledge.scale.setTo(0.5, 0.5)
        ledge.body.immovable = true

        ledge = platforms.create(0, 150, 'ground')
        ledge.scale.setTo(0.5, 0.5)
        ledge.body.immovable = true

        ledge = platforms.create(600, 150, 'ground')
        ledge.scale.setTo(0.5, 0.5)
        ledge.body.immovable = true

        ledge = platforms.create(300, 275, 'ground')
        ledge.scale.setTo(0.5, 0.5)
        ledge.body.immovable = true

        // The player and its settings
        player = game.add.sprite(32, 250, characterArray[character])
        player2 = game.add.sprite(748, 250, characterArray[character2])

        //  We need to enable physics on the player
        game.physics.arcade.enable(player)
        game.physics.arcade.enable(player2)

        //  Player physics properties
        player.body.bounce.y = 0.2
        player.body.gravity.y = 1000
        player.body.collideWorldBounds = true
        player2.body.bounce.y = 0.2
        player2.body.gravity.y = 1000
        player2.body.collideWorldBounds = true

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true)
        player.animations.add('right', [5, 6, 7, 8], 10, true)
        player2.animations.add('left', [0, 1, 2, 3], 10, true)
        player2.animations.add('right', [5, 6, 7, 8], 10, true)

        //Add SWORDS
        rightSword = game.add.group()
        leftSword = game.add.group()
        rightSword.enableBody = true
        leftSword.enableBody = true

        rightSword2 = game.add.group()
        leftSword2 = game.add.group()
        rightSword2.enableBody = true
        leftSword2.enableBody = true

        //  Our controls.
        this.cursors = this.game.input.keyboard.createCursorKeys()
        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W)
        this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
        this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S)
        this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D)  
    },
    update: function(){
        //player 1
        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player, platforms)
        game.physics.arcade.collide(player2, platforms)
        //game.physics.arcade.collide(stars, platforms)

        //  Checks to see if you got the other player
        // game.physics.arcade.overlap(rightSword, stars, collectStar, null, this)
        game.physics.arcade.overlap(rightSword, player2, killPlayer2, null, this)
        game.physics.arcade.overlap(leftSword, player2, killPlayer2, null, this)

        game.physics.arcade.overlap(rightSword2, player, killPlayer, null, this)
        game.physics.arcade.overlap(leftSword2, player, killPlayer, null, this)
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0
        player2.body.velocity.x = 0

        // ==============================PLAYER 1 SET UP =====================================
        //  Move to the left
        if (this.aKey.isDown){
            if (player.body.touching.down){
               player.body.velocity.x = -150
            } else {
                player.body.velocity.x = -75
            }
            player.animations.play('left')
        //  Move to the right
        } else if (this.dKey.isDown) {
            if (player.body.touching.down){
               player.body.velocity.x = 150
            } else {
                player.body.velocity.x = 75
            }
            player.animations.play('right')
        } else {
            //  Stand still
            player.animations.stop()
            player.frame = 4
        }

        //JUMPING
        //only if you havent recently jumped
        if(player.body.velocity.y > -75){
            if (player.body.touching.down) {
                player.doubleJump = true
            }

            if (this.wKey.isDown && !player.body.touching.down){
                if (player.doubleJump){
                    player.body.velocity.y = -325
                    player.doubleJump = false
                }
            }

            //  Allow the player to jump if they are touching the ground.
            if (this.wKey.isDown && player.body.touching.down){
                player.body.velocity.y = -450
            }
        }

        //ATTACKING

        if (this.attackCooldown > 8){
            if (this.attackRight){
                this.attackRight.kill()
            }
            if (this.attackLeft){
                this.attackLeft.kill()
            }
        }

        if (this.attackCooldown > 50){
            this.attackCooldown = 0
            this.canAttack = true
        }
        if (this.attackRight){
            this.attackRight.position.x = player.position.x + 18
            this.attackRight.position.y = player.position.y + 19
        }

        if (this.attackLeft){
            this.attackLeft.position.x = player.position.x - 25
            this.attackLeft.position.y = player.position.y + 19
        }

        if (this.canAttack && this.isAlive){
            if (this.dKey.isDown && this.sKey.isDown){
                this.attackRight = rightSword.create(player.position.x + 18, player.position.y + 19, 'rightSword')
                player.body.velocity.x = 1000
                this.canAttack = false
            }

            if (this.aKey.isDown && this.sKey.isDown){
                this.attackLeft = leftSword.create(player.position.x - 25, player.position.y + 19, 'leftSword')
                player.body.velocity.x = -1000
                this.canAttack = false
            }
        } else {
            this.attackCooldown++
        }

    // ==============================PLAYER 2 SET UP =====================================
        //  Move to the left
        if (this.cursors.left.isDown){
            if (player2.body.touching.down){
               player2.body.velocity.x = -150
            } else {
                player2.body.velocity.x = -75
            }
            player2.animations.play('left')
        //  Move to the right
        } else if (this.cursors.right.isDown) {
            if (player2.body.touching.down){
               player2.body.velocity.x = 150
            } else {
                player2.body.velocity.x = 75
            }
            player2.animations.play('right')
        } else {
            //  Stand still
            player2.animations.stop()
            player2.frame = 4
        }

    //     //JUMPING
        //only if you havent recently jumped
        if (player2.body.velocity.y > -75){
            if (player2.body.touching.down) {
                player2.doubleJump2 = true
            }

            if (this.cursors.up.isDown && !player2.body.touching.down){
                if (player2.doubleJump2){
                    player2.body.velocity.y = -325
                    player2.doubleJump2 = false
                }
            }

            //  Allow the player to jump if they are touching the ground.
            if (this.cursors.up.isDown && player2.body.touching.down){
                player2.body.velocity.y = -450
            }
        }

    //     //ATTACKING

        if (this.attackCooldown2 > 8){
            if (this.attackRight2){
                this.attackRight2.kill()
            }
            if (this.attackLeft2){
                this.attackLeft2.kill()
            }
        }

        if (this.attackCooldown2 > 50){
            this.attackCooldown2 = 0
            this.canAttack2 = true
        }
        if (this.attackRight2){
            this.attackRight2.position.x = player2.position.x + 18
            this.attackRight2.position.y = player2.position.y + 19
        }

        if (this.attackLeft2){
            this.attackLeft2.position.x = player2.position.x - 25
            this.attackLeft2.position.y = player2.position.y + 19
        }

        if (this.canAttack2 && this.isAlive2){
            if (this.cursors.right.isDown && this.cursors.down.isDown){
                this.attackRight2 = rightSword2.create(player2.position.x + 18, player2.position.y + 19, 'rightSword')
                player2.body.velocity.x = 1000
                this.canAttack2 = false
            }

            if (this.cursors.left.isDown && this.cursors.down.isDown){
                this.attackLeft2 = leftSword2.create(player2.position.x - 25, player2.position.y + 19, 'leftSword')
                player2.body.velocity.x = -1000
                this.canAttack2 = false
            }
        } else {
            this.attackCooldown2++
        }

        function killPlayer (playerOne, target) {
            despawn = game.add.sprite(playerOne.position.x, playerOne.position.y, 'despawn')
            despawn.animations.add('despawn', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 10, false)
            playerOne.kill()
            this.isAlive = false
            score2++
            this.gameOver = true
            let titleSize2 = 668
            let orbSpaceing2 = 36
            game.add.sprite(titleSize2 - orbSpaceing2 * score2, 16, 'blueOrb')
            game.add.text(55, 100, 'PLAYER TWO', {font: '108pt Impact', fill: 'black'})
            game.add.text(235, 300, 'WINS', {font: '108pt Impact', fill: 'black'})
        }

        function killPlayer2 (playerTwo, target){
            despawn = game.add.sprite(playerTwo.position.x, playerTwo.position.y, 'despawn')
            despawn.animations.add('despawn', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 10, false)
            playerTwo.kill()
            this.isAlive2 = false
            score++
            this.gameOver = true
            let titleSize = 98
            let orbSpaceing = 36
            game.add.sprite(titleSize + orbSpaceing * score, 16, 'redOrb')
            game.add.text(55, 100, 'PLAYER ONE', {font: '108pt Impact', fill: 'black'})
            game.add.text(235, 300, 'WINS', {font: '108pt Impact', fill: 'black'})
        }

        if (this.gameOver){
            despawn.animations.play('despawn')
            if (this.gameOverCounter > 115) {
                despawn.kill()
            }
            this.gameOverCounter++
        }
        if (this.gameOverCounter > 150){
            if (score === gamesToWin || score2 === gamesToWin) {
                game.add.text(118, 50, 'PRESS SPACE TO RETURN TO MENU', {font: '32pt Impact', fill: 'black'})
                if (this.spaceBar.isDown) {
                    this.state.start('MenuState')
                }
            } else {
                this.state.start('PreloadState')
            }
        }
    }
}