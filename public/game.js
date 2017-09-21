// const Phaser = require('phaser');
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update })

function preload() {

    game.load.image('sky', 'assets/city_sunset.png')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('star', 'assets/star.png')
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
    game.load.spritesheet('dude2', 'assets/dude2.png', 32, 48)
    game.load.spritesheet('rightSword', 'assets/rightSword.png', 42, 18)
    game.load.spritesheet('leftSword', 'assets/leftSword.png', 42, 18)

}
//spritePlane to turn gif into a spreadsheet


//environment
var platforms
var cursors
var stars

//Player 1
var player
var spaceBar
var rightSword
var leftSword
var attackRight
var attackLeft
let attackCooldown = 0
let canAttack = true
var score = 0
var scoreText

//Player 2
var player2
var wKey
var aKey
var sKey
var dKey
var rightSword2
var leftSword2
var attackRight2
var attackLeft2
let attackCooldown2 = 0
let canAttack2 = true
var score2 = 0
var scoreText2



function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

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
    player = game.add.sprite(32, game.world.height - 150, 'dude')
    player2 = game.add.sprite(768, game.world.height - 150, 'dude2')

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

    //  Finally some stars to collect
    stars = game.add.group()

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star')

        //  Let gravity do its thing
        star.body.gravity.y = 300

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys()
    spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A)
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S)
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D)
    
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(player2, platforms)
    game.physics.arcade.collide(stars, platforms)

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(rightSword, stars, collectStar, null, this)
    game.physics.arcade.collide(leftSword, stars, collectStar, null, this)

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0
    player2.body.velocity.x = 0

    // ==============================PLAYER 1 SET UP =====================================
    //  Move to the left
    if (cursors.left.isDown){
        if (player.body.touching.down){
           player.body.velocity.x = -150
        } else {
            player.body.velocity.x = -75
        }
        player.animations.play('left')
    //  Move to the right
    } else if (cursors.right.isDown) {
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
            player.doubleJump = true;
        }

        if (cursors.up.isDown && !player.body.touching.down){
            if (player.doubleJump){
                player.body.velocity.y = -325;
                player.doubleJump = false;
            }
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -450;
        }
    }

    //ATTACKING

    if (attackCooldown > 8){
        if (attackRight){
            attackRight.kill()
        }
        if (attackLeft){
            attackLeft.kill()
        }
    }

    if (attackCooldown > 50){
        attackCooldown = 0
        canAttack = true
    }
    if (attackRight){
        attackRight.position.x = player.position.x + 18
        attackRight.position.y = player.position.y + 25
    }

    if (attackLeft){
        attackLeft.position.x = player.position.x - 25
        attackLeft.position.y = player.position.y + 25
    }

    if (canAttack){
        if (cursors.right.isDown && cursors.down.isDown){
            attackRight = rightSword.create(player.position.x + 18, player.position.y + 25, 'rightSword')
            player.body.velocity.x = 1000
            canAttack = false
        }

        if (cursors.left.isDown && cursors.down.isDown){
            attackLeft = leftSword.create(player.position.x - 25, player.position.y + 25, 'leftSword')
            player.body.velocity.x = -1000
            canAttack = false
        }
    } else {
        attackCooldown++
    }

// ==============================PLAYER 2 SET UP =====================================
    //  Move to the left
    if (aKey.isDown){
        if (player2.body.touching.down){
           player2.body.velocity.x = -150
        } else {
            player2.body.velocity.x = -75
        }
        player2.animations.play('left')
    //  Move to the right
    } else if (dKey.isDown) {
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

        if (wKey.isDown && !player2.body.touching.down){
            if (player2.doubleJump2){
                player2.body.velocity.y = -325
                player2.doubleJump2 = false
            }
        }

        //  Allow the player to jump if they are touching the ground.
        if (wKey.isDown && player2.body.touching.down){
            player2.body.velocity.y = -450
        }
    }

//     //ATTACKING

    if (attackCooldown2 > 8){
        if (attackRight2){
            attackRight2.kill()
        }
        if (attackLeft2){
            attackLeft2.kill()
        }
    }

    if (attackCooldown2 > 50){
        attackCooldown2 = 0
        canAttack2 = true
    }
    if (attackRight2){
        attackRight2.position.x = player2.position.x + 18
        attackRight2.position.y = player2.position.y + 25
    }

    if (attackLeft2){
        attackLeft2.position.x = player2.position.x - 25
        attackLeft2.position.y = player2.position.y + 25
    }

    if (canAttack2){
        if (dKey.isDown && sKey.isDown){
            attackRight2 = rightSword2.create(player2.position.x + 18, player2.position.y + 25, 'rightSword')
            player2.body.velocity.x = 1000
            canAttack2 = false
        }

        if (aKey.isDown && sKey.isDown){
            attackLeft2 = leftSword2.create(player2.position.x - 25, player2.position.y + 25, 'leftSword')
            player2.body.velocity.x = -1000
            canAttack2 = false
        }
    } else {
        attackCooldown2++
    }

 }

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}
