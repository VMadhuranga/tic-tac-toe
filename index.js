const gameBoard = (() => {
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const getBoard = () => board;

    const updateBoard = (index, sign) => {
        board[index] = sign;
    }

    return { getBoard, updateBoard };
})();

const displayController = (() => {
    const gameBoardCell = document.querySelectorAll("[data-game-board-cell]");
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

    renderToDisplay();

    return { updateDisplay, gameBoardCell };
})();

const gameController = (() => {
    const { gameBoardCell, updateDisplay } = displayController;
    const { getBoard, updateBoard } = gameBoard;

    players = [
        {
            name: "playerX",
            sign: "X"
        },
        {
            name: "playerO",
            sign: "O"
        }
    ];

    let currentPlayer = players[0];

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
            updateDisplay(cell, getBoard(), cell.dataset.cellIndex);
            playerTurn();
            console.log(getBoard());
        });
    });

})();