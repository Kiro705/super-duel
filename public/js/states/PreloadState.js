var PreloadState = {

	preload: function(){
    this.load.image('ground', 'assets/platform.png')
    this.load.image('star', 'assets/star.png')
    this.load.image('title1', 'assets/Player1Title.png')
    this.load.image('title2', 'assets/Player2Title.png')
	this.load.image('emptyOrb', 'assets/emptyWin1.png')
    this.load.image('emptyOrb2', 'assets/emptyWin2.png')
    this.load.image('redOrb', 'assets/redWin.png')
    this.load.image('blueOrb', 'assets/blueWin.png')
    this.load.spritesheet('despawn', 'assets/despawn.png', 27, 36)
    this.load.spritesheet('rightSword', 'assets/rightSword.png', 42, 18)
    this.load.spritesheet('leftSword', 'assets/leftSword.png', 42, 18)
    //spritePlane to turn gif into a spreadsheet
	},
	create: function(){
    setTimeout(this.state.start('GameState', 5000))
  }
}
