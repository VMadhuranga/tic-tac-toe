const GameBoard = () => {
    let board = [
        "x","o","x",
        "o","x","o",
        "x","o","x"
    ];

    const getBoard = () => board;

    return {getBoard};
};

const DisplayController = () => {
    const gameBoardCell = document.querySelectorAll("[data-game-board-cell]");
    const {getBoard} = GameBoard();

    for (let i = 0; i < getBoard().length; i++) {
        gameBoardCell[i].textContent = getBoard()[i];
    }
}

DisplayController();