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
  let boxes = document.querySelector(".boxes");

  board.forEach(() => {
    const box = document.createElement("div");
    box.className = "box";
    boxes.appendChild(box);
  });

  //make event listeners on box to makeMarker
  Array.from(boxes.children).forEach((box, index) => {
    box.addEventListener("click", () => {
      //display active player marker
      console.log(game.activePlayer.marker);
      box.innerHTML = `${game.activePlayer.marker}`;
      //update array value to marker
      board[index] = game.activePlayer.marker;
      //remove event listner from marked index
      box.style.pointerEvents = "none";
      //depreciate remainingSpots
      game.remainingSpots -= 1;
      //check winner
      game.checkWinner();
      //check remaining spots
      if (game.gameWon == false) {
        if (game.remainingSpots > 0) {
          game.informNextPlayer();
          game.nextPlayer();
        } else if (game.remainingSpots == 0) {
          game.gameTied();
        }
      }
    });
  });
  return {
    board,
  };
})();

//make gameplay object
const game = (() => {
  //make players using player factory function
  const playerOne = Player("Player 1", "X");
  const playerTwo = Player("Player 2", "O");

  let activePlayer = playerOne; //will switch between both players with a nextPlayer() function
  let activeText = document.querySelector(".activeText"); //will inform which player's turn and declare the winner, when won
  let remainingSpots = 9; //this will reduce every time a turn has been made, maybe through index? put depreciation of spots in gameboard
  let gameWon = false; //will change when winning condition is made or when tie (remaining spots = 0).

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

  function checkWinner() {
    winningBoxes.forEach((item) => {
      if (
        gameBoard.board[item[0]] === this.activePlayer.marker &&
        gameBoard.board[item[1]] === this.activePlayer.marker &&
        gameBoard.board[item[2]] === this.activePlayer.marker
      ) {
        activeText.innerHTML = `${this.activePlayer.name} wins`;
        this.gameWon = true;
      }
    });
  }

  //change activeText to tell next player it's their turn, ternary operator
  function informNextPlayer() {
    this.activePlayer === playerOne
      ? (activeText.innerHTML = "Player 2's Turn")
      : (activeText.innerHTML = "Player 1's Turn");
  }

  //change activePlayer, ternary operator
  function nextPlayer() {
    this.activePlayer === playerOne
      ? (this.activePlayer = playerTwo)
      : (this.activePlayer = playerOne);
  }

  //declare tie in activeText

  function gameTied() {
    activeText.innerHTML = "Tie Game!";
  }

  return {
    activePlayer,
    remainingSpots,
    checkWinner,
    informNextPlayer,
    nextPlayer,
    gameWon,
    gameTied,
  };
})();
