// const Phaser = require('phaser');
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/city_sunset.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('sword', 'assets/greenSword.png', 64, 64);

}
//spritePlane to turn gif into a spreadsheet

var player;
var platforms;
var cursors;
var spaceBar;

var stars;
var score = 0;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 70, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    //setTo(length, height)
    ground.scale.setTo(2, 2.5);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Create Ledges create(shift left, shift down, group)
    var ledge = platforms.create(600, 400, 'ground');
    ledge.scale.setTo(0.5, 0.5);
    ledge.body.immovable = true;

    ledge = platforms.create(0, 400, 'ground');
    ledge.scale.setTo(0.5, 0.5);
    ledge.body.immovable = true;

    ledge = platforms.create(0, 150, 'ground');
    ledge.scale.setTo(0.5, 0.5);
    ledge.body.immovable = true;

    ledge = platforms.create(600, 150, 'ground');
    ledge.scale.setTo(0.5, 0.5);
    ledge.body.immovable = true;

    ledge = platforms.create(300, 275, 'ground');
    ledge.scale.setTo(0.5, 0.5);
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    // spaceBar.onDown.add(function(){
    //     this.state.start('GameState')
    // }, this)
    
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    //  Move to the left
    if (cursors.left.isDown){
        if (player.body.touching.down){
           player.body.velocity.x = -150;
        } else {
            player.body.velocity.x = -75;
        }
        player.animations.play('left');
    //  Move to the right
    } else if (cursors.right.isDown) {
        if (player.body.touching.down){
           player.body.velocity.x = 150;
        } else {
            player.body.velocity.x = 75;
        }
        player.animations.play('right');
    } else {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
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
    if(cursors.right.isDown && spaceBar.isDown){
        player.body.velocity.x = 250
        console.log('STAB!')
    }

    if(cursors.left.isDown && spaceBar.isDown){
        player.body.velocity.x = -250
        console.log('STAB!')
    }

}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}
