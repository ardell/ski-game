// Put all your game code within this function definition
$(function() {
  var WINDOW_WIDTH      = $(window).width();
  var WINDOW_HEIGHT     = $(window).height();
  var PLAYER_WIDTH      = 39;
  var PLAYER_HEIGHT     = 63;
  var DIRECTION_LEFT    = 'left';
  var DIRECTION_DOWN    = 'down';
  var DIRECTION_RIGHT   = 'right';
  var DIRECTION_STOPPED = 'stopped';
  var points            = 0;
  var background, player, cursors, layer, isCrashed, isFinished, pointsText;
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
    // Load map
    map = game.add.tilemap('keystone');

    // Add a background
    var courseWidth  = map.width * map.tileWidth;
    var courseHeight = map.height * map.tileHeight;
    background       = game.add.tileSprite(0, 0, courseWidth, courseHeight, 'snow');
    game.world.setBounds(0, 0, courseWidth, courseHeight);

    // Load tilemap/tiles
    map.addTilesetImage('tiles');
    layer = map.createLayer('tiles');

    // Set up the player
    game.physics.startSystem(Phaser.Physics.Arcade);
    player = game.add.sprite(game.world.centerX, 40, 'skiier');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.animations.add(DIRECTION_LEFT,  [0], 10, true);
    player.animations.add(DIRECTION_DOWN,  [1], 10, true);
    player.animations.add(DIRECTION_RIGHT, [2], 10, true);
    player.animations.add('crash',         [3], 10, true);
    player.animations.add('finished',      [4], 10, true);

    function disableTile(tile) {
      map.setTileLocationCallback(tile.x, tile.y, 1, 1, function() {
        // Don't collide anymore (user has already crashed into this tile)
      }, this, layer);
      tile.alpha        = 0.5;
      tile.canCollide   = false;
      tile.collideDown  = false;
      tile.collideUp    = false;
      tile.collideRight = false;
      tile.collideLeft  = false;
      layer.dirty       = true
    }

    // Set up collisions
    map.setTileIndexCallback([1, 2, 4, 5], function(sprite, tile) {
      var item;
      switch (tile.index) {
        case 1:
        case 2:
          xDiff = Math.abs(sprite.body.center.x - (tile.worldX+tile.centerX));
          yDiff = Math.abs(sprite.body.center.y - (tile.worldY+tile.centerY));
          if (xDiff <= 25 && yDiff <= 25) {
            points -= 10;
            isCrashed = true;
            disableTile(tile);
            setTimeout(function() { isCrashed = false; }, 1000);
          }
          break;
        case 4:
          points += 30;
          disableTile(tile);
          break;
        case 5:
          if (!isFinished) {
            isFinished = true;
            alert("Congratulations, you finished with " + points + " points!\n\nClick ok to play again.");
            window.location.reload();
          }
          break;
      }
    }, null, layer);

    // Show points
    var pointsSprite = game.add.sprite(0, 0);
    pointsSprite.fixedToCamera = true;
    pointsText = game.add.text(0, 0, "Score: "+points, {
      fill:            '#cccccc',
      stroke:          '#333333',
      strokeThickness: 3
    });
    pointsSprite.addChild(pointsText);
    pointsSprite.cameraOffset.x = 10;
    pointsSprite.cameraOffset.y = 10;

    // Receive keypresses
    cursors = game.input.keyboard.createCursorKeys();

    // Camera
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(0, 0, game.camera.width, 80);
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
    if (isCrashed) {
      player.body.velocity.x = 0;
      player.animations.play('crash');
      downhillVelocity = 0;
    } else if (isFinished) {
      player.body.velocity.x = 0;
      player.animations.play('finished');
      downhillVelocity = 0;
    } else if (currentDirection == DIRECTION_LEFT) {
      player.body.velocity.x = -150;
      player.animations.play('left');
      downhillVelocity = DIAGONAL_VELICITY;
    } else if (currentDirection == DIRECTION_RIGHT) {
      player.body.velocity.x = 150;
      player.animations.play('right');
      downhillVelocity = DIAGONAL_VELICITY;
    } else if (currentDirection == DIRECTION_DOWN) {
      player.body.velocity.x = 0;
      player.animations.play('down');
      downhillVelocity = STRAIGHT_DOWN_VELICITY;
    }
    player.body.velocity.y = downhillVelocity;

    // Handle collisions
    game.physics.arcade.overlap(player, layer);

    // Update points
    pointsText.setText('Points: ' + points);
  }
});

