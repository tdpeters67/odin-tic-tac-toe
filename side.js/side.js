Array.from(squares.children).forEach((square, index) => {
  square.addEventListener("click", () => {
    // display active player marker
    square.classList.add(game.activePlayer.marker);
    square.setAttribute("data", game.activePlayer.marker);
    // update array value to be that of active player
    board[index] = game.activePlayer.marker;
    // remove event listener from the marked index
    square.style.pointerEvents = "none";
    // update remainingSpots
    game.remainingSpots -= 1;
    // check winner: if all 3 values within any of these conditions are ===...
    game.checkWinner();
    // check remaining spots
    if (game.winnerDeclared == false) {
      if (game.remainingSpots > 0) {
        game.alertNextPlayer();
        game.nextPlayer();
      } else if (game.remainingSpots == 0) {
        game.declareTie();
      }
    }
  });
});
