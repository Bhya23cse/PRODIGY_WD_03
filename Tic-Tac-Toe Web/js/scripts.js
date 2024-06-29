const cells = document.querySelectorAll(".cells span");
const scoreX = document.querySelector(".player1");
const scoreO = document.querySelector(".player2");
const button = document.querySelector("button");

const checkWin = () => {
    const winCombinations = [
        [0, 3, 6], [0, 1, 2],
        [6, 7, 8], [1, 4, 7],
        [2, 5, 8], [2, 4, 6],
        [0, 4, 8], [3, 4, 5]
    ]
    for (const combo of winCombinations) {
        const [a, b, c] = combo;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML
            && cells[a].innerHTML === cells[c].innerHTML) {
            gameActive = false;
            combo.forEach(i => cells[i].style.backgroundColor = "#f37740");
            return true;
        }
    }
    if ([...cells].every(cell => cell.innerHTML !== "")) {
        gameActive = false;
        return true;
    }
    return false;
}

const clickCell = (cell) => {
    if (!gameActive || cell.innerHTML !== "") {
        return;
    }
    cell.innerHTML = currentPlayer;
    cell.style.fontWeight = "bold";
    if (checkWin()) {
        setTimeout(() => {
            alert(`Player ${currentPlayer} Won!`);
        }, 5);
        if (currentPlayer == "X") {
            player1++;
            scoreX.innerHTML = "Player X: " + player1;
        } else {
            player2++;
            scoreO.innerHTML = "PLayer O: " + player2;
        }
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

const clearBox = () => {
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "transparent";
    });
    gameActive = true;
    currentPlayer = 'X';
}

let currentPlayer = 'X';
let gameActive = true;
let player1 = 0, player2 = 0;

cells.forEach(cell => cell.addEventListener('click', () => clickCell(cell)));
button.addEventListener("click", clearBox);