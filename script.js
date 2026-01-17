const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const playerXShape = document.getElementById('playerXShape');
const playerOShape = document.getElementById('playerOShape');
const drawsDisplay = document.getElementById('draws');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
const scores = {};
let draws = 0;
let firstPlayer = 'X';

function createBoard() {
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.dataset.index = index;
        cellDiv.addEventListener('click', handleCellClick);
        board.appendChild(cellDiv);
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const winner = winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });

    if (winner) {
        return 'winner';
    }

    if (boardState.every(cell => cell)) {
        draws++;
        drawsDisplay.textContent = `Draws: ${draws}`;
        alert('It\'s a draw!');
        return 'draw';
    }

    return null;
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] || checkWinner()) return;

    boardState[index] = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());
    event.target.textContent = currentPlayer;

    const result = checkWinner();
    if (result === 'winner') {
        const winnerName = getCurrentPlayerName();
        alert(`${winnerName} wins!`);
        scores[winnerName] = (scores[winnerName] || 0) + 1;
        updateScoreboard();
        return;
    }

    if (result === 'draw') {
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateScoreboard() {
    const playerXName = `${playerXInput.value || 'Player X'}`;
    const playerOName = `${playerOInput.value || 'Player O'}`;

    scoreXDisplay.textContent = `${playerXName} Wins: ${scores[playerXName] || 0}`;
    scoreODisplay.textContent = `${playerOName} Wins: ${scores[playerOName] || 0}`;
}

function getCurrentPlayerName() {
    return currentPlayer === 'X' 
        ? `${playerXInput.value || 'Player X'}` 
        : `${playerOInput.value || 'Player O'}`;
}

resetButton.addEventListener('click', () => {
    boardState = Array(9).fill(null);
    currentPlayer = firstPlayer;
    firstPlayer = firstPlayer === 'X' ? 'O' : 'X';
    createBoard();
});

const menuToggle = document.querySelector('.menu-toggle');
const menuItems = document.querySelector('.menu-items');

menuToggle.addEventListener('click', () => {
    menuItems.style.display = menuItems.style.display === 'block' ? 'none' : 'block';
});

createBoard();