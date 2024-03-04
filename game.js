const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableBody: true,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

const game = new Phaser.Game(config);

let player;
let cursors;
let balls;
let walls;

function preload() {
    this.load.image('zane', 'zane.png');
    this.load.image('noora', 'noora.png');
    this.load.image('ball', 'soccer_ball.png');
    this.load.image('wall', 'maze_wall.png');
}

function create() {
    // Create maze walls
    walls = this.physics.add.staticGroup();
    walls.create(400, 50, 'wall').setScale(4, 0.5).refreshBody();
    walls.create(400, 550, 'wall').setScale(4, 0.5).refreshBody();
    walls.create(50, 300, 'wall').setScale(0.5, 4).refreshBody();
    walls.create(750, 300, 'wall').setScale(0.5, 4).refreshBody();

    // Create players
    player = this.physics.add.sprite(100, 100, 'zane');
    player.setCollideWorldBounds(true);

    // Create soccer balls
    balls = this.physics.add.group({
        key: 'ball',
        repeat: 3,
        setXY: { x: 400, y: 300, stepX: 100 },
    });

    balls.children.iterate(function (ball) {
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);
        ball.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    });

    // Set up collisions
    this.physics.add.collider(player, walls);
    this.physics.add.collider(balls, walls);
    this.physics.add.collider(player, balls, hitBall, null, this);

    // Set up input
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }
}

function hitBall(player, ball) {
    // Handle player getting hit by a ball (you can customize this)
    player.setTint(0xff0000);
    this.physics.pause();
}
