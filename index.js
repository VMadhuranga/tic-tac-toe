const gameBoard = (() => {
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const getBoard = () => board;

    const updateBoard = (index, sign) => {
        if (board[index] === "") {
            board[index] = sign;
        }
    }

    return { getBoard, updateBoard };
})();

const displayController = (() => {
    const gameBoardCell = document.querySelectorAll("[data-game-board-cell]");
    const playerTurnBanner = document.querySelector("[data-player-turn-banner]");
    const { getBoard } = gameBoard;

    const renderToDisplay = () => {
        for (let i = 0; i < getBoard().length; i++) {
            gameBoardCell[i].textContent = getBoard()[i];
            gameBoardCell[i].setAttribute("data-cell-index", getBoard().indexOf(getBoard()[i], i));
        }
    }

    const updateDisplay = (cell, gameBoard, index) => {
        cell.textContent = gameBoard[index];
    }

    const updatePlayerTurnBanner = (player) => {
        playerTurnBanner.textContent = `${player}'s turn`;
    }

    renderToDisplay();

    return { updateDisplay, gameBoardCell, updatePlayerTurnBanner };
})();

const gameController = (() => {
    const { gameBoardCell, updateDisplay, updatePlayerTurnBanner } = displayController;
    const { getBoard, updateBoard } = gameBoard;

    players = [
        {
            name: "Player X",
            sign: "X"
        },
        {
            name: "Player O",
            sign: "O"
        }
    ];

    let currentPlayer = players[0];
    updatePlayerTurnBanner(currentPlayer.name)

    const playerTurn = () => {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else if (currentPlayer === players[1]) {
            currentPlayer = players[0];
        }
    }

    gameBoardCell.forEach((cell) => {
        cell.addEventListener("click", function () {
            updateBoard(cell.dataset.cellIndex, currentPlayer.sign);
            
            if (cell.textContent === "") {
                playerTurn();
            }
            
            updateDisplay(cell, getBoard(), cell.dataset.cellIndex);
            updatePlayerTurnBanner(currentPlayer.name);
            console.log(getBoard());
        });
    });

})();