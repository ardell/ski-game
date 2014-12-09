// Put all your game code within this function definition
window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create:  create,
    update:  update
  });
  var background, player, cursors;

  function preload () {
    game.load.image('snow', 'images/snow.png');
    game.load.spritesheet('skiier', 'images/skiier.png', 148, 244);
  }

  function create () {
    // Add a background
    background = game.add.tileSprite(0, 0, 800, 600, 'snow');

    // Set up the player
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'skiier');
    player.animations.add('left', [0], 10, true);
    player.animations.add('down', [1], 10, true);
    player.animations.add('right', [2], 10, true);

    // Receive keypresses
    cursors = game.input.keyboard.createCursorKeys();
  }

  function update() {
    background.tilePosition.y -= 2;

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {                // Point to the left
      player.body.velocity.x = -150;
      player.animations.play('left');
    } else if (cursors.right.isDown) {        // Point to the right
      player.body.velocity.x = 150;
      player.animations.play('right');
    } else {                                  // Point down-hill
      player.animations.stop();
      player.animations.play('down');
    }
  }
};

