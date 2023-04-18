//make player factory function
const Player = (name, marker) => {
  return { name, marker };
};

// make gameboard object
const gameBoard = (() => {
  //gameboard array
  let board = [];
  for (i = 0; i < 9; i++) {
    board.push("");
  }

  //display squares for each array item
  let gameBoard = document.querySelector(".gameBoard");

  board.forEach(() => {
    const box = document.createElement("div");
    box.className = "box";
    gameBoard.appendChild(box);
  });

  //make event listeners on box to makeMarker
  Array.from(gameBoard.children).forEach((box, index) => {});
  return {
    board,
    box,
  };
})();

//make gameplay object
const game = (() => {
  //make players using player factory function
  const playerOne = Player("Player 1", "X");
  const playerTwo = Player("Player 2", "O");

  let activePlayer = playerOne; //will switch between both players
  let activeText = document.querySelector(".activeText"); //will inform which player's turn and declare the winner, when won

  //winning conditions
  const winningBoxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //checkWinner

  return {
    playerOne,
    playerTwo,
    activePlayer,
  };
})();
