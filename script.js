const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
let xTurn ;
const winningMessage = document.getElementById('winningMessage');
const winningMessageElement = document.getElementById('winning');
const turnCountMessageElement = document.getElementById('turnCount');
const loserMessageElement = document.getElementById('losing');
const restartButton = document.getElementById('restartButton');
let turnCount = 1; 
const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();
restartButton.addEventListener('click', startGame);

function startGame() {
    xTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessage.classList.remove('active');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    xTurn = !xTurn;
    turnCount++;
    if(isDraw()){
        endGame(true);
    }
}

function checkWin(currentClass) {
    return winStates.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        winningMessageElement.innerText = 'Draw!';
    } else {
        winningMessageElement.innerText = `${xTurn ? "X" : "O"} Wins!`;
        turnCountMessageElement.innerText = `Easy win in ${turnCount} turns!`;
        loserMessageElement.innerText = `${xTurn ? "O" : "X"} is a loser, a chicken!`;
    }
    winningMessage.classList.add('active');
}

function isDraw() {
    if(turnCount === 9){
        cellElements.forEach(cell => {
            if(!cell.classList.contains('x') && !cell.classList.contains('o')){
                cell.classList.add('x');
            }
        });
        if(!checkWin('x')){
            return true;
        }else{
            endGame(false);
        }
    }
    return false;
}

function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('o');
    if (xTurn) {
        board.classList.add('x');
    } else {
        board.classList.add('o');
    }
}