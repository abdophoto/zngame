const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');
let playerInput = '';
let currentPlayer = '';
let mazeSize = 5; // Adjust the maze size as needed
let playerPosition = { x: 0, y: 0 };
let soccerBallPosition = { x: getRandomPosition(), y: getRandomPosition() };
let gameOver = false;

function getRandomPosition() {
    return Math.floor(Math.random() * mazeSize);
}

function drawMaze() {
    let maze = '';
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            if (i === playerPosition.y && j === playerPosition.x) {
                maze += currentPlayer === 'zane' ? 'Z' : 'N';
            } else if (i === soccerBallPosition.y && j === soccerBallPosition.x) {
                maze += 'B';
            } else {
                maze += '-';
            }
            maze += ' ';
        }
        maze += '\n';
    }
    updateOutput(maze);
}

function moveSoccerBall() {
    soccerBallPosition = { x: getRandomPosition(), y: getRandomPosition() };
}

function checkCollision() {
    if (playerPosition.x === soccerBallPosition.x && playerPosition.y === soccerBallPosition.y) {
        gameOver = true;
        updateOutput(`${currentPlayer} got hit by a soccer ball! Game Over.`);
    }
}

function checkWin() {
    if (playerPosition.x === mazeSize - 1 && playerPosition.y === mazeSize - 1) {
        gameOver = true;
        updateOutput(`${currentPlayer} successfully navigated through the maze and won the game!`);
    }
}

function submitInput() {
    if (gameOver) {
        updateOutput('The game is over. Please refresh the page to play again.');
        return;
    }

    playerInput = inputElement.value.toLowerCase();
    inputElement.value = '';

    if (!currentPlayer) {
        if (playerInput === 'zane' || playerInput === 'noora') {
            currentPlayer = playerInput;
            updateOutput(`Welcome, ${currentPlayer}! You find yourself in a maze. Avoid the soccer balls and find your way out.`);
            drawMaze();
        } else {
            updateOutput("Invalid choice. Please choose either 'Zane' or 'Noora'.");
        }
    } else {
        switch (playerInput) {
            case 'move':
                // Move player within the maze
                playerPosition.x = Math.max(0, Math.min(playerPosition.x + 1, mazeSize - 1));
                playerPosition.y = Math.max(0, Math.min(playerPosition.y + 1, mazeSize - 1));

                checkCollision();
                checkWin();
                drawMaze();
                moveSoccerBall();
                break;
            default:
                updateOutput(`Invalid input. Type 'move' to continue.`);
                break;
        }
    }
}

// Example function to update the game output
function updateOutput(message) {
    outputElement.innerHTML = `<pre>${message}</pre>`;
}

// Start the game by introducing characters
updateOutput('Choose your character: Zane or Noora.');
