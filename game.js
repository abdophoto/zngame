const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');
let playerInput = '';
let currentPlayer = '';

function submitInput() {
    playerInput = inputElement.value.toLowerCase();
    inputElement.value = '';

    if (!currentPlayer) {
        // If the player hasn't chosen a character yet
        if (playerInput === 'zane' || playerInput === 'noora') {
            currentPlayer = playerInput;
            updateOutput(`Welcome, ${currentPlayer}! You find yourself in a maze. Avoid the soccer balls and find your way out.`);
        } else {
            updateOutput("Invalid choice. Please choose either 'Zane' or 'Noora'.");
        }
    } else {
        // If the player has already chosen a character
        // Add your game logic here based on player input
        // Update the outputElement with the results of each action
        // You can use if statements or switch cases to handle different scenarios
        // For simplicity, let's consider a basic scenario where the player either moves or stays in the same place.
        if (playerInput === 'move') {
            updateOutput(`${currentPlayer} moves through the maze.`);
            // Add logic for maze, soccer balls, and winning conditions
            // You can extend this based on your game design
        } else {
            updateOutput(`Invalid input. Type 'move' to continue.`);
        }
    }
}

// Example function to update the game output
function updateOutput(message) {
    outputElement.innerHTML += `<p>${message}</p>`;
}

// Start the game by introducing characters
updateOutput('Choose your character: Zane or Noora.');
