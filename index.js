const GameBoard = () => {
    let board = [
        "x","o","x",
        "o","x","o",
        "x","o","x"
    ];

    const getBoard = () => board;

    return {getBoard};
};
