function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
        rectangle2.position.x && 
        rectangle1.attackBox.position.x <= 
        rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= 
        rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
}

function determindWinner({ player, enemy, timeId }) {
    clearTimeout(timeId);
    document.querySelector('#displayText').style.display = 'flex';
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'DRAW';
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'PLAYER 1 WINS';
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'PLAYER 2 WINS';
    }
}

let timer = 60;
let timeId;
function countdown() {
    if (timer > 0) {
        timeId = setTimeout(countdown, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }
    if (timer === 0) {
        document.querySelector('#displayText').style.display = 'flex';
        determindWinner({ player, enemy, timeId });
    }
}