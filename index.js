const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // canvas context

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.9;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Image.png'
});

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Hero Knight/Sprites/Idle.png',
    framesMax: 11,
    scale: 3,
    offset: {
        x: 150,
        y: 190
    },
    sprites: {
        idle: {
            imageSrc: './img/Hero Knight/Sprites/Idle.png',
            framesMax: 11
        },
        run: {
            imageSrc: './img/Hero Knight/Sprites/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/Hero Knight/Sprites/Jump.png',
            framesMax: 3,
        },
        fall: {
            imageSrc: './img/Hero Knight/Sprites/Fall.png',
            framesMax: 3,
        },
        attack: {
            imageSrc: './img/Hero Knight/Sprites/Attack1.png',
            framesMax: 7
        }
    }
});

const enemy = new Fighter({
    position: {
        x: 790,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/EVil Wizard 2/Sprites/Idle.png',
    framesMax: 8,
    scale: 3,
    offset: {
        x: 280,
        y: 335
    },
    sprites: {
        idle: {
            imageSrc: './img/EVil Wizard 2/Sprites/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/EVil Wizard 2/Sprites/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/EVil Wizard 2/Sprites/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/EVil Wizard 2/Sprites/Fall.png',
            framesMax: 2,
        },
        attack: {
            imageSrc: './img/EVil Wizard 2/Sprites/Attack1.png',
            framesMax: 8
        }
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

countdown();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    } else {
        player.switchSprite('idle');
    }

    // jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    } else {
        enemy.switchSprite('idle');
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    // detect for collision
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking
    ) {
        player.isAttacking = false;
        enemy.health -= 10;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
            enemy.isAttacking
        ) {
            enemy.isAttacking = false;
            player.health -= 10;
            document.querySelector('#playerHealth').style.width = player.health + '%';
        }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determindWinner({ player, enemy, timeId });
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break
        case 'w':
            player.velocity.y = -20;
            break
        case ' ':
            player.attack();
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break
        case 'ArrowDown':
            enemy.attack();
            break    
    }

});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
    }

    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
    }
});
