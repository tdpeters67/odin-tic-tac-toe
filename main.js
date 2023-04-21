//make player factory function
const Player = (name, marker) => {
  return { name, marker };
};

// make gameboard object
const gameBoard = (() => {
  //form to get names
  let playerOneName;
  let playerTwoName;
  let activeText = document.querySelector(".activeText");
  document.getElementById("submitBtn").onclick = function () {
    event.preventDefault();
    playerOneName = document.getElementById("playerOne").value;
    playerTwoName = document.getElementById("playerTwo").value;
    activeText.innerHTML = `${playerOneName}'s turn`;
    document.querySelector(".game-board").hidden = false;
    document.querySelector("#name-inputs").hidden = true;
  };

  //change activeText to tell next player it's their turn, ternary operator
  function informNextPlayer() {
    this.activePlayer === game.playerOne
      ? (activeText.innerHTML = `${game.activePlayer.name}'s turn`)
      : (activeText.innerHTML = `${game.activePlayer.name}'s turn`);
  }

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
  document.querySelector(".restartBtn").onclick = function () {
    Array.from(boxes.children).forEach((box, index) => {
      box.innerHTML = "";
      board[index] = "";
      box.style.pointerEvents = "auto";
      game.activePlayer = game.playerOne;
      activeText.innerHTML = `${game.activePlayer.name}'s turn`;
      game.remainingSpots = 9;
    });
  };
  document.querySelector(".newGameBtn").onclick = function () {
    location.reload();
  };

  //make event listeners on box to makeMarker
  Array.from(boxes.children).forEach((box, index) => {
    box.addEventListener("click", () => {
      //assign names
      game.playerOne.name = playerOneName;
      game.playerTwo.name = playerTwoName;
      //display active player marker
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
          game.nextPlayer();
          informNextPlayer();
        } else if (game.remainingSpots == 0) {
          game.gameTied();
        }
      }
    });
  });
  return {
    board,
    playerOneName,
    playerTwoName,
    activeText,
  };
})();

//make gameplay object
const game = (() => {
  //make players using player factory function
  const playerOne = Player("Player 1", "X");
  const playerTwo = Player("Player 2", "O");

  let activePlayer = playerOne; //will switch between both players with a nextPlayer() function
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
        console.log(this.activePlayer.name);
        gameBoard.activeText.innerHTML = `${this.activePlayer.name} wins`;
        this.gameWon = true;
      }
    });
  }

  //change activePlayer, ternary operator
  function nextPlayer() {
    this.activePlayer === playerOne
      ? (this.activePlayer = playerTwo)
      : (this.activePlayer = playerOne);
  }

  //declare tie in activeText

  function gameTied() {
    gameBoard.activeText.innerHTML = "Tie Game!";
  }

  return {
    playerOne,
    playerTwo,
    activePlayer,
    remainingSpots,
    checkWinner,
    nextPlayer,
    gameWon,
    gameTied,
  };
})();
