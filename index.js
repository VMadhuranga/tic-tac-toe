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

    const displayWinner = (winner) => {
        playerTurnBanner.textContent = winner;
    }

    renderToDisplay();

    return { updateDisplay, gameBoardCell, updatePlayerTurnBanner, displayWinner };
})();

const gameController = (() => {
    const { gameBoardCell, updateDisplay, updatePlayerTurnBanner, displayWinner } = displayController;
    const { getBoard, updateBoard } = gameBoard;

    const players = [
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

    const checkWinner = (gameBoard) => {
        if (
            (gameBoard[0] === "X" && gameBoard[1] === "X" && gameBoard[2] === "X") ||
            (gameBoard[3] === "X" && gameBoard[4] === "X" && gameBoard[5] === "X") ||
            (gameBoard[6] === "X" && gameBoard[7] === "X" && gameBoard[8] === "X") ||
            (gameBoard[0] === "X" && gameBoard[3] === "X" && gameBoard[6] === "X") ||
            (gameBoard[1] === "X" && gameBoard[4] === "X" && gameBoard[7] === "X") ||
            (gameBoard[2] === "X" && gameBoard[5] === "X" && gameBoard[8] === "X") ||
            (gameBoard[0] === "X" && gameBoard[4] === "X" && gameBoard[8] === "X") ||
            (gameBoard[2] === "X" && gameBoard[4] === "X" && gameBoard[6] === "X")
        ) {
            displayWinner("Player X wins");
        } else if (
            (gameBoard[0] === "O" && gameBoard[1] === "O" && gameBoard[2] === "O") ||
            (gameBoard[3] === "O" && gameBoard[4] === "O" && gameBoard[5] === "O") ||
            (gameBoard[6] === "O" && gameBoard[7] === "O" && gameBoard[8] === "O") ||
            (gameBoard[0] === "O" && gameBoard[3] === "O" && gameBoard[6] === "O") ||
            (gameBoard[1] === "O" && gameBoard[4] === "O" && gameBoard[7] === "O") ||
            (gameBoard[2] === "O" && gameBoard[5] === "O" && gameBoard[8] === "O") ||
            (gameBoard[0] === "O" && gameBoard[4] === "O" && gameBoard[8] === "O") ||
            (gameBoard[2] === "O" && gameBoard[4] === "O" && gameBoard[6] === "O")
        ) {
            displayWinner("Player O wins");
        } else if (gameBoard.every((item) => item)) {
            displayWinner("It's a Tie");
        }
    }

    const playGame = () => {
        gameBoardCell.forEach((cell) => {
            cell.addEventListener("click", gameRound);
        });
    }

    function gameRound() {
        updateBoard(this.dataset.cellIndex, currentPlayer.sign);
        
        if (this.textContent === "") {
            playerTurn();
        }
        
        updateDisplay(this, getBoard(), this.dataset.cellIndex);
        updatePlayerTurnBanner(currentPlayer.name);
        checkWinner(getBoard());
    }

    playGame();
})();