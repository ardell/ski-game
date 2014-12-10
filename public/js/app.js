// Put all your game code within this function definition
$(function() {
  var WINDOW_WIDTH    = $(window).width();
  var WINDOW_HEIGHT   = $(window).height();
  var PLAYER_WIDTH    = 39;
  var PLAYER_HEIGHT   = 63;
  var DIRECTION_LEFT  = 'left';
  var DIRECTION_DOWN  = 'down';
  var DIRECTION_RIGHT = 'right';
  var background, player, cursors;
  var currentDirection = DIRECTION_DOWN;
  var game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, '', {
    preload: preload,
    create:  create,
    update:  update
  });

  function preload () {
    game.load.image('snow', 'images/snow.png');
    game.load.image('tree', 'images/tree.png');
    game.load.image('flag', 'images/flag.png');
    game.load.spritesheet('skiier', 'images/skiier.png', PLAYER_WIDTH, PLAYER_HEIGHT);
    game.load.tilemap('keystone', 'js/keystone.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tiles', 'images/tiles.png', 64, 64);
  }

  function create () {
    // Add a background
    background = game.add.tileSprite(0, 0, 1280, 2368, 'snow');

    // Load tilemap/tiles
    map     = game.add.tilemap('keystone');
    map.addTilesetImage('tiles');
    layer   = map.createLayer('tiles');
    game.world.setBounds(0, 0, 1280, 2368);

    // Set up the player
    game.physics.startSystem(Phaser.Physics.Arcade);
    player = game.add.sprite(game.world.centerX-PLAYER_WIDTH/2.0, 40, 'skiier');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.animations.add(DIRECTION_LEFT, [0], 10, true);
    player.animations.add(DIRECTION_DOWN, [1], 10, true);
    player.animations.add(DIRECTION_RIGHT, [2], 10, true);

    // Receive keypresses
    cursors = game.input.keyboard.createCursorKeys();

    // Camera
    game.camera.follow(player);
  }

  function update() {
    var downhillVelocity;
    var STRAIGHT_DOWN_VELICITY = 150;
    var DIAGONAL_VELICITY      = 100;

    // Reset the player's velocity (movement)
    if (cursors.left.isDown) {                // Point to the left
      currentDirection = DIRECTION_LEFT;
    } else if (cursors.right.isDown) {        // Point to the right
      currentDirection = DIRECTION_RIGHT;
    } else if (cursors.down.isDown) {         // Point down-hill
      currentDirection = DIRECTION_DOWN;
    }
    if (currentDirection == DIRECTION_LEFT) {
      player.body.velocity.x = -150;
      player.animations.play('left');
      downhillVelocity = DIAGONAL_VELICITY;
    } else if (currentDirection == DIRECTION_RIGHT) {
      player.body.velocity.x = 150;
      player.animations.play('right');
      downhillVelocity = DIAGONAL_VELICITY;
    } else {
      player.body.velocity.x = 0;
      player.animations.play('down');
      downhillVelocity = STRAIGHT_DOWN_VELICITY;
    }
    player.body.velocity.y = downhillVelocity;
  }
});

