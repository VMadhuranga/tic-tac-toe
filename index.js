const gameBoard = (() => {
    let board = [
        "x","o","x",
        "o","x","o",
        "x","o","x"
    ];

    const getBoard = () => board;
    return {getBoard};
})();

const Player = (sign) => {
    const playerSign = sign;
}

const displayController = (() => {
    const gameBoardCell = document.querySelectorAll("[data-game-board-cell]");
    const {getBoard} = gameBoard;

    const renderToPage = () => {
        for (let i = 0; i < getBoard().length; i++) {
            gameBoardCell[i].textContent = getBoard()[i];
            gameBoardCell[i].setAttribute("data-cell-index", getBoard().indexOf(getBoard()[i], i));
        }
    }

    renderToPage();
})();