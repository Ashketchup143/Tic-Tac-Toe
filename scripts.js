const tiles = document.querySelectorAll('.tile');
const resetButton = document.querySelector('.reset-button');
let currentPlayer = 'X';
let moves = 0;
let gameOver = false;

const winningCombination = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]            // Diagonals
];

const checkWinner = () => {
  for (const combination of winningCombination) {
    const [a, b, c] = combination;
    if (tiles[a].textContent && tiles[a].textContent === tiles[b].textContent && tiles[a].textContent === tiles[c].textContent) {
      return combination; // Return the winning combination indices
    }
  }
  return null;
};

const checkDraw = () => {
  return moves === tiles.length;
};

tiles.forEach(tile => {
  tile.addEventListener('click', () => {
    if (!tile.textContent.trim() && !gameOver) {
      tile.textContent = currentPlayer;
      moves++;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

      const winnerCombination = checkWinner();
      const isDraw = checkDraw();

      if (winnerCombination) {
        gameOver = true;
        winnerCombination.forEach(index => {
          tiles[index].classList.add('winning-line');
        });

        setTimeout(() => {
          const winner = tiles[winnerCombination[0]].textContent;
          alert(`Player ${winner} wins!`);
        }, 100);
      } else if (isDraw) {
        gameOver = true;
        setTimeout(() => {
          alert(`It's a draw!`);
        }, 100);
      }
    }
  });
});

resetButton.addEventListener('click', () => {
  tiles.forEach(tile => {
    tile.textContent = '';
    tile.classList.remove('winning-line');
  });
  currentPlayer = 'X';
  moves = 0;
  gameOver = false;
});