const GameBoard = (() => {

    let board = [];

    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
    }

    const getBoard = () => board;

    const updateBoard = (index, sign) => {
        if (board[index] === "") {
            board[index] = sign;
        }
    }

    createBoard();

    return { createBoard, getBoard, updateBoard };

})();

const DisplayController = (() => {

    const gameBoardCell = document.querySelectorAll("[data-game-board-cell]");
    const playerTurnBanner = document.querySelector("[data-player-turn-banner]");
    const { getBoard } = GameBoard;

    const renderGameBoardToDisplay = () => {
        for (let i = 0; i < getBoard().length; i++) {
            gameBoardCell[i].textContent = getBoard()[i];
            gameBoardCell[i].setAttribute("data-cell-index", getBoard().indexOf(getBoard()[i], i));
        }
    }

    const updateGameBoardCell = (cell, gameBoard, index) => {
        cell.textContent = gameBoard[index];
    }

    const updatePlayerTurnBanner = (player) => {
        playerTurnBanner.textContent = `${player}'s turn`;
    }

    const displayWinner = (winner) => {
        playerTurnBanner.textContent = winner;
    }

    renderGameBoardToDisplay();

    return {
        gameBoardCell,
        renderGameBoardToDisplay,
        updateGameBoardCell,
        updatePlayerTurnBanner,
        displayWinner
    };

})();

const GameController = (() => {

    const {
        gameBoardCell,
        updateGameBoardCell,
        updatePlayerTurnBanner,
        displayWinner,
        renderGameBoardToDisplay
    } = DisplayController;

    const { getBoard, updateBoard, createBoard } = GameBoard;

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
    let winner = false;
    updatePlayerTurnBanner(currentPlayer.name);

    const changePlayerTurn = () => {
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
            winner = true;
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
            winner = true;
            displayWinner("Player O wins");
        } else if (gameBoard.every((item) => item)) {
            winner = true;
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
            changePlayerTurn();
        }

        updateGameBoardCell(this, getBoard(), this.dataset.cellIndex);
        updatePlayerTurnBanner(currentPlayer.name);
        checkWinner(getBoard());

        if (winner) {
            gameBoardCell.forEach((cell) => {
                cell.removeEventListener("click", gameRound);
            })
        }
    }

    const restartGame = () => {
        restartButton = document.querySelector("[data-restart-button]");

        restartButton.addEventListener("click", () => {
            currentPlayer = players[0];
            winner = false;

            createBoard();
            renderGameBoardToDisplay();
            updatePlayerTurnBanner(currentPlayer.name);
            playGame();
        });
    }

    restartGame();
    playGame();

})();